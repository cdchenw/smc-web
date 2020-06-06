import { StockExchange } from './stock-exchange';

export interface IPO{
  id: string;
  compId: string;
  stockCode: string;
  stockExchange: StockExchange;
  pricePerShare: number;
  totalShare: number;
  openDate: string;
  remarks: string;
}