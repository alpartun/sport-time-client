import { ToastrService } from 'ngx-toastr';
import { UserDetails } from './../UserDetails';
import { UserService } from 'src/app/shared/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Event } from './../Event';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private formBuilder : FormBuilder, private http : HttpClient,private toastr : ToastrService) { }
   readonly baseURL = 'http://localhost:22359/api';
   list?:Event[];
   getOneEvent?:Event[];
   formModel = this.formBuilder.group({
    name:['',Validators.required],
    description:['',Validators.required,],
    city:['',Validators.required],
    location:['',Validators.required],
    sportType:['',Validators.required],
    size:['',Validators.required],
    startDate:['',Validators.required],
    endDate:['',Validators.required],
    estimateTime:['',Validators.required],
    photoUrl:[''],
    amount:[''],
    count:[],
    users:[],
    createdBy:[''],
  });
  createEvent(user?: UserDetails){
    var form = {
      Name : this.formModel.value.name,
      Description : this.formModel.value.description,
      Location : this.formModel.value.location,
      City : this.formModel.value.city,
      SportType: this.formModel.value.sportType,
      Size : this.formModel.value.size,
      EstimateTime:this.formModel.value.estimateTime,
      Amount:this.formModel.value.amount,
      count:0,
      StartDate:this.formModel.value.startDate,
      EndDate:this.formModel.value.endDate,
      createdBy: user?.userName,
    };
    console.log(form)
    return this.http.post(this.baseURL+"/Event/Create", form);
  }
  refreshList(){
    this.http.get(this.baseURL+"/Event/GetEvents").toPromise()
    .then(res => this.list = res as Event[]);
    return this.list;

  }
  eventsList(): Observable<Event[]> {
    return this.http.get(this.baseURL+"/Event/GetEvents").pipe(
      map((res=> this.list = res as Event[]))
    );
}

  getOne(id:any){
    return this.http.get(this.baseURL+"/Event/GetEvents/"+id).toPromise()
    .then(res=> this.getOneEvent = res as Event[])

/*     console.log(this.getOneEvent);
    return this.getOneEvent; */
  }

  joinEventS(body:any){
    console.log("selam");
    console.log(body);
    this.http.post(this.baseURL+"/Event/JoinEvent", body).subscribe(
      (res:any) => {
        console.log(res);
        this.toastr.success('','Joined event.')
      },
      err => {
        console.log(err);
        this.toastr.error('','Error has occured.')
      }
    );
  }
}
