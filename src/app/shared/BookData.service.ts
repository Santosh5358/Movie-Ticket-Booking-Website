import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class BookDataService{
    bookTicket: any[] = [];
    tickeAdd(book: any,price:number){
        this.bookTicket.push(book,price);
    }
    getDetails(){
        return this.bookTicket;
    }
}