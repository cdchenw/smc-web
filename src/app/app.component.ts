import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, SMC_CONSTANTS } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  navMenue: Array<object> = []; 

  constructor(
    public activatedRoute: ActivatedRoute,
    public globalService: GlobalService,
    private _router: Router) {
  }
  ngOnInit(): void {
    if(this.globalService.isAdmin){
      this.navMenue= [
        { title: 'Import Data', fragment: 'import' },
        { title: 'Manage Company', fragment: 'mcompany' },
        { title: 'Manage Exchange', fragment: 'exchange' },
        { title: 'Manage IPOs', fragment: 'ipo' }
      ];
    }else{
      this.navMenue= [
        { title: 'Company', fragment: 'company' },
        { title: 'IPOs Plan', fragment: 'iposplan' },
        { title: 'Comparison', fragment: 'comparision' }
      ];
    }
  }

  goToLink(routerLink: string): void{
    this._router.navigateByUrl(routerLink);
  }

  handleLogOut(): void{
    console.log("log out");
    localStorage.removeItem(SMC_CONSTANTS.API_TOKEN);
    this._router.navigateByUrl("/login");
  }
}
