import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, ViewChildren, ElementRef, ViewChild, Output, EventEmitter  } from '@angular/core'; 
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, interval} from 'rxjs';
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
  resend: boolean= false;
  isAuth: boolean = true;
  values = "";
  otp: string;
  OTP = "";
  auth_token = "";
  showOtpComponent = true;
  image : any;
  user: any;
  @Output() tableDataValues=new EventEmitter<string>();
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
    constructor(private fb : FormBuilder, private api: ApiService, private httpClient: HttpClient, private elementRef: ElementRef,public router: Router) { 
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
  // addData() {
  //   this.api.addData(this.person)
  //     .subscribe(data => {
  //       console.warn(data); 
  //     })      
  //     this.registerForm.reset();
  //     this.isShown = !this.isShown;
  //     this.show = !this.show;
  // }
  submitForm() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8', 'Accept': 'application/json' })
      }; 
     let getDataToSubmit = {
      "name":this.registerForm.get('fname').value,
      "email":this.registerForm.get('email').value,
      "password":this.registerForm.get('password').value,
      "phone_code":"91",
      "mobile":this.registerForm.get('mobile').value,
      "user_type":"1",
      "type":"Web",
      "is_registration":"0"
    }
    this.httpClient.post<any>('http://imginfotech.in/propira/api/registration', getDataToSubmit, httpOptions).subscribe(data => {
		console.log("data recieved",data[0].error);
		if(data[0].error==0){
			this.auth_token = data[0].auth_token;
			this.httpClient.post<any>('http://imginfotech.in/propira/api/sendOtp', {type:"Web",auth_token:data[0].auth_token},httpOptions).subscribe(data => {
        this.registerForm.reset();
				this.isShown = !this.isShown;
				this.show = !this.show;
			});
		}
        console.log(data);
    })
  }
  verifyOtp(){
	  const httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8', 'Accept': 'application/json' })
	  }; 
	  console.log("otp",this.otp);
	  var otp= this.otp;
	  var getDataToSubmit = {
		  "type":"Web",
		  "otp":otp,
		  "auth_token":this.auth_token
	  }
	  this.httpClient.post<any>('http://imginfotech.in/propira/api/verifyOtp', getDataToSubmit, httpOptions).subscribe(data => { 
    console.log(this.user);
    console.log("data",data[0].error);
      if(data[0].error!=0){
        alert("Incorrect OTP! Please try again.")
      }
      else{
        this.router.navigate(['/index'])
        this.api.setLoginStatus(true);
        // this.image = data[0].image;
        // this.fname = data[0].name;
        // console.log (this.image);
        // console.log (data[0].name);
        // console.log(this.api.loginStatus)
        this.tableDataValues.emit(this.fname);
        // this.isAuth = !this.isAuth;
      }    
      console.log("data", data);
	  });
  }

onOtpChange(otp) {
  this.otp = otp;
}
onFinish(){
  this.resend = !this.resend;
}
}
