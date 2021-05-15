import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Component/about/about.component';
import { AgencyComponent } from './Component/agency/agency.component';
import { AgentComponent } from './Component/agent/agent.component';
import { ContactComponent } from './Component/contact/contact.component';
import { IndexComponent } from './Component/index/index.component';
import { LoginComponent } from './Component/login/login.component';
import { NewsComponent } from './Component/news/news.component';
import { PropertyComponent } from './Component/property/property.component';
import { RegisterComponent } from './Component/register/register.component';
import { ResetpasswordComponent } from './Component/resetpassword/resetpassword.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'agent', component: AgentComponent},
  {path: 'agency', component: AgencyComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'reset', component: ResetpasswordComponent},
  {path: 'property', component: PropertyComponent},
  {path: 'news', component: NewsComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  // {path: '**', component: pageNot},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
