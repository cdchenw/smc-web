import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-import-success',
  templateUrl: './import-success.component.html',
  styleUrls: ['./import-success.component.scss']
})
export class ImportSuccessComponent implements OnInit {

  companyName: string;
  stockExchange: string;
  numOfImported: number;
  fromDate: string;
  endDate: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.companyName = "OCBC";
    this.stockExchange = "NSE";
    this.numOfImported = 110;
    this.fromDate = "2020-04-01 00:00";
    this.fromDate = "2020-04-18 23:59";
  }

  handleClose(): void{
    this._router.navigate(['/import']);
  }

}
