import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {QuizComponent} from './quiz/quiz.component'


const routes: Routes = [
  {path:'profile',component:ProfileComponent},
  {path:'register',component:RegisterComponent},
  {path:'quiz',component:QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
