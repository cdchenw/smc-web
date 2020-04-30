import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { IDropdownSettings } from '../../components/multi-select-dropdown/multi-select-dropdown.model';
import { SortableHeaderDirective, SortEvent } from '../../directives/sortable-header.directive';

import { Company } from '../../interface/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'admin-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  
  filterWords: string;
  companyList$: Observable<Company[]>;
  total$: Observable<number>;
  currCompany: Company;

  companyModalTitle: string;
  sectorDwnList = [];
  exchangeDwnList = [];
  sectorSelectedItems = [];
  exchangeSelectedItems = [];
  sectordwnSettings: IDropdownSettings;
  exchangeDwnSettings: IDropdownSettings;

  constructor(
    public companyService: CompanyService,
    private _ngbModal: NgbModal) {
    this.companyList$ = companyService.companyList$;
    this.total$ = companyService.total$;
    this.sectordwnSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false
    };
    this.exchangeDwnSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'lable',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false
    }
  }

  ngOnInit(): void {
    this.sectorDwnList = [
      { id: 1, name: 'Finance' },
      { id: 2, name: 'Healthcare Services' },
      { id: 3, name: 'Pharmaceuticals' },
      { id: 4, name: 'Hotels' },
      { id: 5, name: 'Internet Software & Services' }
    ];
    this.sectorSelectedItems = [
      { id: 1, name: 'Finance' },
      { id: 5, name: 'Internet Software & Services' }
    ];
    this.exchangeDwnList = [
      { id: 1, name: 'NDAQ', stockCode: 'ORCL', lable: 'NDAQ:ORCL' },
      { id: 2, name: 'NSE', stockCode: 'ORCL', lable: 'NSE:ORCL' }
    ];
    this.exchangeSelectedItems = [
      { id: 1, name: 'NDAQ', stockCode: 'ORCL', lable: 'NDAQ:ORCL' },
      { id: 2, name: 'NSE', stockCode: 'ORCL', lable: 'NSE:ORCL' }
    ];
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
    this.currCompany = {
      id: null,
      logo: null,
      name: null,
      turnover: null,
      ceo: null,
      boardOfDirector: null,
      sector: [],
      briefWriteUp: null,
      stockExchagneList: [],
      isCollapsed: false
    };
    this.companyModalTitle = "Add New Company";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleEditCompany(template: any, currCompany: Company){
    this.currCompany = currCompany;
    this.companyModalTitle = "Edit Company Profile";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleDeactiveCompany(currCompany: Company){
    
  }

  onItemSelect(item: any) {
    console.log("this.sectorSelectedItems>>", this.sectorSelectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
