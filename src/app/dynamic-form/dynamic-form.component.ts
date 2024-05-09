// dynamic-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookDataService } from '../shared/BookData.service';
import { FormDataService } from '../formdata.service';
import { alphabetsOnlyValidator } from './alphabetsOnlyValidator.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  movie!: { name: string;img:String }; //fatch the movie name when the user redirect from index to book page
  dynamicForm!: FormGroup;
  dynamicForm2!:FormGroup;
  status=false;
  selectedMovie!: string; // To store the selected movie name
  isMovieSelected: boolean = false;
  valuePas=false;
  noOfticket=true;
  amount:number=100;
  no=0 ;

  constructor(private fb: FormBuilder,private route:ActivatedRoute,private bookticket:BookDataService,private formDataService: FormDataService,private router:Router) {
    this.dynamicForm = fb.group({
      numberOfPassengers:[0,Validators.required],
      selectedMovie:[''],
      imgsrc:[''],
      passengers:this.fb.array([]),
      amount:[]
  });
  }
  ngOnInit(): void {
    this.movie={
      name:this.route.snapshot.params['name'],
      img:this.route.snapshot.params['img']
    }
    this.route.params.subscribe(
      (params:Params)=>{
        this.movie.name=params['name'];
        this.movie.img=params['img'];
        console.log(this.movie.name);
        console.log(this.movie.img);
      }
    );
    this.isMovieSelected = true;
    this.addPerson();
    this.updatePassengers();
  }
  //validate the input fields with validators
  addPerson():void {
    this.passengers.push(this.fb.group({
      name: ['', [Validators.required, alphabetsOnlyValidator()]],
      email:['',[Validators.required,Validators.email]],
    }));
  }

  get f() {
    return this.dynamicForm.controls;
  }

  get passengers() {
    return this.f['passengers'] as FormArray;
  }

  updatePassengers(): void {
    const numPassengers = this.no;
    console.log("update ",numPassengers);
    if(numPassengers>0){
      this.status=true;
    }else{
      this.status=false;
    }
    while (this.passengers.length !== numPassengers) {
      if (this.passengers.length < numPassengers) {
      this.addPerson();
      } else {
        this.passengers.removeAt(this.passengers.length - 1);
      }
    }
  }
  congrats=false;

  bookTicket: any[] = [];
  onSubmit():void{
    // console.log(this.no,"no of tickets");
    // console.log(this.dynamicForm);
    if (this.dynamicForm.valid) {
      console.log("valided");
      // send data to local
      this.bookticket.tickeAdd(this.dynamicForm.value,this.amount);
    //  send data to the server 
      this.formDataService.submitFormData(this.dynamicForm.value)
       .subscribe(
         (response:any) => {
           const UserId=response.userId;
           alert("Your Ticket Confirmed!");
           alert("Your Ticket Reference no is:  "+UserId);
           console.log("userID is",UserId);
           this.dynamicForm.reset();
           this.passengers.clear();
           this.addPerson();
           this.router.navigate(['/bookcheck']);
         },
         (error )=> {
          alert("Ticket Bokking is Unsuccessful!")
           console.error('Error submitting form data:', error);
          //  alert("Page Broken!");
          this.status=false;
          this.noOfticket=true;
          this.onReset();
           this.router.navigate(['/error']);
         }
       );
      console.log('Form data:', this.dynamicForm.value);
      
      // console.log("after reset ",this.bookTicket);
      
    }
  }
  Add(){
    this.no++;
    console.log(this.no);
    this.amount=this.amount+100;
    this.updatePassengers();
  }
  Delete(){
    this.no--;
    if(this.no===0){
      this.noOfticket=true
    }
    console.log(this.no);
    this.amount=this.amount-100;;
    this.updatePassengers();
  }


  onReset(): void {
    this.dynamicForm.reset();
  }
  onReset2(){
    // this.f['i'].reset();
    // this.formGroupName.reset();
  }

  onMovieSelected(movieName: string): void {
    this.selectedMovie = movieName;
    console.log(movieName);
    this.isMovieSelected = true; // Set to true when a movie is selected
  } 
  
  selected(){
    
    // this.amount=100; 
     this.no = this.f['numberOfPassengers'].value;
      if(this.no>0){
        if(this.no>20){
          alert("Limit reached! Please Select less then 21")
        }else{
          this.amount=this.amount*this.no;
          console.log("seleted value ",this.amount);
          this.valuePas=true;
          this.noOfticket=false;
          this.updatePassengers();
        }
        this.dynamicForm.reset();
      }else{
        alert("Provide Valid Input No");
      }
    }
  
}
