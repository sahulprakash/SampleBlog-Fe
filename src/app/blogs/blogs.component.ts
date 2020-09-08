import { Component, OnInit, getDebugNode } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private _profileService: ProfileService, private _router: Router) { }
  blogs: any
  selectedBlog: any
  popup = false
  id:any
  ngOnInit(): void {
    let loginDetail = localStorage.getItem('item')
    if (loginDetail == null) {
      this._router.navigate(['/login'])
    }
    else {
      let idStr = JSON.parse(loginDetail)
       this.id = idStr.user_id
      this.getBlogsById(this.id)
    }
  }
  getBlogsById(id) {
    this._profileService.getBlogsById(id)
      .subscribe(res => {
        this.blogs = res.result
        console.log("blogs list", this.blogs)
      }, err => {
        console.log("error on getting user details", err)
      })
  }
  // toggleIcon(id) {
  //   this._profileService.updateBlog(id)
  //     .subscribe(res => {

  //     }, err => {
  //       console.log("error while updating")
  //     })
  // }

  edit(selectedBlog) {
    console.log("new blog", selectedBlog)
    this.selectedBlog = selectedBlog
    this.popup = true
  }

  onSubmit(blogId) {
    console.log("vvvv", this.blogForm.value)
    this._profileService.updateBlog(blogId, this.blogForm.value)
      .subscribe(res => {
        alert(res.message);
        console.log("response after update blog", res)
      }, err => {
        console.log("error while updating", err)
      })
  }

  //delete 
  delete(blogId){
    this._profileService.delete(blogId)
    .subscribe(res=>{
      this.getBlogsById(this.id)
      // alert(res.message)
      console.log(" blog  deleted",res)
    },err=>{
      console.log("error while deleting blog")
    })
  }

}
