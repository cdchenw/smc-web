import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user';
import { SMC_CONSTANTS, GlobalService, Broadcaster, SMC_EVENTS } from 'src/app/common';
import { Role } from 'src/app/interface/Role';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/components/toasts/toast.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private _broadcaster: Broadcaster,
    private _loadingService: LoadingService,
    private _toastService: ToastService,
    private _globalService: GlobalService,
    private _authService: AuthService,
    private _router: Router
  ) { 
    this.user = {} as User;
    this.user.email = "admin@smc.com";//"10594559@qq.com";
    this.user.password = "passw0rd";
  }

  ngOnInit(): void {
  }

  handleLoginSubmit(): void{
    this._loadingService.show();
    this._authService.login(this.user)
    .pipe(finalize(()=>{
      this._loadingService.hide();
    }))
    .subscribe(data=>{
      if(data.id_token){
        console.log("set api token to localstorage!", data.id_token);
        localStorage.setItem(SMC_CONSTANTS.API_TOKEN, data.id_token);
      }
      if(data.user){
        this._globalService.currentUser = data.user;
        this._globalService.currentRole = {name: data.user.userType} as Role;
      }
      this._broadcaster.broadcast(SMC_EVENTS.USER_LOADED);
      if(data.user.userType==SMC_CONSTANTS.ROLE.ADMIN){
        this._router.navigateByUrl("/mcompany");
      }else{
        this._toastService.showSuccess('Login successfully, page redirect to home page.');
        this._router.navigateByUrl("/company");
      }
    }, error=>{
      this._toastService.showError('Login failed, please try again later!');
      console.log(error);
    });
  }

}
