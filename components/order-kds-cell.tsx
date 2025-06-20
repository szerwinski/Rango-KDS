import { useRef, useState, useEffect } from "react";
import { Option, OrderItem } from "../model";
import { FB } from "./base";
import { P1, P2 } from "./typography";
import { toast } from "react-toastify";
import Loading from "./loading";
import OptionalRow from "./optional-row";

export default function OrderKdsCell({
  data,
  id,
  nomeMesa,
  dispatchItem,
  dismissTable,
  loading = false,
  updatedAt,
}: {
  data: OrderItem[];
  id: number;
  nomeMesa: string;
  dispatchItem: (items: OrderItem[]) => Promise<void>;
  dismissTable: () => void;
  loading: boolean;
  updatedAt: string;
}) {
  const [isCellLoading, setIsCellLoading] = useState<number | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const updateTime = new Date(updatedAt);
      const diffMs = now.getTime() - updateTime.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      setElapsedMinutes(diffMinutes);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [updatedAt]);

  const parseItemRow = (item: OrderItem) => {
    if (item.menu_item.byWeight) {
      return `${item.quantity / 1000000}kg ${item.menu_item.name}`;
    }
    return `${item.quantity} x ${item.menu_item.name}`;
  };

  function getPlusIcon(index: number) {
    return (
      <svg
        onClick={() =>
          setIsOptionsOpen((prev) => ({
            ...prev,
            [index]: !prev[index],
          }))
        }
        className="cursor-pointer"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" y1="1" x2="10" y2="19" stroke="white" strokeWidth="2" />
        <line x1="1" y1="10" x2="19" y2="10" stroke="white" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <FB fd="column" className="w-full p-2 rounded-xl">
      {/* Cabeçalho responsivo */}
      <FB
        ha="start"
        className="w-full gap-2 p-2 rounded-md bg-primary flex-wrap md:flex-nowrap"
      >
        <FB className="relative min-w-[40px]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-0 border-solid border-[white]" />
          <P1 className="absolute !text-[12px] text-[white]">{elapsedMinutes}m</P1>
        </FB>
        <P1 className="text-[white] truncate text-sm md:text-base">
          Pedido #{id}
        </P1>
        <P1 className="!font-light text-[white] hidden md:inline">|</P1>
        <P1 className="!font-light text-[white] truncate text-sm md:text-base">
          Mesa {nomeMesa}
        </P1>
      </FB>
      <FB
        fd="column"
        ha="start"
        className="w-full gap-2 rounded-md bg-[#2a2f41] p-2"
      >
        {data.map((item, index) => {
          return (
            <FB className="px-2 py-1" key={item.id} w="w-full" fd="column">
              <FB fd="row" ha="start" className="w-full gap-2">
                <P2 className="mr-4 flex-1 overflow-hidden text-[white] text-sm md:text-base">
                  {parseItemRow(item)}
                </P2>
                {item.options.length > 0 && getPlusIcon(item.id)}
                {isCellLoading === index ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-0 border-solid border-[white]" />
                ) : (
                  <img
                    onClick={async () => {
                      if (loading || isCellLoading) {
                        toast.error("Já existe um pedido sendo processado");
                        return;
                      }
                      setIsCellLoading(index);
                      await dispatchItem([item]);
                      setIsCellLoading(null);
                    }}
                    src={"/assets/check.svg"}
                    alt={item.menu_item.name + " pronto"}
                    className="ml-2 rounded-md cursor-pointer"
                    height={20}
                    width={20}
                  />
                )}
              </FB>
              {item.note && (
                <P2 className="text-[orange] text-sm italic">Nota: {item.note}</P2>
              )}
              {item.options.length > 0 && isOptionsOpen[item.id] &&
                item.options.map((option) => (
                  <P2 key={option.id} className="text-[white]">
                    {((option.quantity ?? 0) > 1
                      ? `${option.quantity}x `
                      : "") + option.name}
                  </P2>
                ))}
            </FB>
          );
        })}
        <FB className="w-full gap-2">
          <FB
            className="w-1/2 cursor-pointer rounded-md bg-[red] p-2"
            onClick={() => {
              dismissTable();
            }}
          >
            <P2 className="text-[white]">Oculta</P2>
          </FB>
          <FB
            className="w-1/2 cursor-pointer rounded-md bg-[green] p-2"
            onClick={async () => {
              if (isCellLoading || loading) {
                toast.error("Já existe um pedido sendo processado");
                return;
              }
              setIsCellLoading(10000);
              await dispatchItem(data);
              setIsCellLoading(null);
            }}
          >
            <P2 className="text-[white]">Pronto</P2>
          </FB>
        </FB>
      </FB>
    </FB>
  );
}
