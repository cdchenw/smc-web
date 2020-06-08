import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SMC_CONSTANTS } from 'src/app/common';

@Component({
  selector: 'admin-import-success',
  templateUrl: './import-success.component.html',
  styleUrls: ['./import-success.component.scss']
})
export class ImportSuccessComponent implements OnInit {

  stockCode: string;
  stockExchange: string;
  numOfImported: number;
  fromDate: Date;
  endDate: Date;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    let reportData = JSON.parse(sessionStorage.getItem(SMC_CONSTANTS.IMPORT_RESULT_REPORT));
    let successList = reportData["SUCCESS"];
    if(successList && successList.length>0){
      this.stockCode = successList[0].stockCode;
      this.stockExchange = successList[0].stockExchange;
      this.numOfImported = successList.length;
      let fromDate;
      let endDate;
      successList.forEach(spItem => {
        var spDate = new Date(spItem.date.replace('-', '/'));
        if(!fromDate){
          fromDate = spDate;
        }else if(fromDate.getTime()>spDate.getTime()){
          fromDate = spDate;
        }

        if(!endDate){
          endDate = spDate;
        }else if(endDate.getTime()<spDate.getTime()){
          endDate = spDate;
        }
      });
      this.fromDate = fromDate;
      this.endDate = endDate;
    }
  }

  handleClose(): void{
    this._router.navigateByUrl("/import");
  }

}
