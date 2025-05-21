import axios from "axios";
import { API_URL } from "../global";
import { toast } from "react-toastify";
import { Cashier } from "../model";

export class CashierController {
  static async login(email: string, password: string): Promise<Cashier | null> {
    const url = API_URL + "cashier/login";
    console.log(url);
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login");
      return null;
    }
  }
}
