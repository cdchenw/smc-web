import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { StockExchange } from '../../interface/stock-exchange';
import { StockExchangeService } from '../../services/stock-exchange.service';

@Component({
  selector: 'admin-manage-exchange',
  templateUrl: './manage-exchange.component.html',
  styleUrls: ['./manage-exchange.component.scss']
})
export class ManageExchangeComponent implements OnInit {

  exchangeList$: Observable<StockExchange[]>;
  total$: Observable<number>;
  currExchange: StockExchange;

  exchangeModalTitle: string;

  constructor(
    public stockExchangeService: StockExchangeService,
    private _ngbModal: NgbModal) {
    this.exchangeList$ = stockExchangeService.exchangeList$;
    this.total$ = stockExchangeService.total$;
  }

  ngOnInit(): void {
  }

  handleOpenNewModal(template: any){
    this.currExchange = {
      id: null,
      shortName: null,
      name: null,
      region: null,
      contactAddress: null,
      brief: null,
      remarks: null
    };
    this.exchangeModalTitle = "Add New Stock Exchange";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleOpenEditModal(template: any, currExchange: StockExchange){
    this.currExchange = currExchange;
    this.exchangeModalTitle = "Edit Stock Exchange";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleDeactiveCompany(currExchange: StockExchange){
  }
}
