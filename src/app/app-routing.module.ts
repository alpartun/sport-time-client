import { EditEventComponent } from './event/edit-event/edit-event.component';
import { EventdetailsComponent } from './event/eventdetails/eventdetails.component';
import { GetEventsComponent } from './event/get-events/get-events.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { EventComponent } from './event/event.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {path:'event',component:EventComponent,canActivate:[
    AuthGuard
  ]},
  {path:'create-event',component:CreateEventComponent,canActivate:[
    AuthGuard
  ]},

  {path:'user', component:UserComponent,
children:[
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
]},
  {path:'home',component:HomeComponent,canActivate:[
    AuthGuard
  ]},
  {path:'profile',component:ProfileComponent,canActivate:[
    AuthGuard
  ]},
  {path:'edit-profile',component:EditProfileComponent,canActivate:[
    AuthGuard
  ]},
  {path:'get-events',component:GetEventsComponent,canActivate:[
    AuthGuard
  ]},
  {path :'eventdetails/:id',component: EventdetailsComponent,canActivate:[
    AuthGuard
  ]},
  {path:'edit-event/:id',component:EditEventComponent, canActivate:[
    AuthGuard
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
