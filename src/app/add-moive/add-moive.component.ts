// movie-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../formdata.service';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';

@Component({
  selector: 'app-add-moive',
  templateUrl: './add-moive.component.html',
  styleUrl: './add-moive.component.css'
})
export class AddMoiveComponent {
    movieForm!: FormGroup;
    loading= true;
    imgURL: any;
    public file: any;
    imageBase64: string='';

    constructor(private fb: FormBuilder,private formdataServie:FormDataService ,private router:Router) {}

    ngOnInit() {
        this.movieForm = this.fb.group({
          movieName: ['', Validators.required],
          rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
          imgSrc: [null, Validators.required]
        });
    }
    // this.f['numberOfPassengers'].value

    get f() {
      return this.movieForm.controls;
    }


    addMovie() {
        // Implement logic to send data to the database (e.g., via an API)
        const uploadData = new FormData();
        uploadData.append('myFile',this.file,this.file.name)
        console.log('Movie added:', );
        this.formdataServie.addMoive(this.movieForm.value).subscribe(
          (response)=>{
            this.loading=false;
            alert("Movie Added!");
            this.movieForm.reset();
            this.router.navigate(['']);
          },
          (error)=>{
            console.log(error.error.text);
            this.loading=false;
            alert(error.error.text);
            this.movieForm.reset();
            this.router.navigate(['']);
            //  this.router.navigate(['/error']);
            console.error("Error Founding Movies Data",error);
          }
        );
    }

    handleImageUpload(event: any) {
      console.log("event"+event);
         this.file = event.target.files[0];
        // console.log(this.file+"file image")
        // console.log("file URl"+ this.file.URl)
        console.log("file Name"+ this.file.name)
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event2) => {
          this.imgURL = reader.result;
          console.log("imagIUrl"+this.imgURL);
        this.movieForm.patchValue({ movieImage: this.file });
      };
    }
};
