import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './Component/index/index.component';
import { AboutComponent } from './Component/about/about.component';
import { ContactComponent } from './Component/contact/contact.component';
import { NewsComponent } from './Component/news/news.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { PropertyComponent } from './Component/property/property.component';
import { AgentComponent } from './Component/agent/agent.component';
import { AgencyComponent } from './Component/agency/agency.component';
import { ResetpasswordComponent } from './Component/resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Component/header/header.component';
import {FooterComponent } from './Component/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    NewsComponent,
    LoginComponent,
    RegisterComponent,
    PropertyComponent,
    AgentComponent,
    AgencyComponent,
    ResetpasswordComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
