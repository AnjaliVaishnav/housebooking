import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AgencyComponent } from './agency/agency.component';
import { AgentComponent } from './agent/agent.component';
import { ContactComponent } from './contact/contact.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { PropertyComponent } from './property/property.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

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
