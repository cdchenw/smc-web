import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { IPO } from '../../interface/ipo';
import { IpoService } from '../../services/ipo.service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockExchange } from 'src/app/interface/stock-exchange';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToastService } from 'src/app/components/toasts/toast.service';
import { finalize } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interface/company';

@Component({
  selector: 'admin-manage-ipo',
  templateUrl: './manage-ipo.component.html',
  styleUrls: ['./manage-ipo.component.scss']
})
export class ManageIpoComponent implements OnInit {

  ipoList$: Observable<IPO[]>;
  companyList$: Observable<Company[]>;
  exchangeList$:  Observable<StockExchange[]>;
  total$: Observable<number>;
  isNoData: boolean;
  currIpo: IPO;
  isNew: boolean;
  openDate: NgbDateStruct;

  ipoModalTitle: string;

  constructor(
    public _ipoService: IpoService,
    public _companyService: CompanyService,
    private _stockExchangeService: StockExchangeService,
    private _loadingService: LoadingService,
    private _toastService: ToastService,
    private _ngbModal: NgbModal) {
    this.ipoList$ = this._ipoService.ipoList$;
    this.companyList$ = this._companyService.companyList$;
    this.exchangeList$ = this._stockExchangeService.exchangeList$;
    this.total$ = this._ipoService.total$;
  }

  ngOnInit(): void {
    let self = this;
    this.total$.subscribe(totalNum=>{
      self.isNoData = !(totalNum>0);
    });
  }

  handleOpenNewModal(template: any){
    this.currIpo = {
      id: null,
      compId: null,
      stockCode: null,
      stockExchange: {
        id: null,
        name: null,
        shortName: null,
        region: null,
        contactAddress: null,
        brief: null,
        remarks: null
      },
      pricePerShare: null,
      totalShare: null,
      openDate: null,
      remarks: null
    };
    this.isNew = true;
    this.ipoModalTitle = "Add New Stock Exchange";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleOpenEditModal(template: any, currIpo: IPO){
    this.currIpo = currIpo;
    this.ipoModalTitle = "Edit IPO";
    this.isNew = false;
    this.openDate = this.convertToNgbDateStruct(this.currIpo.openDate);
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleSave():void{
    this._loadingService.show();
    if(this.isNew){
      let postBody = {
        openDate:  this.convertToStrDate(this.openDate),
        pricePerShare: this.currIpo.pricePerShare,
        totalShare: this.currIpo.totalShare,
        remarks: this.currIpo.remarks,
        compId: this.currIpo.compId,
        exchangeId: this.currIpo.stockExchange.id
      } as any;
      this._ipoService.addNew(postBody).pipe(finalize(()=>{
        this._loadingService.hide();
      })).subscribe(data=>{
        this._ipoService.fetch(); //re-fetch the list.
        this._toastService.showSuccess("Successfully create a new ipo.");
        this._ngbModal.dismissAll("Close after save successfully");
      }, error=>{
        console.log("error>>", error);
        this._toastService.showError("Failed to create a ipo! please correct what your typed.");
      });
    }else{
      let postBody = {
        id: this.currIpo.id,
        openDate:  this.convertToStrDate(this.openDate),
        pricePerShare: this.currIpo.pricePerShare,
        totalShare: this.currIpo.totalShare,
        remarks: this.currIpo.remarks,
        compId: this.currIpo.compId,
        exchangeId: this.currIpo.stockExchange.id
      } as any;
      this._ipoService.update(postBody).pipe(finalize(()=>{
        this._loadingService.hide();
      })).subscribe(data=>{
        this._ipoService.fetch(); //re-fetch the list.
        this._toastService.showSuccess("Successfully update ipo record.");
        this._ngbModal.dismissAll("Close after update successfully");
      }, error=>{
        console.log("error>>", error);
        this._toastService.showError("Failed to update stock exchanges! please correct what your typed.");
      });
    }
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

  private convertToNgbDateStruct(openDate: String): NgbDateStruct{
    let dateArray = openDate.split("-");
    let date = {
      year: new Number(dateArray[0]).valueOf(),
      month: new Number(dateArray[1]).valueOf(),
      day: new Number(dateArray[2]).valueOf() 
    } as NgbDateStruct;
    return date;
  }

}
