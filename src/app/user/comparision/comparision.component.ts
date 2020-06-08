import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EChartOption } from 'echarts';
import { uuid } from 'uuidv4';

import { Company } from '../../interface/company';
import { StockExchange } from '../../interface/stock-exchange';

import { CompanyService } from 'src/app/services/company.service';
import { Observable } from 'rxjs';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockPriceService } from 'src/app/services/stock-price.service';
import { ToastService } from 'src/app/components/toasts/toast.service';
import { LoadingService } from 'src/app/components/loading/loading.service';



interface CompanyExchangePair {
  id: string;
  company: Company;
  exchange: StockExchange;
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
  companyList$: Observable<Company[]>;
  exchangeList$: Observable<StockExchange[]>;
  options: EChartOption;

  constructor(
    private _toastService: ToastService,
    private _loadingService: LoadingService,
    private _companyService: CompanyService,
    private _stockExchangeService: StockExchangeService,
    private _stockPriceService: StockPriceService) {
    this.companyList$ = _companyService.companyList$;
    this.exchangeList$ = _stockExchangeService.exchangeList$;
  }

  ngOnInit(): void {
    this.compareCEList = [{
      id: uuid(),
      company: null,
      exchange: null
    }];
  }

  handleAddCE(): void{
    if(this.compareCEList.length<4){
      this.compareCEList.push({
        id: uuid(),
        company: null,
        exchange: null
      });
    }
  }

  handleRemoveCE(item: CompanyExchangePair): void{
    this.compareCEList.splice(this.compareCEList.findIndex((a)=>a.id==item.id), 1);
  }

  handleGenerateChart(): void{
    this._loadingService.show();
    let ceList = [];
    this.compareCEList.forEach(item=>{
      ceList.push({
        companyId: item.company.id,
        exchangeId: item.exchange.id
      });
    });
    let searchParam = {
      startDt: this.convertToStrDate(this.startDate),
      endDt: this.convertToStrDate(this.endDate),
      periodicity: this.periodicity,
      companyExchanges: ceList
    };
    this._stockPriceService.seach(searchParam).subscribe(data=>{
      this.generateChart(data);
      this._loadingService.hide();
    }, error=>{
      this._toastService.showError("Failed to generate chart!");
      this._loadingService.hide();
    });
  }

  private convertToStrDate(ngbDs: NgbDateStruct){
    let rs = ngbDs.year + "-";
    if(ngbDs.month<10){
      rs += "0" + ngbDs.month + "-";
    }else{
      rs += ngbDs.month + "-";
    }
    if(ngbDs.day<10){
      rs += "0" + ngbDs.day;
    }else{
      rs += ngbDs.day;
    }
    return rs;

  }

  private generateChart(data: any){

    let companyNameArray = [];
    this.compareCEList.forEach(item=>{
      companyNameArray.push(item.company.name);
    });

    let categoryArray = [];

    data.forEach(buGroup => {
      if(buGroup.liStockPrice){
        buGroup.liStockPrice.forEach(sp => {
          categoryArray.push(sp.day);
        });
      }
    });

    //uniqua date interval.
    categoryArray = Array.from([...new Set(categoryArray)]);
    categoryArray.sort();

    //calculate series
    let series = [];
    data.forEach(buGroup => {
      let companyId = buGroup.companyId;
      let exchangeId = buGroup.exchangeId;

      //lengend
      let cePair = this.compareCEList.find(item=>item.company.id==companyId&&item.exchange.id==exchangeId);
      let lengendName = cePair.company.name + cePair.exchange.name;

      //price array
      let priceArray = [];
      if(buGroup.liStockPrice){
        buGroup.liStockPrice.forEach(sp => {
          priceArray.push(sp.price);
        });
      }


      series.push({
        name: lengendName,
        data: priceArray,
        type: 'bar',
        barWidth: '30',
        itemStyle:{
          normal:{  
            color: COLOR_LIST[0]
          }
        }
      })

    });


    this.options = {
      legend: {
        data: companyNameArray
      },
      xAxis: {
          type: 'category',
          data: categoryArray
      },
      yAxis: {
          type: 'value'
      },
      series: series
    };
  }
}
