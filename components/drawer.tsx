import { FB, Spacer } from "./base";
import { P1 } from "./typography";

export default function Drawer() {
  return (
    <FB
      fd="column"
      className="fixed left-0 top-0 h-[100vh] w-20 bg-background2 py-4"
    >
      <img
        src="/assets/logo_laranja.png"
        alt="Rango Sem Fila Logo"
        className=""
      />
      <P1 className="!text-[12px] text-[white]">v1.0.0</P1>
      <Spacer />
      <FB
        className="cursor-pointer"
        onClick={() => {
          console.log("click");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <rect
            x="3"
            y="3"
            width="14"
            height="18"
            rx="3"
            fill="none"
            stroke="#F58538"
            stroke-width="2"
          />
          <path
            d="M15 12H5m0 0l5-5m-5 5l5 5"
            stroke="#F58538"
            stroke-width="2"
            fill="none"
          />
        </svg>

        <P1
          onClick={() => {
            localStorage.removeItem("cashier");
            window.location.href = "/";
          }}
          className="!text-[14px] text-primary"
        >
          Sair
        </P1>
      </FB>
    </FB>
  );
}
