import { OrderItem } from "../model";
import { FB } from "./base";
import { P1, P2 } from "./typography";

export default function OrderKdsCell({
  data,
  id,
  nomeMesa,
  dispatchItem,
}: {
  data: OrderItem[];
  id: number;
  nomeMesa: string;
  dispatchItem: (item: OrderItem) => void;
}) {
  const parseItemRow = (item: OrderItem) => {
    if (item.menu_item.byWeight) {
      return `${item.quantity / 1000000}kg ${item.menu_item.name}`;
    }
    return `${item.quantity} x ${item.menu_item.name}`;
  };

  return (
    <FB fd="column" className="w-full rounded-xl p-2">
      <FB ha="start" className="w-full gap-3 rounded-md bg-primary p-2">
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
            <FB
              fd="row"
              ha="start"
              className="w-full gap-2 px-2 py-1"
              key={item.id}
            >
              <P2 className="text-[white]">{parseItemRow(item)}</P2>
              <img
                onClick={() => dispatchItem(item)}
                src={"/assets/check.svg"}
                alt={item.menu_item.name + " pronto"}
                className="ml-2 cursor-pointer rounded-md"
                height={20}
                width={20}
              />
            </FB>
          );
        })}
        <FB className="w-full gap-2">
          <FB className="w-1/2 rounded-md bg-[red] p-2">
            <P2 className="text-[white]">Ocultar</P2>
          </FB>
          <FB className="w-1/2 rounded-md bg-[green] p-2">
            <P2 className="text-[white]">Pronto</P2>
          </FB>
        </FB>
      </FB>
    </FB>
  );
}
