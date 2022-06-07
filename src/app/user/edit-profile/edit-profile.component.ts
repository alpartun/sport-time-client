import { ToastrService } from 'ngx-toastr';
import { UserDetails } from './../../UserDetails';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userDetails?: UserDetails;
  formModelEdit: any;

  hide = true;
  cHide = true;
  selectedValue: string = 'sentiment_very_satisfied';
  selectedGender!: string;
  genders: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];
  constructor(
    public service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.service.isAuthenticated = true;
        this.userDetails = res;
        this.formModelEdit = new FormGroup({
          Id: new FormControl(),
          FullName: new FormControl(this.userDetails?.fullName),
          Surname: new FormControl(),
          UserName: new FormControl(),
          Age: new FormControl(),
          Password: new FormControl(),
          ConfirmedPassword: new FormControl(),
          E_Mail: new FormControl(),
          ConfirmedE_Mail: new FormControl(),
          Gender: new FormControl(this.userDetails?.gender),
          Position: new FormControl(),
          Height: new FormControl(),
          Weight: new FormControl(),
        });
      },
      (err: any) => {
        localStorage.removeItem('token');
        this.service.isAuthenticated = false;
        console.log(err);
        this.router.navigate(['/user/login']);
      }
    );


  }
  check() {
    return this.service.isAuthenticated ? true : false;
  }
  onSubmit(form: NgForm) {
    this.service.edit(form.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/home');
        this.toastr.success('Profile is updated.');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
interface Gender {
  value: string;
  viewValue: string;
}

/*   onSave(){
    console.log(this.userDetails?.id)

    this.service.formModelEdit.value.Id = this.userDetails?.id;

    return this.service.edit().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModelEdit.reset();
          this.toastr.success('New user created succesfully!','Registration succesfull.')
        } else{
          res.errors.forEach((element: { code: any; }) => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken.', 'Registration faild.')
                //Username is already taken.
              break;
              default :
              this.toastr.error('Registration failed.','Registration failed.')
              //Registration failed.
              break;
            }

          });

        }
      },
      err=>{
        console.log(err);
      }
    )

  }
 */
