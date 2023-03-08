import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router : Router
  ) {}

  registerForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', Validators.required],
    password: [
      '',
      [Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}'
      ),
    ]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['male'],
    role: [''],
    isActive: [true],
  });

  checkRegistration(){
    if(this.registerForm.valid){
      this.auth.registerUser(this.registerForm.value).subscribe(() => {
        this.toastr.success("Successfully registered, Contact admin for access")
        this.router.navigate(['login'])
      })
    }else{
      this.toastr.error("Values are not valid, Try again")
    }
  }
}
