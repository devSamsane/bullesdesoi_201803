import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { PerinataliteComponent } from './pages/applications/perinatalite/perinatalite.component';
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



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'applications/perinatalite', component: PerinataliteComponent },
  { path: 'applications/enfance', component: EnfanceComponent },
  { path: 'applications/adolescence', component: AdolescenceComponent },
  { path: 'applications/adulte', component: AdulteComponent },
  { path: 'applications/senior', component: SeniorComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'a_mon_propos', component: AboutMeComponent },
  { path: 'deontologie', component: DeontologieComponent },
  { path: 'prestations', component: DescriptionSeancesComponent },
  { path: 'tarification', component: TarificationComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'rdv', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
