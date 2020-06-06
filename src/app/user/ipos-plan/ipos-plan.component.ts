import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IPO } from '../../interface/ipo';
import { IpoService } from '../../services/ipo.service';

@Component({
  selector: 'user-ipos-plan',
  templateUrl: './ipos-plan.component.html',
  styleUrls: ['./ipos-plan.component.scss']
})
export class IposPlanComponent implements OnInit {
  ipoList$: Observable<IPO[]>;
  total$: Observable<number>;
  isNoData: boolean;

  constructor(
    public ipoService: IpoService) {
    this.ipoList$ = ipoService.ipoList$;
    this.total$ = ipoService.total$;
  }

  ngOnInit(): void {
    let self = this;
    this.ipoService.fetch();
    this.total$.subscribe(totalNum=>{
      self.isNoData = !(totalNum>0);
    });
  }

}
