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
import { FooterComponent } from './footer/footer.component';


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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [NavigationItems, ComponentPageTitle],
  bootstrap: [AppComponent]
})
export class AppModule { }
