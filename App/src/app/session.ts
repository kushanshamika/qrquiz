import { Injectable } from '@angular/core';


@Injectable({
    providedIn:'root'
})
export class SessionService {

    private auth:boolean = false;
    private userID:string = "0";
    private userMail:string = "Guest"

    public setAuth(auth: boolean){
        this.auth = auth;
        localStorage.setItem('auth', ''+auth);
    }
    
    getAuth():boolean{
        return localStorage.getItem('auth') == 'true';
    }

    public setID(id: string){
        this.userID = id;
        console.log("ID="+id);
        localStorage.setItem('userID',id);
    }
    
    getID(): string{
        return localStorage.getItem('userID')
    }

    public setUserMail(mail:string){
        this.userMail = mail;
        localStorage.setItem('userMail',mail);
    }

    getUserMail():string{
        return localStorage.getItem('userMail');
    }

}