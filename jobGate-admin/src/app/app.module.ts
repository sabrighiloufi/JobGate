import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './components/companies/companies.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchnamecompaniesPipe } from './pipes/searchnamecompanies.pipe';
import { JobsComponent } from './components/jobs/jobs.component';
import { SearchtitleJobPipe } from './pipes/searchtitle-job.pipe';
import { ApplicationComponent } from './components/application/application.component';
import { ContratComponent } from './components/contrat/contrat.component';
import { SearchnamecontractPipe } from './pipes/searchnamecontract.pipe';
import { AddContractComponent } from './components/add-contract/add-contract.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AddSkillsComponent } from './components/add-skills/add-skills.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { AddSpecialityComponent } from './components/add-speciality/add-speciality.component';
import { LocationsComponent } from './components/locations/locations.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { SearchLocationPipe } from './pipes/search-location.pipe';
import { UnconfirmedJobsComponent } from './components/unconfirmed-jobs/unconfirmed-jobs.component';
import { UnconfirmedCompaniesComponent } from './components/unconfirmed-companies/unconfirmed-companies.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    CompaniesComponent,
    SearchnamecompaniesPipe,
    JobsComponent,
    SearchtitleJobPipe,
    ApplicationComponent,
    ContratComponent,
    SearchnamecontractPipe,
    AddContractComponent,
    SkillsComponent,
    AddSkillsComponent,
    CategoriesComponent,
    AddcategoryComponent,
    SpecialtiesComponent,
    AddSpecialityComponent,
    LocationsComponent,
    AddLocationComponent,
    SearchLocationPipe,
    UnconfirmedJobsComponent,
    UnconfirmedCompaniesComponent,
    JobDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
