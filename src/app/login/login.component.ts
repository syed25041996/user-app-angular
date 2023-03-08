import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userdata: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router : Router
  ) {}

  loginForm = this.fb.group({
    id : ['', Validators.required],
    password : ['', Validators.required],
  })

  checkLogin(){
    if(this.loginForm.valid){
      this.auth.getUserbyCode(this.loginForm.value.id).subscribe((res) => {
        this.userdata = res
        console.log(res)

        if(this.userdata.password === this.loginForm.value.password){
          if(this.userdata.isActive){
            sessionStorage.setItem('username',this.userdata.id)
            sessionStorage.setItem('userrole',this.userdata.role)
            this.router.navigate([''])
          }else{
            this.toastr.error("Please contact admin", "Wrong credentials")
          }
        }else{
          this.toastr.error("Invalid credentials")
        }
      })
    }else{
      this.toastr.error("Values are not valid, Try again")
    }
  }
}
