import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';

import { SortableHeaderDirective, SortEvent } from '../../directives/sortable-header.directive';

import { Company } from '../../interface/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'user-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  filterWords: string;
  companyList$: Observable<Company[]>;
  total$: Observable<number>;

  constructor(
    public companyService: CompanyService) {
    this.companyList$ = companyService.companyList$;
    this.total$ = companyService.total$;
   }

  ngOnInit(): void {
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


}
