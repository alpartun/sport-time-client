import { EventService } from './shared/event.service';
import { UserService } from './shared/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

/* import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker'; */
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { GetEventsComponent } from './event/get-events/get-events.component';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { EventdetailsComponent } from './event/eventdetails/eventdetails.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    HomeComponent,
    MainNavBarComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    EditProfileComponent,
    ProfileComponent,
    CreateEventComponent,
    GetEventsComponent,
    EventdetailsComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCommonModule,
    MatInputModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    ToastrModule.forRoot({
      positionClass:'toast-top-right'	,
      progressBar:true,
    })
  ],
  providers: [
    UserService,
    ToastrService,
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
