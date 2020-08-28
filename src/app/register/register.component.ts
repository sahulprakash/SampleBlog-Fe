import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from './register.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    zipCode: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  constructor(
    private _registerService: RegisterService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this._registerService.postUser(this.userForm.value).subscribe(
      (res) => {
        alert('successfully registered');
        this._router.navigate(['/login']);
      },
      (err) => {
        alert(err.error.message);
        console.log('error on reg', err);
      }
    );
  }
 
}
