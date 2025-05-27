import { useRef, useState } from "react";
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
}: {
  data: OrderItem[];
  id: number;
  nomeMesa: string;
  dispatchItem: (items: OrderItem[]) => Promise<void>;
  dismissTable: () => void;
  loading: boolean;
}) {
  const [isCellLoading, setIsCellLoading] = useState<number | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<number | null>(null);

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
          index === isOptionsOpen
            ? setIsOptionsOpen(null)
            : setIsOptionsOpen(index)
        }
        className="cursor-pointer"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" y1="1" x2="10" y2="19" stroke="white" stroke-width="2" />
        <line x1="1" y1="10" x2="19" y2="10" stroke="white" stroke-width="2" />
      </svg>
    );
  }

  return (
    <FB fd="column" className="w-full p-2 rounded-xl">
      <FB ha="start" className="w-full gap-3 p-2 rounded-md bg-primary">
        <FB className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-0 border-solid border-[white]" />
          <P1 className="absolute !text-[12px] text-[white]">42m</P1>
        </FB>
        <P1 className="text-[white]">Pedido #{id}</P1>
        <P1 className="!font-light text-[white]">|</P1>
        <P1 className="!font-light text-[white]">Mesa {nomeMesa}</P1>
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
                <P2 className="mr-4 flex-1 overflow-hidden text-[white]">
                  {parseItemRow(item)}
                </P2>
                {item.options.length > 0 && getPlusIcon(index)}
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
              {isOptionsOpen === index &&
                item.options.map((option) => (
                  <P2 key={option.id} className="text-[white]">
                    {option.name}
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
            <P2 className="text-[white]">Ocultar</P2>
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
