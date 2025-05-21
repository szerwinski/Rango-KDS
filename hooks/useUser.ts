import { useEffect, useState } from "react";
import { Cashier } from "../model";
import { toast } from "react-toastify";

export default function useUser() {
  const [user, setUser] = useState<Cashier | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("cashier");
    if (user) {
      setUser(JSON.parse(user));
      if (window.location.pathname === "/") {
        window.location.href = "/kds";
      }
    } else {
      setUser(null);
      if (window.location.pathname !== "/") {
        toast.error("Usuário não encontrado");
        window.location.href = "/";
      }
    }
  }, []);

  return user;
}
