import { UserDetails } from './UserDetails';
export interface Event {
  id?:number,
  name?:string,
  description?:string,
  city?:string,
  location?:string,
  sportType?:string,
  size?:string,
  startDate?: string,
  endDate?: string,
  estimateTime? : string,
  photoUrl?: string,
  amount?:string,
  count?:number,
  createdBy?:string,
  users? : UserDetails,
  contact?:string,

}
