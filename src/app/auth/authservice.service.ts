import { Injectable, OnChanges, OnInit } from '@angular/core';
import { timer, takeWhile } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { FormDataService } from '../formdata.service';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  

  constructor(private fromdataService:FormDataService,private router:Router,private dataService:DataserviceService) { }
  authenticate(user:string,response:boolean){
    // console.log('before '+this.isUserLoggedIn());
    
    if(response==true){
      sessionStorage.setItem('authenticaterUser',user);
      // console.log('After '+this.isUserLoggedIn());
      return true;
    }else{
      return false;
    }
  }
  handleErrorResponce(error: any) {
    
    console.log(error);
    console.log(error.message);
    return false;
    alert(error.error.message);
    this.router.navigate(['/login'])
    // alert(error.message);
    // throw new Error('Method not implemented.');
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('authenticaterUser')
    return !(user===null)
  }

  logout(){
    sessionStorage.removeItem('authenticaterUser');
  }

 

}
