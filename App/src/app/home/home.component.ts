import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idFormControl = new FormControl;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  start(){
    var quizID = this.idFormControl.value;

    this.router.navigate(
      ['/quiz'],
      {queryParams:{id:quizID}}
    )
  }

}
