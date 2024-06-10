import { Component, OnInit, input } from '@angular/core';
import { BookDataService } from '../shared/BookData.service';
import { FormDataService } from '../formdata.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

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
  loading = true;
  isAdmin=false;
  val=''
  constructor(private movies:BookDataService,private formdataServie:FormDataService,private http:HttpClient,private activ:ActivatedRoute,private router:Router,private dataService:DataserviceService){
    this.moive=movies.getDetails(); 
    this.isAdmin=dataService.getAdmin();
    
  }
  ngOnInit(): void {
    this.loading=false;
    let userId=this.dataService.user.user;
    console.log(userId.value+" userID Recived");
    if(!this.isAdmin){
      if(userId==null || userId.length===0){
        // this.searchUser(userId,'email');
      }else{
        this.searchUser(userId,'email');
  
      }
    }
    // this.loading=true;
    
  };
  // assign the value when the component is call
  loadData():void{
    this.loading=true;
     this.formdataServie.getAllFormData().subscribe(
      (data)=>{
        console.log(data);
        this.loading=false;
        this.formData=data;
        console.log("founded user data "+this.formData);
      },
    error=> this.handleErrorResponce(error)
    );
  }
  handleErrorResponce(error: any) {
    this.loading=false
    console.log(error);
    console.log(error.message);
    if(error.error.message){
      alert(error.error.message);
    }else if(error.error.text){
      alert(error.error.text);
    }

    this.router.navigate(['/bookcheck'])
    // alert(error.message);
    // throw new Error('Method not implemented.');
  }

  cancle=false;
  change(){
    this.cancle=true;
  }
  
  cancleTicketUser(email:string,mainId:string,length:number){
    this.loading=true;
    console.log("id "+email,"mainid "+mainId);
    if(length>1){
      this.formdataServie.deletebyIduser(email,mainId).subscribe(
        (response)=>{
          // this.formData=data;
          this.loading=false;
          alert("User Ticket Canceled Done!");
          // console.log("deleted ticket",response);
          this.router.navigate(['']);
        },
        
          error=> this.handleErrorResponce(error)

      )
    }else{
      this.cancleTicket(mainId);
    }
  }
  cancleTicket(id:string){
    this.loading=true;
    console.log(id);
    let userInput=confirm("Are you Sure!");
    if(userInput){
      this.formdataServie.deletebyId(id).subscribe(
        (response)=>{
          // this.formData=data;
          this.loading=false;
          alert("Ticket Canceled Done!");
          console.log("deleted ticket",response);
          this.router.navigate(['']);
        },
        error=> this.handleErrorResponce(error)
        // (error)=>{
        //   this.loading=false;
        //   alert("Error Code 500!");
        //    this.router.navigate(['/error']);
        //   console.error("Error deleting Movies Data",error);
        // }
      )
    }
  } 
  searchUser(userId:string,selectedOption:string): void {
    this.loading=false;
    console.log(userId,selectedOption);
    this.foundUser=[];
    this.val=selectedOption;
    if(userId=='' &&selectedOption!='all'){
      alert("Enter the Value");
    }else if(selectedOption=='all'){
      this.formdataServie.getAllFormData().subscribe(
        (data)=>{
          console.log(data);
          this.loading=false;
          this.foundUser=data;
          console.log("founded user data "+this.formData);
        },
      error=> this.handleErrorResponce(error)
      );
    }
    else{

        if(selectedOption==='movie'){
          console.log("movie method called");
            this.formdataServie.getByMovie(userId).subscribe(
            (response)=>{
              this.loading=false;
              this.status=true;
              console.log(response,"data recived");
              this.foundUser=response;
            },
            error=> this.handleErrorResponce(error)
            // (error)=>{
            //   this.loading=false;
            //   alert("Data Not Found!");
            //   alert("Error Code 500!");
            //   //  this.router.navigate(['/error']);
            //   console.error("Error Founding Movies Data",error);
            // }
          );
        }else if(selectedOption ==='email'){
  
          console.log("email method called");
          this.formdataServie.getByEmail(userId).subscribe(
            (response)=>{
              this.loading=false;
              // this.formData=data;
              this.status=true;
              console.log(response,"data recived");
              this.foundUser=response;
              // this.foundUser.push(response);
            },
            error=> this.handleErrorResponce(error)
            // (error)=>{
            //   this.loading=false;
            //   alert("Data Not Found!");
            //   alert("Error Code 500!");
            //   //  this.router.navigate(['/error']);
            //   console.error("Error Founding Movies Data",error);
            // }
          );
        }else{
          console.log("Name method called");
          this.formdataServie.getByName(userId).subscribe(
            (response)=>{
              this.loading=false;
              // this.formData=data;
              this.status=true;
              console.log(response,"data recived");
              this.foundUser=response;
              // this.foundUser.push(response);
            },
            error=> this.handleErrorResponce(error)
            // (error)=>{
            //   this.loading=false;
            //   alert("Error Code 500!");
            //   prompt("Data Not Found!");
            //   //  this.router.navigate(['/error']);
            //   console.error("Error Founding Movies Data",error);
            // }
          );
        }
        this.status=true;
      }
      this.loading=true;
      this.status=true;
    }
}
