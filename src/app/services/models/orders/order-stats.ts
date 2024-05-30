import {ProductStat} from "../product/product-stat";

export interface OrderStats {
  stats: { [key: string]: ProductStat[] }; // key is YearMonth in string format
}
