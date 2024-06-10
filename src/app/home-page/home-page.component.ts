import { Component, OnChanges, OnInit } from '@angular/core';
import { FormDataService } from '../formdata.service';
import { AuthserviceService } from '../auth/authservice.service';
import { DataserviceService } from '../dataservice.service';
import { map } from 'rxjs/internal/operators/map';
import { timer, takeWhile } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page:not(p)',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit,OnChanges{
// [x: string]: any;
  moives: any[] = [];
  loading = true;
  isUserLoggedIn:boolean=false;

  isAdmin=false;
  cancle=false;
  timeRemaining$ = timer(0, 1000).pipe(
    map(n => 60 - n), // 300 seconds (5 minutes)
    takeWhile(n => n >= 0)
);
ngOnChanges(): void {
  this.timeRemaining$.subscribe({
      complete: () => {
          // Timer completed, set login value to false
          this.authSerive.logout();
      }
  });
}
  constructor(private formdataServie:FormDataService,private authSerive:AuthserviceService,private dataservice:DataserviceService,private router :Router){
    this.isAdmin=this.dataservice.getAdmin();
    // console.log(this.cancle+"recived");
  }
  ngOnInit(): void {

    this.loadData();
    this.isUserLoggedIn=this.authSerive.isUserLoggedIn();
    
  };
  // assign the value when the component is call
  loadData():void{
    this.loading=true;
     this.formdataServie.getAllMovie().subscribe(
      (data)=>{
        if(data.length==0){
          this.moives=this.dummyMovies;
        }
        this.loading=false;
        this.moives=data;
        console.log(this.moives);
      },
      error=> this.handleErrorResponce(error)
    )
  }

  deleteMovie(){
      if(this.cancle===true){
        this.cancle=false;
      }else{
        this.cancle=true;
      }
    
  }
  


  handleErrorResponce(error: any) {
    this.moives=this.dummyMovies;
          this.loading=false;
    console.log(error);
    console.log(error.message);

    // alert(error.error.message);
    // alert(error.message);
    // throw new Error('Method not implemented.');
  }
  data(name:string,imgSrc:string){
    this.dataservice.setData(name,imgSrc);
  }

  cancleMovie(value:string){
    
    this.formdataServie.deleteMovie(value)
       .subscribe(
         (response:any) => {
          this.cancle=false;
          this.loading=false;
           alert("Movie Deleted Successfull");
           this.loadData();
           this.loading=true;
         },
         (error )=> {
          alert("Movie Deleted is Unsuccessful!")
          
         }
       );
  }

  dummyMovies = [
    { movieName: 'Logan', imgSrc: 'https://th.bing.com/th/id/OIP.9RQq34KOh_CypCe4_yk8LwHaEo?w=260&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7', rating: 4.5 },
    { movieName: 'Sci-Fi', imgSrc: 'https://th.bing.com/th/id/OIP.KV4AE1Wf1xrKR2xntIl7gAHaEo?w=272&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', rating: 4.9 },
    { movieName: 'Happy', imgSrc: 'https://th.bing.com/th/id/OIP.6LvtH2kWRU2XX31K0H-VxQHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', rating: 4.2 },
    { movieName: 'Seventh Son', imgSrc: 'https://th.bing.com/th/id/OIP.WnvLKUg6XLSXu0wosVK3lgHaEo?rs=1&pid=ImgDetMain', rating: 4.5 },
    { movieName: 'Rampage', imgSrc: 'https://wallpapers.com/images/file/the-rock-rampage-hollywood-movie-xb0n4qwqh9s6ol6z.jpg', rating: 4.9 },
    { movieName: 'Tomorrow', imgSrc: 'https://4.bp.blogspot.com/-WcDlabF_4io/U1-PY08tQGI/AAAAAAAAA5w/MHABjLQsZkE/s1600/Best+Hollywood+Action+Movies+List+2014+Top+10.jpg', rating: 4.2 }
];
}
