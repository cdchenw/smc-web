import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  username: string;
  password: string;
  confirmPwd: string;
  email: string;
  mobile: string;

  constructor() { }

  ngOnInit(): void {
  }

  handleSignUp(): void{

  }

}
