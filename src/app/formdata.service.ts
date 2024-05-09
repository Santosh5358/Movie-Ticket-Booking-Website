import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
 providedIn: 'root'
})
export class FormDataService {

  private apiUrl = 'http://localhost:3000/api/formdata'; 
  constructor(private http: HttpClient) {}
  
  submitFormData(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  getAllFormData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deletebyId(userId:string): Observable<any>{
    const url=`${this.apiUrl}/deletedById/${userId}`;
    return this.http.delete<any>(url);
  }
  
  private apiurl='http://localhost:3000';

  deletebyIduser(userId: string,mainid:string): Observable<any> {
    const url = `${this.apiurl}/deleteUser/${mainid}/${userId}`;
    return this.http.delete(url);   
  }

  getById(userId:String): Observable<any[]> {
    const url = `${this.apiurl}/getUser/${userId}`;
    return this.http.get<any[]>(url);
  }

}