import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core'; 
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService} from 'src/app/api.service';
import { Data } from 'src/app/data.model';

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
  people:Data[];
  person = new Data();
  isShown: boolean = true ;
  show: boolean = false;
  values = "";  
  OTP = "";

    constructor(private fb : FormBuilder, private api: ApiService, private httpClient: HttpClient) { 
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]*$')]],
      checkbox: [false, Validators.requiredTrue],
    });
  }
  isValidInput(value:any){
    return this.registerForm.controls[value].invalid &&
     (this.registerForm.controls[value].dirty || this.registerForm.controls[value].touched);
 }
  ngOnInit(): void {
    this.refreshData()
  }
  refreshData() {
    this.api.getData()
      .subscribe(data => {
        // console.warn(data)
        this.people=data;
      })      
      this.api.getDataOtp(this.OTP)
      .subscribe(data => {
        console.warn(data)
        this.people=data;
        // JSON.stringify(this.api.getDataOtp);
      })     
  }
  addData() {
    this.api.addData(this.person)
      .subscribe(data => {
        console.warn(data)
        // this.refreshData();  
      })      
      // console.warn(this.registerForm.value);
      this.registerForm.reset();
      this.isShown = !this.isShown;
      this.show = !this.show;
  }
  // onClick(){
  //   console.warn(this.registerForm.value);
  //   this.registerForm.reset();
  // }
  // submitForm() {
  //   var formData: any = new FormData();
  //   formData.append("fname", this.registerForm.get('fname').value);
  //   formData.append("email", this.registerForm.get('email').value);
  //   formData.append("password", this.registerForm.get('password').value);
  //   this.httpClient.post<any>('http://imginfotech.in/propira/api/registration', formData).subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  // }

  submit(){}

  // getDataOtp() {
  //   this.api.getDataOtp()
  //     .subscribe(data => {
  //       console.warn(data)
  //       this.people=data;
  //     })         
      
  // }
  onKey(event: any) {
    this.values += event.target.value ;
    // JSON.stringify(this.values);
  }

  onClick() {
    if (this.values != JSON.stringify(this.api.getDataOtp)) {
      alert('Incorrect OTP');
    }
    else {
      alert('Verification successful! Please login.');
    }
}
}
