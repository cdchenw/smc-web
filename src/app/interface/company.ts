import { Sector } from './sector';
import { CompanyStockExchange } from './company-stockexchange';

export interface Company {
  id: string;
  logo: string;
  name: string;
  turnover: number;
  ceo: string;
  boardOfDirector: string;
  sector: Array<Sector>;
  briefWriteUp: string;
  stockExchagneList: Array<CompanyStockExchange>;
  isCollapsed: boolean;
}