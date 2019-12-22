import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(public route: ActivatedRoute, private httpClient:HttpClient, private _snackBar: MatSnackBar,public router: Router) { }

  id:string

  ngOnInit() {

    
    this.route.queryParams.subscribe(params=>{
      this.id = params['id']
    });

    if(!this.id){
      this.router.navigate(
        ['/error']
      )
    }

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
    var point;
    var msg;
    var ans = this.answerFormControl.value;
    if(ans == this.quizs[0].cAns ){
      point = 1;
      msg = "Correct Answer";
    }else{
      point = 0;
      msg = "Wrong Answer";
    }
    let body = new HttpParams({
      fromObject:{
        'userID':localStorage.getItem('userID'),
        'point':point,
        'quizID':this.id,
        'ans':ans
      }
    });

    var url = 'http://ec2-18-221-114-73.us-east-2.compute.amazonaws.com:8080/api/ans';
    this.httpClient.post<any>(url,body).subscribe(data=>{console.log(data)});

    let snackBarRef = this._snackBar.open(msg, 'Close');
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(
        ['/profile']
      )
    });
  }

  //http://localhost:4200/quiz?id=a8Hju

}
