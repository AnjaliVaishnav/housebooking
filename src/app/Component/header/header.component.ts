import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService} from 'src/app/api.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
interface data {
  name: string;
  image : any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  loginStatus : boolean;
  obj : any = [];
  user : any;
  data: any;
  Data: data[];  
  userData: any = {
    name: "",
    image:""
  };

  // @Input() parentData;
  // @Output() userInfo = new EventEmitter<string>();
  // @ViewChild ('name') registerComponent;
  constructor(public api: ApiService, public router: Router) {
      this.api.currentUserName$
      .subscribe(
      userName => {
        // console.log(userName);
      });  
   }
  ngOnInit(){
    this.user = this.api.userInfo$
      .subscribe((data:any = []) => {
        const body = JSON.stringify(data);
        this.userData = body;
        console.log("data is",this.userData);
        console.log(body);
        let obj = data.name;
        console.log(data);
        console.log(obj);
      })
  }
//   userInfo$(){
//     this.api.userInfo$
//     .pipe(take(1))  
//     .subscribe((data:any = []) => {
//     const body = JSON.stringify(data);
//     console.log(body);
//     let obj = data.name;
//     console.log(data);
//     console.log(obj);
//   });
// }
  // onLogin(data) {
  //   this.name = data;
  //   console.log(data);
  //   }
  // receiveMessage($event) {
  //   this.image = $event
  //   this.name = $event
  // }
  // ngAfterViewInit() {
  //   this.name = this.registerComponent.name
  // }
  logout() {
    this.api.setLoginStatus(false);
    this.router.navigate(['/login'])
  }
  }
