import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { StockExchange } from '../../interface/stock-exchange';
import { StockExchangeService } from '../../services/stock-exchange.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToastService } from 'src/app/components/toasts/toast.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'admin-manage-exchange',
  templateUrl: './manage-exchange.component.html',
  styleUrls: ['./manage-exchange.component.scss']
})
export class ManageExchangeComponent implements OnInit {

  exchangeList$: Observable<StockExchange[]>;
  total$: Observable<number>;
  currExchange: StockExchange;
  isNew: boolean;

  exchangeModalTitle: string;

  constructor(
    public stockExchangeService: StockExchangeService,
    private _loadingService: LoadingService,
    private _toastService: ToastService,
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
    } as StockExchange;
    this.exchangeModalTitle = "Add New Stock Exchange";
    this.isNew = true;
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleOpenEditModal(template: any, currExchange: StockExchange){
    this.currExchange = currExchange;
    this.exchangeModalTitle = "Edit Stock Exchange";
    this.isNew = false;
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleSave(): void{
    this._loadingService.show();
    if(this.isNew){
      this.stockExchangeService.addNew(this.currExchange).pipe(finalize(()=>{
        this._loadingService.hide();
      })).subscribe(data=>{
        this.stockExchangeService.fetch(); //re-fetch the list.
        this._toastService.showSuccess("Successfully create a stock exchange record.");
        this._ngbModal.dismissAll("Close after save successfully");
      }, error=>{
        console.log("error>>", error);
        this._toastService.showError("Failed to create stock exchanges! please correct what your typed.");
      });
    }else{
      this.stockExchangeService.update(this.currExchange).pipe(finalize(()=>{
        this._loadingService.hide();
      })).subscribe(data=>{
        this.stockExchangeService.fetch(); //re-fetch the list.
        this._toastService.showSuccess("Successfully save exchange record.");
        this._ngbModal.dismissAll("Close after save successfully");
      }, error=>{
        console.log("error>>", error);
        this._toastService.showError("Failed to save stock exchanges! please correct what your typed.");
      });
    }
  }

  handleDeactiveCompany(currExchange: StockExchange){
    this._loadingService.show();
    this.stockExchangeService.delete(currExchange.id).pipe(finalize(()=>{
      this._loadingService.hide();
    })).subscribe(data=>{
      this.stockExchangeService.fetch(); //re-fetch the list.
      this._toastService.showSuccess("Successfully delete exchange record.");
    }, error=>{
      console.log("error>>", error);
      this._toastService.showError("Failed to delete stock exchanges! please try again later.");
    });
  }
}
