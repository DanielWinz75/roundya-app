import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPlacesComponent } from './list-places/list-places.component';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'places',
    component: ListPlacesComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },  
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
