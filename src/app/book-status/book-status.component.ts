import { Component, OnInit } from '@angular/core';
import { BookDataService } from '../shared/BookData.service';
import { FormDataService } from '../formdata.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-book-status:not(p)',
  templateUrl: './book-status.component.html',
  styleUrl: './book-status.component.css'
})
export class BookStatusComponent implements OnInit{
  // movie!: []=bookTicket[]
  moive: any[] = []; //for local store
  formData: any[] = []; //for mongoDB
  foundUser:any[]=[];
  deleate:any[]=[];
  status=false
  constructor(private movies:BookDataService,private formdataServie:FormDataService,private http:HttpClient,private activ:ActivatedRoute,private router:Router){
    this.moive=movies.getDetails(); //fatch data form database
  }
  ngOnInit(): void {
    this.loadData();
    
    
  };
  // assign the value when the component is call
  loadData():void{
     this.formdataServie.getAllFormData().subscribe(
      (data)=>{
        this.formData=data;
        console.log(this.formData);
      },
      (error)=>{
        // alert("Page Broken!");
        // this.router.navigate(['/error']);
        console.error("Error fetching Movies Data");
      }
    )
  }
  cancle=false;
  change(){
    this.cancle=true;
  }
  cancleTicketUser(id:string,mainId:string,length:number){
    if(length>1){
      this.formdataServie.deletebyIduser(id,mainId).subscribe(
        (response)=>{
          // this.formData=data;
          alert("User Ticket Canceled Done!");
          console.log("deleted ticket",response);
          this.router.navigate(['']);
        },
        (error)=>{
          console.error("Error deleting Movies Data",error);
        }
      )
    }else{
      this.cancleTicket(mainId);
    }
  }
  cancleTicket(id:string){
    console.log(id);
    let userInput=confirm("Are you Sure!");
    if(userInput){
      this.formdataServie.deletebyId(id).subscribe(
        (response)=>{
          // this.formData=data;
          alert("Ticket Canceled Done!");
          console.log("deleted ticket",response);
          this.router.navigate(['']);
        },
        (error)=>{
          alert("Error Code 500!");
           this.router.navigate(['/error']);
          console.error("Error deleting Movies Data",error);
        }
      )
    }
  }
  searchUser(userId:HTMLInputElement): void {
    if(userId.value!=='showdb'){
      this.formdataServie.getById(userId.value).subscribe(
        (response)=>{
          // this.formData=data;
          this.status=true;
          console.log(response,"data recived");
          this.foundUser.push(response);
        },
        (error)=>{
          alert("Error Code 500!");
          //  this.router.navigate(['/error']);
          console.error("Error Founding Movies Data",error);
        }
      );
    }
    this.status=true;
  }
}
