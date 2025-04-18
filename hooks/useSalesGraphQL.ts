import { gql, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
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
      table_sales_components(where: { component_type: { _eq: "order.data" } }) {
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
      var newTableSales: TableSale[] = [];
      for (const tableSale of tableSales) {
        const response = await TableSaleController.getTableSaleById(
          tableSale.id,
        );
        if (response) {
          newTableSales.push(response);
        }
      }
      setTableSales(newTableSales);
    };
    console.log("data", data);
    if ((data?.table_sales?.length ?? 0) > 0) {
      fetchTableSales(data?.table_sales ?? []);
    }
  }, [data]);

  return {
    tableSales: tableSales,
    loading,
    error,
  };
};
