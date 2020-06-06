import { Sector } from './sector';
import { CompanyStockExchange } from './company-stockexchange';

export interface Company {
  id: string;
  logo: string;
  name: string;
  turnOver: number;
  ceo: string;
  boardOfDirectors: string;
  sectors: Array<Sector>;
  briefWriteUp: string;
  companyExchanges: Array<CompanyStockExchange>;
  isCollapsed: boolean;
}