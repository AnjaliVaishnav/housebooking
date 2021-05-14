import { Component } from '@angular/core'; 
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm : FormGroup;
  formBuilder: any;
  fname: string = "";
  lname: string= "";
  email: string="";

  constructor(private fb : FormBuilder) { 
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
    });
  }
  isValidInput(value:any){
    return this.registerForm.controls[value].invalid &&
     (this.registerForm.controls[value].dirty || this.registerForm.controls[value].touched);
 }

  ngOnInit(): void {
  }

}
