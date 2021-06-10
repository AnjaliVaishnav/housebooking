import { Component, OnInit } from '@angular/core';
import { ApiService} from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth : boolean = false;
  loginStatus : boolean = true;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api
      .isAuthenticated()
      // .toPromise()
      // .then(() => this.isAuth = true)
      // .catch(() => this.isAuth = false)
  }
  logout() {
    this.api.setLoginStatus(false);
  }
  }