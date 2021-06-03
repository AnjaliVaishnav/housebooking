import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChildren, ElementRef, ViewChild  } from '@angular/core'; 
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  show: boolean = true;
  values = "";
  otp: string;
  OTP = "";
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
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
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
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
        this.people=data; 
      })      
      this.api.getDataOtp(this.otp)
      .subscribe(data => {
        console.warn(data)
        this.people=data;
        // const body = JSON.stringify(this.api.getDataOtp);
        // console.warn(body);
      })     
  }
  addData() {
    this.api.addData(this.person)
      .subscribe(data => {
        console.warn(data); 
      })      
      this.registerForm.reset();
      this.isShown = !this.isShown;
      this.show = !this.show;
  }
  submit(){}
  onClick() {
    this.api.onClick(this.person)
    .subscribe(data => {
      console.warn(data);
      // this.refreshData();  
    })      
    if (this.OTP != this.otp) {
      alert('Incorrect OTP');
    }
    else {
      alert('Verification successful! Please login.');
    }
}
onOtpChange(otp) {
  this.otp = otp;
}
}
