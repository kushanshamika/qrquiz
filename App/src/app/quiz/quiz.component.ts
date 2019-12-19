import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormControl } from '@angular/forms';

interface Quiz{
  status:boolean;
  quizId:string;
  q:string;
  a1:string;
  a2:string;
  a3:string;
  a4:string;
  cAns:number
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizs:Quiz[] = [];

  answerFormControl = new FormControl;

  constructor(public route: ActivatedRoute, private httpClient:HttpClient) { }

  id:string

  ngOnInit() {

    
    this.route.queryParams.subscribe(params=>{
      this.id = params['id']
    });

    let body = new HttpParams({
      fromObject:{
        'quizID':this.id,
        'userID':localStorage.getItem('userID')
      }
    })

    var url = "http://ec2-18-221-114-73.us-east-2.compute.amazonaws.com:8080/api/quiz";
    this.httpClient.post<Quiz[]>(url,body).subscribe(data=>{this.quizs=data;console.log(data)})

  }

  submit(){
    alert(this.quizs[0].cAns)
  }

  //http://localhost:4200/quiz?id=a8Hju

}
