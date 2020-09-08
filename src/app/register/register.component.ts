import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service'
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
    // image:new FormControl('')
  });
  selectedFile: File = null

  constructor(
    private _registerService: RegisterService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]
console.log("adaddad",this.selectedFile)
  }


  onSubmit() {
    var formData = new FormData();
    console.log("form data",formData)
     formData = this.userForm.value
    formData.append('image', this.selectedFile, this.selectedFile.name)
 
    this._registerService.postUser(formData)
      .subscribe(res => {
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
