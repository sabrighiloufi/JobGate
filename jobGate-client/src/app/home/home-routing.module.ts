import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ApplicationComponent } from '../application/application.component';
import { CandidateProfileComponent } from '../candidate-profile/candidate-profile.component';
import { CandidatesComponent } from '../candidates/candidates.component';
import { CompaniesComponent } from '../companies/companies.component';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { ContactComponent } from '../contact/contact.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthGuard } from '../guards/auth.guard';
import { CandidateAuthGuard } from '../guards/candidate-auth.guard';
import { CompanyAuthGuard } from '../guards/company-auth.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobListComponent } from '../job-list/job-list.component';
import { LoginComponent } from '../login/login.component';
import { ManageJobsComponent } from '../manage-jobs/manage-jobs.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { PostJobComponent } from '../post-job/post-job.component';
import { PostTestComponent } from '../post-test/post-test.component';
import { RegisterComponent } from '../register/register.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SearchJobsComponent } from '../search-jobs/search-jobs.component';
import { TestComponent } from '../test/test.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, children:[
  {path:'', component: LayoutComponent},
  {path:'job-list', component: JobListComponent},
  {path:'manage-jobs', component: ManageJobsComponent},
  {path:'job-details/:id', component: JobDetailsComponent},
  {path:'candidates', component: CandidatesComponent},
  {path:'candidate-profile/:id', component: CandidateProfileComponent},
  {path:'about', component: AboutComponent},
  {path:'companies', component: CompaniesComponent},
  {path:'company-details/:id', component: CompanyDetailsComponent},
  {path:'login',canActivate:[NoAuthGuard]  ,component: LoginComponent},
  {path:'forgot-password', canActivate:[NoAuthGuard] ,component: ForgotPasswordComponent},
  {path: 'reset-password/:resetPasswordToken',canActivate:[NoAuthGuard] , component : ResetPasswordComponent},
  {path:'register', canActivate:[NoAuthGuard] ,component: RegisterComponent},
  {path:'post-job', canActivate:[CompanyAuthGuard], component: PostJobComponent},
  {path:'post-test/:id', canActivate:[CompanyAuthGuard], component: PostTestComponent},
  {path:'contact-us', component: ContactComponent},
  {path:'my-profile',canActivate:[AuthGuard] ,component: MyProfileComponent},
  {path: 'applications/:offer', canActivate:[CompanyAuthGuard], component: ApplicationComponent},
  {path: 'test/:offer', canActivate:[CandidateAuthGuard], component: TestComponent},
  {path: 'search-jobs', component: SearchJobsComponent}

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
