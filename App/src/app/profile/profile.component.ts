import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

interface User{
  userID:number,
  userMail:string,
  userPoint:number,
  userACount:number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users:User[] = [];

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

    let body = new HttpParams({
      fromObject:{
        'userID':localStorage.getItem('userID')
      }
    })

    var url = 'http://ec2-18-221-114-73.us-east-2.compute.amazonaws.com:8080/api/profile';
    this.httpClient.post<User[]>(url,body).subscribe(data=>{this.users=data;console.log(data)})


  }

}
