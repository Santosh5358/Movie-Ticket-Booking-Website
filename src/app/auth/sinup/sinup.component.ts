import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { start } from 'repl';
import { startWith } from 'rxjs';
import { FormDataService } from '../../formdata.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { response } from 'express';
import { alphabetsOnlyValidator } from '../../dynamic-form/alphabetsOnlyValidator.service';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrl: './sinup.component.css'
})
export class SinupComponent {

  Sinup!:FormGroup;
  isLoading=false;
  loading =false;
    constructor(private fb:FormBuilder,private formdataServie:FormDataService,private router:Router){
        this.Sinup=fb.group({
            name:['',[Validators.required,alphabetsOnlyValidator()]],
            email:['', [Validators.required,Validators.email]],
            number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
            password:['',[Validators.required,Validators.minLength(4)]],

            
        })
    }
    get v(){
        return this.Sinup.controls;
    }
    onSinup() {
        let email=this.v['email'].value;
        let password=this.v['password'].value;
            this.formdataServie.addUser(this.Sinup.value).subscribe(
              (response)=>{
                // this.formData=data;
                this.loading=false;
                alert("Sinup Done!");
                console.log("deleted ticket",response);
                this.router.navigate(['/login'])
              },
              error=> this.handleErrorResponce(error)
            );

        
        

    }
    handleErrorResponce(error: any) {
      this.loading=false
      console.log(error);
      console.log(error.message);
  
      alert(error.error.message);
      this.router.navigate(['/login'])
      // alert(error.message);
      // throw new Error('Method not implemented.');
    }
}


