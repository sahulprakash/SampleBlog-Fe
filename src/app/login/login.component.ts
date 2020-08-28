import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  regUser: any
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this._loginService.loginUser(this.loginForm.value)
      .subscribe(res => {
        this.regUser = JSON.stringify(res)
        localStorage.setItem('item', this.regUser)
        console.log("login", res)
         this._router.navigate(['/profile'])
      }, err => {
        console.log("invalid credentials", err)
        this._router.navigate(['/login'])
      })
  }

  logout() {
    localStorage.clear()
    this._router.navigate(['/login'])
  }

}
