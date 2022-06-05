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
   flagAny?:any;
   flag?:boolean;
   list?:Event[];
   getOneEvent?:Event[];
   eventIdList!: string[];
   profileShowEvents!: Event[];
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
  editEvent(formData : any ){
    return this.http.post(this.baseURL+"/Event/EditEvent", formData);
  }
  profileEvents(body:any){
    this.http.post(this.baseURL+"/Event/ProfileEvents", body).subscribe(
      (res:any)=>{
        this.profileShowEvents = res as Event[];
      }
    )


  }

  joinEventS(body:any){

    this.http.post(this.baseURL+"/Event/JoinEvent", body).subscribe(
      (res:any) => {

        if(typeof res == 'number'){
          this.toastr.success('','Joined event.')
        }
        else if(res.message == "You already joined the event."){
          this.toastr.error('','You already joined the event.')

        }
        else if(res.message == "Event size is full."){
          this.toastr.error("","Event size is full!.")
        }
      },
      err => {
        console.log(err);
        this.toastr.error('','Error has occured.')
      }
    );
  }
  disJointEvent(body:any){
    this.http.post(this.baseURL+"/Event/DisjoinEvent", body).subscribe(
      (res:any) => {
        if(res.message == "You succesfully disjoined the event."){
          this.toastr.success('','Disjoined event.')
        }
        else if(res.message == "Error occurs."){
          this.toastr.error('','Some error has occur.')
        }

      },
      err => {
        console.log(err);
        this.toastr.error('','Error has occured.')
      }
    )


  }
/*   buttonStatus(body:any){
    return this.http.post(this.baseURL+"/Event/ButtonStatus", body).toPromise()
    .then((res:any)=>{
      this.flagAny = res.message as string;
      console.log(this.flagAny);
    });


  } */
/*   buttonStatus(body:any){
    return this.http.post(this.baseURL+"/Event/ButtonStatus", body).subscribe(
      (res:any)=>{
        this.flagAny = res.message as string;
        console.log(this.flagAny);
      }
    );
  } */
  buttonStatus(body:any){
    this.http.post(this.baseURL+"/Event/ButtonStatus", body).subscribe(
      (res:any)=>{
        this.eventIdList = res as string[];

      }
    );
    return this.eventIdList;
  }
}
