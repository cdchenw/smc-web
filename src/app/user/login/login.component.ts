import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user';
import { SMC_CONSTANTS, GlobalService } from 'src/app/common';
import { Role } from 'src/app/interface/Role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private _globalService: GlobalService,
    private _authService: AuthService,
    private _router: Router
  ) { 
    this.user = {} as User;
    this.user.email = "10594559@qq.com";
    this.user.password = "passw0rd";
  }

  ngOnInit(): void {
  }

  handleLoginSubmit(): void{
    this._authService.login(this.user).subscribe(data=>{
      if(data.id_token){
        console.log("set api token to localstorage!", data.id_token);
        localStorage.setItem(SMC_CONSTANTS.API_TOKEN, data.id_token);
      }
      if(data.user){
        this._globalService.currentUser = data.user;
        this._globalService.currentRole = {name: data.user.userType} as Role;
      }
      if(data.user.userType==SMC_CONSTANTS.ROLE.ADMIN){
        this._router.navigateByUrl("/mcompany");
      }else{
        this._router.navigateByUrl("/company");
      }
      
    }, error=>{
      console.log(error);
    })
  }

}
