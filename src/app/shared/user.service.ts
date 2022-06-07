import { ToastrService } from 'ngx-toastr';
import { EventService } from './event.service';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../UserDetails';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  readonly baseURL = 'http://localhost:22359/api';
  eventUsers!: UserDetails[];
  formModelEdit = this.formBuilder.group({
    Id: [''],
    FullName: ['', Validators.required],
    Surname: ['', Validators.required],
    UserName: ['', Validators.required],
    E_Mail: ['', Validators.email],
    ConfirmedE_Mail: ['', Validators.email],
    Age: ['', Validators.required],
    Gender: ['', Validators.required],
    Position: ['', Validators.required],
    Height: [''],
    Weight: [''],
    Passwords: this.formBuilder.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmedPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });
  formModel = this.formBuilder.group({
    FullName: ['', Validators.required],
    Surname: ['', Validators.required],
    UserName: ['', Validators.required],
    E_Mail: ['', Validators.email],
    ConfirmedE_Mail: ['', Validators.email],
    Age: ['', Validators.required],
    Gender: ['', Validators.required],
    Position: ['', Validators.required],
    Height: [''],
    Weight: [''],
    Passwords: this.formBuilder.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmedPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });
  comparePasswords(formGroup: FormGroup) {
    let confirmPswrdCtrl = formGroup.get('ConfirmedPassword');
    //paswordMissmatch
    if (
      confirmPswrdCtrl?.errors == null ||
      'passwordMissmatch' in confirmPswrdCtrl.errors
    ) {
      if (formGroup.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMissmatch: true });
      else confirmPswrdCtrl?.setErrors(null);
    }
  }
  register() {
    var body = {
      FullName: this.formModel.value.FullName,
      Surname: this.formModel.value.Surname,
      UserName: this.formModel.value.UserName,
      Age: this.formModel.value.Age,
      Password: this.formModel.value.Passwords.Password,
      ConfirmedPassword: this.formModel.value.Passwords.ConfirmedPassword,
      E_Mail: this.formModel.value.E_Mail,
      ConfirmedE_Mail: this.formModel.value.ConfirmedE_Mail,
      Gender: this.formModel.value.Gender,
      Position: this.formModel.value.Position,
      Height: this.formModel.value.Height,
      Weight: this.formModel.value.Weight,
    };
    return this.http.post(this.baseURL + '/User/Register', body);
  }
  login(formData: any) {
    return this.http.post(this.baseURL + '/User/Login', formData);
  }
  getUserProfile() {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(this.baseURL + '/UserProfile', {
      headers: tokenHeader,
    });
  }
  deleteUser(body: any) {
    this.http
      .post(this.baseURL + '/User/Delete', body)
      .subscribe((res: any) => {
        if (res.message == 'User deleted.') {
          this.toastr.success('', 'User deleted succesfully.');
        }
      });
  }
  edit(formData: any) {
    /*     var body = {
      Id:this.formModelEdit.value.Id,
      FullName: this.formModelEdit.value.FullName,
      Surname: this.formModelEdit.value.Surname,
      UserName: this.formModelEdit.value.UserName,
      Age: this.formModelEdit.value.Age,
      Password: this.formModelEdit.value.Passwords.Password,
      ConfirmedPassword: this.formModelEdit.value.Passwords.ConfirmedPassword,
      E_Mail: this.formModelEdit.value.E_Mail,
      ConfirmedE_Mail: this.formModelEdit.value.ConfirmedE_Mail,
      Gender: this.formModelEdit.value.Gender,
      Position: this.formModelEdit.value.Position,
      Height: this.formModelEdit.value.Height,
      Weight: this.formModelEdit.value.Weight,
    }; */
    return this.http.post(this.baseURL + '/User/Edit', formData);
  }
  showEventUsers(body: any) {
    this.http
      .post(this.baseURL + '/User/EventUsers', body)
      .subscribe((res: any) => {
        this.eventUsers = res as UserDetails[];
      });
  }
  /* createEvent(user?: UserDetails){
  console.log("asd");
  var form = {
    Name : this.formModel.value.name,
    Description : this.formModel.value.description,
    Location : this.formModel.value.location,
    City : this.formModel.value.city,
    SportType: this.formModel.value.sportType,
    Size : this.formModel.value.size,
    EstimateTime:this.formModel.value.estimateTime,
    Amount:this.formModel.value.amount,
    count:this.formModel.value.count,
    StartDate:this.formModel.value.startDate,
    EndDate:this.formModel.value.endDate,
    createdBy: user?.userName,
  };
  console.log(form.createdBy);
  return this.http.post(this.baseURL+'/Event/Create',form);

} */
}
