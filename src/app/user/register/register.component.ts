import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  cHide = true;
  selectedValue: string = 'sentiment_very_satisfied';
  selectedGender!: string;
  genders: Gender[] = [
    {value:'male', viewValue:'Male'},
    {value:'female', viewValue:'Female'},
];
  constructor(public service: UserService, private toastr :ToastrService) {  }
  ngOnInit(): void {
    this.service.formModel.reset();
  }
  onSubmit(){
    return this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user created succesfully!','Registration succesfull.')
        } else{
          res.errors.forEach((element: { code: any; }) => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken.', 'Registration faild.')//Username is already taken.
              break;
              default :
              this.toastr.error('Registration failed.','Registration failed.')//Registration failed.
              break;
            }});
        }
      },
      err=>{
        console.log(err);
      }
    );
  }
}
interface Gender{
  value:string;
  viewValue:string;
}
