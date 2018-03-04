import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavMenuComponent } from './navigation/sidenav-menu/sidenav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { PerinataliteComponent } from './pages/applications/perinatalite/perinatalite.component';

import { ComponentPageTitle } from './shared/page-title/page-title';
import { NavigationItems } from './shared/nav-items/nav-items';
import { SidenavLogoComponent } from './navigation/sidenav-logo/sidenav-logo.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBEidIrV8EFlQRyt_ra6qcCoBlJTev1mtE' })
  ],
  providers: [NavigationItems, ComponentPageTitle],
  bootstrap: [AppComponent]
})
export class AppModule { }
