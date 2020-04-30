import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  showSuccess: boolean;
  oldPassword: string;
  newPassword: string;
  newConfirm: string;

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmitUpdate(): void{
    this.showSuccess = true;
    //tbd, requst user update password api.
  }

}
