import { StockExchange } from '../interface/stock-exchange';

export const STOCKEXCHANGES: StockExchange[] = [
  {
    id: '2a1c2acc-767b-477f-92bd-c23d5d887279',
    code: 'NYSE',
    name : 'New York Stock Exchange',
    region: 'United States',
    contactAddress: 'New York City',
    brief: 'The New York Stock Exchange is an American stock exchange located at 11 Wall Street, Lower Manhattan, New York City, New York. It is by far the world\'s largest stock exchange by market capitalization of its listed companies at US$30.1 trillion as of February 2018. The average daily trading value was approximately US$169 billion in 2013. The NYSE trading floor is located at 11 Wall Street and is composed of 21 rooms used for the facilitation of trading. A fifth trading room, located at 30 Broad Street, was closed in February 2007. The main building and the 11 Wall Street building were designated National Historic Landmarks in 1978.'
  },{
    id: '31e2a9e1-eb56-4f28-af09-2b13757094a8',
    code: 'NDAQ',
    name : 'Nasdaq Inc.',
    region: 'United States',
    contactAddress: 'New York City',
    brief: 'Nasdaq, Inc. (Nasdaq) is a holding company. The Company is a provider of trading, clearing, exchange technology, regulatory, securities listing, information and public company services. It manages, operates and provides its products and services through four segments: Market Services, Corporate Services, Information Services and Market Technology. Its global offerings include trading and clearing across various asset classes, trade management services, data products, financial indexes, capital formation solutions, corporate solutions, and market technology products and services. Its technology markets across the globe, supporting equity derivative trading, clearing and settlement, cash equity trading, fixed income trading and various other functions. Its Market Services segment include its equity derivative trading and clearing, cash equity trading, fixed income clearing corporation and trade management services businesses. Its Corporate Solutions business serves corporate clients.'
  },{
    id: '4406244e-ffdb-4cc0-96db-eb81e600596f',
    code: 'JPX',
    name : 'Japan Exchange Group',
    region: 'Japan',
    contactAddress: 'Tokyo',
    brief: 'Japan Exchange Group, Inc. (JPX) is a Japanese financial services corporation that operates multiple securities exchanges including Tokyo Stock Exchange and Osaka Securities Exchange. It was formed by the merger of the two companies on January 1, 2013.'
  },{
    id: '48185ef8-f743-4698-9d25-13ccd4d8f569',
    code: 'LSE',
    region: 'United Kingdom',
    name : 'London Stock Exchange',
    contactAddress: 'London',
    brief: 'London Stock Exchange is a stock exchange located in the City of London, England. As of April 2018, London Stock Exchange had a market capitalisation of US$4.59 trillion. It was founded in 1571, making it one of the oldest exchanges in the world. Its current premises are situated in Paternoster Square close to St Paul\'s Cathedral in the City of London. It is part of London Stock Exchange Group (LSEG). London Stock Exchange Group was created in October 2007 when London Stock Exchange merged with Milan Stock Exchange, Borsa Italiana.'
  }
];