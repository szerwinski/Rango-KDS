import axios from "axios";
import { API_URL } from "../global";
import { TableSale } from "../model";

export default class TableSaleController {
  static async getTableSaleById(id: number): Promise<TableSale | null> {
    const URL = API_URL + "table/sales?filters[id][eq]=" + id;
    const tableSale = await axios.get(URL);

    if (tableSale.data) {
      return tableSale.data;
    }

    return null;
  }
}
