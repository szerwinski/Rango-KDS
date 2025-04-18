import axios from "axios";
import { API_URL } from "../global";
import { TableSale } from "../model";

export default class TableSaleController {
  static async getTableSaleById(id: number): Promise<TableSale | null> {
    const URL =
      API_URL +
      "table/sales?filters[id][$eq]=" +
      id +
      "&populate[0]=table&populate[1]=cashier&populate[2]=payment&populate[3]=payment.paymentList&populate[4]=data&populate[5]=data.options&populate[6]=data.menu_item";
    const tableSale = await axios.get(URL);

    if (tableSale.data) {
      return tableSale.data;
    }

    return null;
  }
}
