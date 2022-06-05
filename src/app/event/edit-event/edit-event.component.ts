import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserDetails } from './../../UserDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  userDetails!:UserDetails;
  id!:number;
  formModelEdit : any ;


  constructor(private toastr: ToastrService, private route : ActivatedRoute,public userService:UserService,private router : Router, public service : EventService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res:any)=>{
        this.userService.isAuthenticated=true;
        this.userDetails = res ;
      },
      (err:any)=>{
        localStorage.removeItem('token');
        this.userService.isAuthenticated=false;
        console.log(err)
        this.router.navigate(['/user/login']);
      }
    )
    this.id = this.route.snapshot.params['id'];

    this.formModelEdit = new FormGroup({
      Id:new FormControl,
      Name: new FormControl,
      Description: new FormControl,
      City: new FormControl,
      Location: new FormControl,
      SportType: new FormControl,
      Size: new FormControl,
      StartDate: new FormControl,
      EndDate: new FormControl,
      EstimateTime: new FormControl,
      PhotoUrl: new FormControl,
      Amount: new FormControl,
      CreatedBy: new FormControl,
      count:new FormControl,
    });


  }
  getOne(id:number){

  }
  check(){
    return this.userService.isAuthenticated? true:false;
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    this.service.editEvent(form.value).subscribe((res:any)=>
    {
      this.router.navigate(['/eventdetails/'+this.id]);
      this.toastr.success('Event is updated.')

    },
    err => {
      console.log(err);
    }
    );

  }
}
