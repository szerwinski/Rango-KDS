import { OrderItem } from "../model";
import { FB } from "./base";
import { P1, P2 } from "./typography";

export default function OrderKdsCell({
  data,
  id,
  nomeMesa,
}: {
  data: OrderItem[];
  id: number;
  nomeMesa: string;
}) {
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
            <P2 className="px-2 py-1 text-[white]">
              {item.quantity} x {item.menu_item.name}
            </P2>
          );
        })}
        <FB className="w-full gap-2">
          <FB className="w-1/2 rounded-md bg-[red] p-2">
            <P2 className="text-[white]">Cancelar</P2>
          </FB>
          <FB className="w-1/2 rounded-md bg-[green] p-2">
            <P2 className="text-[white]">Pronto</P2>
          </FB>
        </FB>
      </FB>
    </FB>
  );
}
