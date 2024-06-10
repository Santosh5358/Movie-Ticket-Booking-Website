import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../auth/authservice.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-nav-bar:not(p)',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  currentDateTime!: any;
  isAdmin=false;
  name!:string;
  Uname!:string;
  isUserLoggedIn:boolean=false;
  constructor(public authSerive:AuthserviceService,private router:Router,private dataService:DataserviceService){
    this.isUserLoggedIn=this.authSerive.isUserLoggedIn();
    console.log(this.isUserLoggedIn);
    
    
  }
  ngOnInit() {
    this.isAdmin=this.dataService.getAdmin();
    if(this.isUserLoggedIn){
      this.name=this.dataService.getEmail().split('@')[0];
      this.Uname=this.name.charAt(0).toUpperCase() + this.name.slice(1)

    }
    console.log("name in nav "+this.Uname);

      

      this.updateDateTime();
        setInterval(() => {
            this.updateDateTime();
        }, 100);

  }
  private updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = (now.toLocaleDateString()+" "+now.toLocaleTimeString());
}

  deleteMovie(){

  
  }

  logout(){
    this.authSerive.logout();
    alert("Logout Successfully!")
    this.router.navigate(['/login'])
  }
}
