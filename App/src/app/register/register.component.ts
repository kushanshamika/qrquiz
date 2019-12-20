import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient,HttpParams } from '@angular/common/http';
import { SessionService } from '../session';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl;

  constructor(private http: HttpClient,private session: SessionService,public router: Router) { }

  ngOnInit() {
  }

  start(){
    var userMail = this.emailFormControl.value;

    let body = new HttpParams({
      fromObject:{
        'userMail':userMail
      }
    });

    var url = 'http://ec2-18-221-114-73.us-east-2.compute.amazonaws.com:8080/api/user';

    this.http.post<any>(url,body).subscribe(
      data=>{
        this.session.setAuth(true);
        this.session.setID(data['userID']);
        this.session.setUserMail(userMail)
      }
    )
    this.router.navigate(
      ['/profile']
    )

  }

}
