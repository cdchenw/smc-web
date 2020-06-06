import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { IPO } from '../../interface/ipo';
import { IpoService } from '../../services/ipo.service';

@Component({
  selector: 'admin-manage-ipo',
  templateUrl: './manage-ipo.component.html',
  styleUrls: ['./manage-ipo.component.scss']
})
export class ManageIpoComponent implements OnInit {

  ipoList$: Observable<IPO[]>;
  total$: Observable<number>;
  isNoData: boolean;
  currIpo: IPO;

  ipoModalTitle: string;

  constructor(
    public ipoService: IpoService,
    private _ngbModal: NgbModal) {
    this.ipoList$ = ipoService.ipoList$;
    this.total$ = ipoService.total$;
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
      stockExchange: null,
      pricePerShare: null,
      totalShare: null,
      openDate: null,
      remarks: null
    };
    this.ipoModalTitle = "Add New Stock Exchange";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

  handleOpenEditModal(template: any, currIpo: IPO){
    this.currIpo = currIpo;
    this.ipoModalTitle = "Edit IPO";
    this._ngbModal.open(template, { size: 'lg', backdrop: 'static', centered: true });
  }

}
