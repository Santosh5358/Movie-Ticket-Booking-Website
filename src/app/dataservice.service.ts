import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  // data=[];
  data: { name: string; img: string } = { name: '', img: '' };
  name!: string ;
  imgSrc!: string;
  isAdmin=false;
  email!:string;
  userName!:string
  password!:string
  // userData:{name:string;email:string;phone:string}={name:'',email:'',phone:''}
  userData:any[] = []
  user:{user:any}={user:''};
  constructor() { }

 
  setEmail(email:string,password:string){
    this.email=email;
    this.password=password;
  }
  getEmail(){
    return this.email;
  }
 
  setData(name: string,imgSrc: string){
    console.log(name,imgSrc+ " Recived in data")
    this.data.name=name;
    this.data.img=imgSrc;
    
    // this.name=name;
    // this.imgSrc=imgSrc;
  }
  setAdmin(admin:boolean){
    this.isAdmin=admin;
  }
  getAdmin(){
    return this.isAdmin;
  }
  setUserData(data: string){
    this.user.user=data;  
    console.log(this.userData+"dataserivce Data")
  }
  getUser(){
    return this.user;
  }
  getData(){
    // this.data;
    return this.data;
  }

  cleandata(){
    this.name='';
    this.imgSrc='';
    this.isAdmin=false;
    this.email=''
  }
}
