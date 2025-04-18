import { FB, SectionWrapper } from "../components/base";
import { useState } from "react";
import classNames from "classnames";
import Button from "../components/buttons/button";
import { CashierController } from "../controllers/cashier";
import useUser from "../hooks/useUser";

export default function Home() {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [loginType, setLoginType] = useState<"operator" | "admin">("admin");
  useUser();

  return (
    <>
      <SectionWrapper
        hasScreenWidth
        hasScreenHeight
        className="items-center justify-center bg-background"
      >
        <FB fd="column" className="h-full w-full">
          <img
            src="/assets/logo_laranja.png"
            alt="Rango Sem Fila Logo"
            className="h-[200px]"
          />
          <FB
            fd="column"
            className="mt-10 w-[30%] min-w-[280px] gap-5 rounded-xl bg-background2 px-4 py-10"
          >
            <FB fd="row" className="gap-3" w="w-full">
              <Button
                className={classNames(
                  "w-full !rounded-[4px] py-[8px] sm:px-2",
                  {
                    "bg-primary": loginType === "operator",
                    "bg-background": loginType === "admin",
                  },
                )}
                classNameText={
                  loginType === "operator" ? "text-[white]" : "text-primary"
                }
                onClick={() => setLoginType("operator")}
              >
                Operador
              </Button>
              <Button
                className={classNames(
                  "w-full !rounded-[4px] py-[8px] sm:px-2",
                  {
                    "bg-primary": loginType === "admin",
                    "bg-background": loginType === "operator",
                  },
                )}
                classNameText={
                  loginType === "admin" ? "text-[white]" : "text-primary"
                }
                onClick={() => setLoginType("admin")}
              >
                Administrador
              </Button>
            </FB>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-[8px] text-[white]"
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-[8px] text-[white]"
            />
            <Button
              prefixImage="assets/login-icon.svg"
              className="w-full !rounded-[4px] bg-primary py-[8px]"
              onClick={async () => {
                if (loginType === "operator") {
                  var res = await CashierController.login(email, password);
                  if (res) {
                    // save to local storage
                    localStorage.setItem("cashier", JSON.stringify(res));
                    window.location.href = "/kds";
                  }
                } else {
                  console.log({
                    email,
                    password,
                    loginType,
                  });
                }
              }}
            >
              Conectar
            </Button>
          </FB>
        </FB>
      </SectionWrapper>
    </>
  );
}
