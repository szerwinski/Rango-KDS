import axios from "axios";
import { TableSale } from "../model";
import { API_URL } from "../global";
export default class TableSaleController {
  static async getTableSaleById(id: number): Promise<TableSale | null> {
    const URL =
      API_URL +
      "table/sales?filters[id][$eq]=" +
      id +
      "&populate[0]=table&populate[1]=cashier&populate[2]=payment&populate[3]=payment.paymentList&populate[4]=data&populate[5]=data.options&populate[6]=data.menu_item";
    const tableSale = await axios.get(URL);

    if (tableSale.data && tableSale.data.length > 0) {
      return tableSale.data[0];
    }

    return null;
  }

  static async updateOrderItemDispatched(
    tableSaleId: number,
    itemsDispatched: number[],
  ) {
    const URL = API_URL + "table/items-dispatched";
    const response = await axios.post(URL, { tableSaleId, itemsDispatched });
    console.log("response", response);
  }
}
