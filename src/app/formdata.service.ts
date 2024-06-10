import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataserviceService } from './dataservice.service';
@Injectable({
 providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient,private dataserivce:DataserviceService) {

  }
  createBasicAuthHttp(){
    let user=this.dataserivce.email;
    let password=this.dataserivce.password;
    let basicAuthHeaderString='Basic '+window.btoa(user+':'+password);
    // let basicAuthHeaderString='Basic'+'dXNlcjpkdW1teQ==';
    return basicAuthHeaderString;
  }


  
  private apiUrl = 'http://localhost:3000/api/formdata'; //node server api

  private javaapi='http://localhost:8080/courses';
  private public='http://localhost:8080/public';

  
  submitFormData(formData: any): Observable<any> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    return this.http.post<any>(this.javaapi, formData,{headers});
  }


  addMoive(formData: any): Observable<any> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    const url=`${this.javaapi}/movie`;
    return this.http.post<any>(url, formData,{headers});
  }
  getAllMovie(): Observable<any[]> {
  
    const url=`${this.public}/Movie`;
    return this.http.get<any[]>(url);
  }

  deleteMovie(name:string): Observable<any[]> {

    console.log("movie name " ,name);
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    const url=`${this.javaapi}/DeleteMovie/${name}`;
    return this.http.delete<any[]>(url,{headers});

  }

  getAllFormData(): Observable<any[]> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    return this.http.get<any[]>(this.javaapi,{headers});
  }

  deletebyId(userId:String): Observable<any>{
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })
    const url=`${this.javaapi}/cancle/${userId}`;
    return this.http.delete<any>(url,{headers});
  }
 

  deletebyIduser(userId: string,mainid:string): Observable<any> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })
    const url = `${this.javaapi}/${mainid}/${userId}`;
    return this.http.delete(url,{headers}); 
  }

  // getById(userId:String): Observable<any[]> {
  //   const url = `${this.javaapi}/byId/${userId}`;
  //   return this.http.get<any[]>(url);
  // }

  getByEmail(userId:String): Observable<any[]> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    const url = `${this.javaapi}/byEmail/${userId}`;
    return this.http.get<any[]>(url,{headers});
  }

  getByName(userId:String): Observable<any[]> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })
    const url = `${this.javaapi}/byName/${userId}`;
    return this.http.get<any[]>(url,{headers});
  }

  getByMovie(userId:String): Observable<any[]> {
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })
    const url = `${this.javaapi}/byMovie/${userId}`;
    return this.http.get<any[]>(url,{headers});
  }

  addUser(sinupData:any):Observable<any[]>{
    let basicAuthHeaderString=this.createBasicAuthHttp();
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })
    const url = `${this.public}/AddUser`;
    return this.http.post<any>(url, sinupData);
  }
 

  Login(email:string,password:string){
    console.log("Login Api Called")
    
    const url = `${this.public}/getUser/${email}/${password}`;
    return this.http.get<any>(url);
  }


}