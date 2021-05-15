import { Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;
  FormBuilder: any;
  email: string = "";
  password : string ="";

  constructor(private fb : FormBuilder) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
    });
  }
  isValidInput(value:any){
    return this.loginForm.controls[value].invalid &&
     (this.loginForm.controls[value].dirty || this.loginForm.controls[value].touched);
 }

  ngOnInit(): void {
  }

  onClick(data:any){
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
}
