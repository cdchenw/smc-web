import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EChartOption } from 'echarts';
import { uuid } from 'uuidv4';

import { Company } from '../../interface/company';
import { StockExchange } from '../../interface/stock-exchange';

import { COMPANIES } from '../../mock-data/company-mock';
import { STOCKEXCHANGES } from '../../mock-data/stock-exchange-mock';
import { CompanyService } from 'src/app/services/company.service';
import { Observable } from 'rxjs';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';



interface CompanyExchangePair {
  id: string;
  companyCode: string;
  exchangeID: string;
}

const COLOR_LIST: Array<string> = [
   '#FE8463','#9BCA63','#FAD860','#F3A43B'
];

@Component({
  selector: 'user-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.scss']
})
export class ComparisionComponent implements OnInit {
  compareCEList: Array<CompanyExchangePair>;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  periodicity: string = "month";
  // companyList: Array<Company>;
  companyList$: Observable<Company[]>;
  // exchangeList: Array<StockExchange>;
  exchangeList$: Observable<StockExchange[]>;
  options: EChartOption;

  constructor(
    private _companyService: CompanyService,
    private _stockExchangeService: StockExchangeService) {
    this.companyList$ = _companyService.companyList$;
    this.exchangeList$ = _stockExchangeService.exchangeList$;
  }

  ngOnInit(): void {
    this.compareCEList = [{
      id: uuid(),
      companyCode: null,
      exchangeID: null
    }];
    // this.companyList = COMPANIES;
    // this.exchangeList = STOCKEXCHANGES;
    this.options = {
      legend: {
        data: ['Apple', 'Oracle']
      },
      xAxis: {
          type: 'category',
          data: ['Jan-2020', 'Feb-2020', 'Mar-2020', 'Apr-2020', 'May-2020', 'Jun-2020', 'Jul-2020']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          name: 'Apple',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: '30',
          itemStyle:{
            normal:{  
              color: COLOR_LIST[0]
            }
          }
      },{
        name: 'Oracle',
        data: [100, 90, 110, 85, 79, 120, 60],
        type: 'bar',
        barWidth: '30',
        itemStyle:{
          normal:{  
            color: COLOR_LIST[1]
          }
        }
      }]
    };
  }

  handleAddCE(): void{
    if(this.compareCEList.length<4){
      this.compareCEList.push({
        id: uuid(),
        companyCode: null,
        exchangeID: null
      });
    }
  }

  handleRemoveCE(item: CompanyExchangePair): void{
    this.compareCEList.splice(this.compareCEList.findIndex((a)=>a.id==item.id), 1);
  }
}
