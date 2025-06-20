import { gql, useSubscription } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import TableSaleController from "../controllers/table-sale";
import { TableSale } from "../model";

const GET_TABLE_SALE_COMPONENTS = gql`
  subscription GetTableSaleComponents(
    $restaurantId: Int!
    $updated_at: timestamp
  ) {
    table_sales(
      where: {
        table_sales_restaurant_links: { restaurant_id: { _eq: $restaurantId } }
        status: { _eq: "OPEN" }
        updated_at: { _gt: $updated_at }
      }
      order_by: { updated_at: desc }
    ) {
      id
      created_at
      updated_at
      status
      table_sales_components {
        id
        component_id
      }
    }
  }
`;

type SubscriptionVars = {
  restaurantId: number;
  updated_at: string;
};

type SubscriptionData = {
  table_sales: TableSaleRaw[];
};

type TableSaleRaw = {
  id: number;
  created_at: string;
  updated_at: string;
  status: string;
  table_sales_components: TableSalesComponent[];
};

type TableSalesComponent = {
  id: number;
  component_id: string;
};

export const useTableSalesSubscription = (
  restaurantId: number,
  updatedAt: string,
) => {
  const [tableSales, setTableSales] = useState<TableSale[] | null>(null);
  const previousTableSalesRef = useRef<TableSale[] | null>(null);

  // Ref para o áudio, criado apenas uma vez
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio("/sound.mp3");
    }
  }, []);

  // Função para ser chamada em um botão para liberar o som
  const enableSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        audioRef.current!.pause();
        audioRef.current!.volume = 1;
        console.log("Notificações sonoras ativadas!");
      }).catch((e) => {
        console.warn("O navegador bloqueou o áudio:", e);
      });
    }
  };

  const { data, loading, error } = useSubscription<
    SubscriptionData,
    SubscriptionVars
  >(GET_TABLE_SALE_COMPONENTS, {
    variables: {
      restaurantId,
      updated_at: updatedAt,
    },
  });

  useEffect(() => {
    const fetchTableSales = async (tableSales: TableSaleRaw[]) => {
      var dismissedTables = JSON.parse(
        localStorage.getItem("dismissedTables") ?? "[]",
      );

      var newTableSales: TableSale[] = [];
      for (const tableSale of tableSales) {
        const tabSale = await TableSaleController.getTableSaleById(
          tableSale.id,
        );
        const dismissed = dismissedTables.find(
          (e: any) => e.id === tableSale.id,
        );
        if (
          tabSale &&
          (!dismissed ||
            dismissed.data.length <
            tabSale.data.filter(
              (e) => e.status == "READY" && !e.menu_item.blockPrinting,
            ).length)
        ) {
          tabSale.data = tabSale.data.filter(
            (e) => e.status == "READY" && !e.menu_item.blockPrinting,
          );
          dismissedTables = dismissedTables.filter(
            (e: any) => e.id !== tableSale.id,
          );

          if (tabSale.data.length > 0) {
            newTableSales.push(tabSale);
          }
        }
      }

      let houveNovosPedidos = false;

      if (previousTableSalesRef.current) {
        for (const newTable of newTableSales) {
          const previousTable = previousTableSalesRef.current.find(
            t => t.id === newTable.id
          );
          if (previousTable) {
            const newReadyItems = newTable.data.filter(d => d.status === "READY");
            const prevReadyItems = previousTable.data.filter(d => d.status === "READY");
            const prevReadyUuids = prevReadyItems.map(d => d.uuid);
            const newReadyUuids = newReadyItems.map(d => d.uuid);
            const novosPedidosReady = newReadyUuids.filter(uuid => !prevReadyUuids.includes(uuid));
            if (novosPedidosReady.length > 0) {
              houveNovosPedidos = true;
              console.log(
                `Mesa ${newTable.id} recebeu novos pedidos prontos:`,
                novosPedidosReady
              );
            }
          } else {
            const newReadyItems = newTable.data.filter(d => d.status === "READY");
            if (newReadyItems.length > 0) {
              houveNovosPedidos = true;
              console.log(
                `Mesa ${newTable.id} apareceu com pedidos prontos:`,
                newReadyItems.map(d => d.uuid)
              );
            }
          }
        }
      }

      // Toca o som se houve novos pedidos
      if (houveNovosPedidos && audioRef.current) {
        try {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch((e) => {
            // O navegador bloqueou o play
            console.warn("Não foi possível tocar o som:", e);
          });
        } catch (e) {
          console.warn("Erro ao tentar tocar o som:", e);
        }
      }


      previousTableSalesRef.current = newTableSales;

      localStorage.setItem("dismissedTables", JSON.stringify(dismissedTables));

      newTableSales.sort((a, b) => {
        return a.id - b.id;
      });
      setTableSales(newTableSales);
    };

    if ((data?.table_sales?.length ?? 0) > 0) {
      fetchTableSales(data?.table_sales ?? []);
    }
  }, [data?.table_sales]);

  return {
    tableSales: tableSales,
    loading,
    error,
    enableSound, // Exporte a função para ser usada no componente
  };
};
