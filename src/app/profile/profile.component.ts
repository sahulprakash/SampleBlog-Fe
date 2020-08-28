import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from "./profile.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private _profileService: ProfileService, private _router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log("blog",this.blogForm.value)
    this._profileService.addBlog(this.blogForm.value)
      .subscribe(res => {
        console.log("add blogs", res)
      }, err => {
        console.log("error while adding blogs ", err)
        this._router.navigate(['/login'])
      })
  }

}
