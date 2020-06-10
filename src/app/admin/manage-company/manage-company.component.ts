import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { IDropdownSettings } from '../../components/multi-select-dropdown/multi-select-dropdown.model';
import { SortableHeaderDirective, SortEvent } from '../../directives/sortable-header.directive';

import { Company } from '../../interface/company';
import { CompanyService } from '../../services/company.service';
import { SectorService } from 'src/app/services/sector.service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockExchange } from 'src/app/interface/stock-exchange';
import { CompanyStockExchange } from 'src/app/interface/company-stockexchange';
import { finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toasts/toast.service';
import { LoadingService } from 'src/app/components/loading/loading.service';

@Component({
  selector: 'admin-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  
  filterWords: string;
  companyList$: Observable<Company[]>;
  exchangeList$:  Observable<StockExchange[]>;
  total$: Observable<number>;
  currCompany: Company;

  isNew: boolean;
  companyModalTitle: string;
  sectorDwnList = [];
  compExchangeList = [];
  // sectorSelectedItems = [];
  sectordwnSettings: IDropdownSettings;
  exchangeDwnSettings: IDropdownSettings;

  saveModalRef: NgbModalRef;
  addMoreModalRef: NgbModalRef;

  exchange: StockExchange;
  stockCode: String;

  constructor(
    public companyService: CompanyService,
    private _SectorService: SectorService,
    private _stockExchangeService: StockExchangeService,
    private _loadingService: LoadingService,
    private _toastService: ToastService,
    private _ngbModal: NgbModal) {
    this.companyList$ = this.companyService.companyList$;
    this.exchangeList$ = this._stockExchangeService.exchangeList$;
    this.total$ = this.companyService.total$;
    this.sectordwnSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false
    };
  }

  ngOnInit(): void {
    let self = this;
    this._SectorService.fetchAllSectors().subscribe(data=>{
      self.sectorDwnList = data;
    });
    // this.sectorSelectedItems = [];
    this.companyService.fetch();
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.companyService.sortColumn = column;
    this.companyService.sortDirection = direction;
  }

  handleAddCompany(template: any){
    this.isNew = true;
    this.currCompany = {
      id: null,
      logo: null,
      name: null,
      turnOver: null,
      ceo: null,
      boardOfDirectors: null,
      sectors: [],
      briefWriteUp: null,
      companyExchanges: [],
      isCollapsed: false
    };
    this.companyModalTitle = "Add New Company";
    this.compExchangeList = [];
    this.saveModalRef = this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleEditCompany(template: any, currCompany: Company){
    this.isNew = false;
    this.currCompany = currCompany;
    this.companyModalTitle = "Edit Company Profile";
    this.compExchangeList = this.currCompany.companyExchanges;
    // this.sectorSelectedItems = this.currCompany.sectors;
    this.saveModalRef = this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleDeactiveCompany(currCompany: Company){
    this._loadingService.show();
    this.companyService.delete(currCompany.id).pipe(finalize(()=>{
      this._loadingService.hide();
    })).subscribe(data=>{
      this.companyService.fetch(); //re-fetch the list.
      this._toastService.showSuccess("Successfully delete company record.");
    }, error=>{
      console.log("error>>", error);
      this._toastService.showError("Failed to delete company! please try again later.");
    });
  }

  onItemSelect(item: any) {
    // console.log("this.sectorSelectedItems>>", this.sectorSelectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  handleDeleteBadge(item): void{
    this.compExchangeList.splice(this.compExchangeList.findIndex((ceItem)=>{
      return item.stockCode == ceItem.stockCode && item.stockExchange.id == ceItem.stockExchange.id;
    }),1);
    console.log(item.stockCode);
  }

  clickAddMore(template: any): void{
    this.addMoreModalRef = this._ngbModal.open(template, { size: 'sm', backdrop: 'static', centered: true });
  }

  clickConfirm(): void{
    let cse = {
      stockExchange: this.exchange,
      stockCode: this.stockCode
    } as CompanyStockExchange;
    this.compExchangeList.push(cse);
    this.addMoreModalRef.close("Close after confirmed");
  }

  clickBtnSave(): void{
    this.currCompany.companyExchanges = this.compExchangeList;
    this._loadingService.show();
    if(this.isNew){
      this.companyService.addNew(this.currCompany).pipe(finalize(()=>{
        this._loadingService.hide();
      })).subscribe(data=>{
        this.companyService.fetch(); //re-fetch the list.
        this._toastService.showSuccess("Successfully create a new company.");
        this._ngbModal.dismissAll("Close after save successfully");
      }, error=>{
        console.log("error>>", error);
        this._toastService.showError("Failed to create a company! please correct what your typed.");
      });
    }else{
      this.companyService.update(this.currCompany).pipe(finalize(()=>{
        this._loadingService.hide();
      })).subscribe(data=>{
        this.companyService.fetch(); //re-fetch the list.
        this._toastService.showSuccess("Successfully update company record.");
        this._ngbModal.dismissAll("Close after update successfully");
      }, error=>{
        console.log("error>>", error);
        this._toastService.showError("Failed to update company! please correct what your typed.");
      });
    }
  }

}
