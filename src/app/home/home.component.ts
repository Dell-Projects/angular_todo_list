import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  animations: [

    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('200ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
          
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount : number;
  buttonText: string = 'Add goal';
  goalText: string;
  goals = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.goal.subscribe(res => this.goals = res)
    this.itemCount = this.goals.length;
    this.dataService.changeGoal(this.goals);
  }

  addItem() {
    if (this.goalText) {
      this.goals.push(this.goalText);
      this.goalText = null;
      this.itemCount = this.goals.length;
      this.dataService.changeGoal(this.goals);
    }
  }

  removeItem(i:number) {
    this.goals.splice(i, 1);
    this.dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
}
