import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionService } from './session';

import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {QuizComponent} from './quiz/quiz.component';
import {HomeComponent} from './home/home.component'


const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[SessionService]},
  {path:'profile',component:ProfileComponent,canActivate:[SessionService]},
  {path:'register',component:RegisterComponent},
  {path:'quiz',component:QuizComponent,canActivate:[SessionService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
