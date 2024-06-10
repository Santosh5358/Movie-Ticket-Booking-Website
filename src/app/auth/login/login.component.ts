import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { FormDataService } from '../../formdata.service';
import { DataserviceService } from '../../dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Login!:FormGroup;
  isLoading=false;
  invalidLogin=false;
  loading=false;
  isAdmin=false ;
    constructor(private fb:FormBuilder,private authSerivce:AuthserviceService,private router:Router,private fromdataService:FormDataService,private dataService:DataserviceService){
        this.Login=fb.group({
            email:['', [Validators.required,Validators.email]],
            password:['',Validators.required],
            
        })
    }
    get v(){
        return this.Login.controls;
    }
    onLogin() {
      this.loading=true;
      let email=this.v['email'].value;
      let password=this.v['password'].value;
      // alert("Email: "+email+" Password: "+password);
      this.fromdataService.Login(email,password).subscribe(
        (response)=>{
          // this.formData=data;
          this.dataService.setEmail(email,password);
          if(email==='admin@admin.com'){
            this.dataService.setAdmin(true);
          }
          this.loading=false;
          this.dataService.setUserData(email);
          console.log("data recived "+response.toString());
          let is
          if(this.authSerivce.authenticate(email,response)){
            this.router.navigate(['']);
            this.invalidLogin=false;
          }else{
            this.loading=false;
                  alert("Id and Password incorrect");
                  this.invalidLogin=true;
                }
          // sessionStorage.setItem('authenticaterUser',email);
          // return true;
          
        },(error )=> {
          this.loading=false;
            alert(error.error.message);
           console.error('Error submitting form data:', error);
          //  alert("Page Broken!");
         }
        
      );
    //     if(this.authSerivce.authenticate(email,password)){
    //       this.router.navigate(['']);
    //       this.invalidLogin=false;
    //     }else{
    //       alert("Id and Password incorrect");
    //       this.invalidLogin=true;
    //     }
        
    }
    // handleErrorResponce(error: any) {
    
    //   // console.log(error);
    //   if(error.message){
    //     alert(error.message);
    //     console.log(error.message)
    //     return false;
    //   }else{
    //     alert(error.error.message);
    //     console.log(error.error.message);
    //     return false;
    //   }
      
    //   this.router.navigate(['/login'])
    //   // alert(error.message);
    //   // throw new Error('Method not implemented.');
    // }
}
