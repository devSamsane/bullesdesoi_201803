import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { SidenavMenuComponent } from './navigation/sidenav/sidenav-menu/sidenav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { PerinataliteComponent } from './pages/applications/perinatalite/perinatalite.component';

import { ComponentPageTitle } from './shared/page-title/page-title';
import { NavigationItems } from './shared/nav-items/nav-items';
import { SidenavLogoComponent } from './navigation/sidenav/sidenav-logo/sidenav-logo.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { EnfanceComponent } from './pages/applications/enfance/enfance.component';
import { AdolescenceComponent } from './pages/applications/adolescence/adolescence.component';
import { AdulteComponent } from './pages/applications/adulte/adulte.component';
import { SeniorComponent } from './pages/applications/senior/senior.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { DeontologieComponent } from './pages/deontologie/deontologie.component';
import { DescriptionSeancesComponent } from './pages/description-seances/description-seances.component';
import { TarificationComponent } from './pages/tarification/tarification.component';
import { AppointmentComponent } from './rendez-vous/appointment/appointment.component';
import { MapComponent } from './shared/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeDescriptionComponent } from './home/home-description/home-description.component';
import { HomeContactComponent } from './home/home-contact/home-contact.component';
import { HomeApplicationsComponent } from './home/home-applications/home-applications.component';
import { RecaptchaDirective } from './shared/recaptcha/recaptcha.directive';
import { AuthService } from './authentication/auth.service';
import { ToasterService } from './shared/services/toaster/toaster.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavMenuComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    SidenavComponent,
    PerinataliteComponent,
    SidenavLogoComponent,
    FooterComponent,
    EnfanceComponent,
    AdolescenceComponent,
    AdulteComponent,
    SeniorComponent,
    ApplicationsComponent,
    AboutMeComponent,
    DeontologieComponent,
    DescriptionSeancesComponent,
    TarificationComponent,
    AppointmentComponent,
    MapComponent,
    NavbarComponent,
    HomeHeaderComponent,
    HomeDescriptionComponent,
    HomeContactComponent,
    HomeApplicationsComponent,
    RecaptchaDirective

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBEidIrV8EFlQRyt_ra6qcCoBlJTev1mtE' })
  ],
  providers: [NavigationItems, ComponentPageTitle, AuthService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
