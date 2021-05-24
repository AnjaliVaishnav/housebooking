import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core'; 
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

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
  data: any=[];
  http: any;
    constructor(private fb : FormBuilder, private api: ApiService, private httpClient: HttpClient) { 
      this.api.getData().subscribe(data=>{
        console.warn(data);
      });
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
      checkbox: [false, Validators.requiredTrue],
    });
  }
  isValidInput(value:any){
    return this.registerForm.controls[value].invalid &&
     (this.registerForm.controls[value].dirty || this.registerForm.controls[value].touched);
 }

  ngOnInit(): void {
  }

  onClick(){
    console.warn(this.registerForm.value);
    this.registerForm.reset();
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("fname", this.registerForm.get('fname').value);
    formData.append("email", this.registerForm.get('email').value);
    formData.append("password", this.registerForm.get('password').value);

    this.httpClient.post<any>('http://imginfotech.in/propira/api/registration', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
