import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractComponent } from './components/add-contract/add-contract.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddSkillsComponent } from './components/add-skills/add-skills.component';
import { AddSpecialityComponent } from './components/add-speciality/add-speciality.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ApplicationComponent } from './components/application/application.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ContratComponent } from './components/contrat/contrat.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { UnconfirmedCompaniesComponent } from './components/unconfirmed-companies/unconfirmed-companies.component';
import { UnconfirmedJobsComponent } from './components/unconfirmed-jobs/unconfirmed-jobs.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{path:'dashboard', canActivate:[AuthGuard] ,component: HomeComponent, children:[
        {path:'', component: LayoutComponent},
        {path:'companies', component: CompaniesComponent},
        {path:'confirm-companies', component: UnconfirmedCompaniesComponent},
        {path:'jobs', component: JobsComponent},
        {path:'confirm-jobs', component: UnconfirmedJobsComponent},
        {path:'details-jobs/:id', component: JobDetailsComponent},
        {path:'application', component: ApplicationComponent},
        {path: 'contract', component: ContratComponent},
        {path: 'add-contract', component: AddContractComponent},
        {path: 'skills', component: SkillsComponent},
        {path: 'add-skills', component: AddSkillsComponent},
        {path: 'categories', component: CategoriesComponent},
        {path: 'add-category', component: AddcategoryComponent},
        {path: 'specialties', component: SpecialtiesComponent},
        {path: 'add-speciality', component: AddSpecialityComponent},
        {path: 'locations', component: LocationsComponent},
        {path: 'add-location', component: AddLocationComponent},
        {path: 'profile', component: ProfileComponent},
        ]},
        {path: '', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'forgot-password', component: ForgotPasswordComponent},
        {path: 'reset-password/:resetPasswordToken', component: ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
