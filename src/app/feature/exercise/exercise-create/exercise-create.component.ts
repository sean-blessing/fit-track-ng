import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../../service/activity.service';
import { ExerciseService } from '../../../service/exercise.service';
import { Exercise } from '../../../model/exercise';
import { Activity } from '../../../model/activity';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../../core/base/base.component';
import { MenuComponent } from "../../../core/menu/menu.component";

@Component({
  selector: 'app-exercise-create',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './exercise-create.component.html',
  styleUrl: './exercise-create.component.css'
})
export class ExerciseCreateComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'Log New Exercise';
  newExercise: Exercise = new Exercise();
  minutes: number = 0;
  seconds: number = 0;
  activitiesList: Activity[] = [];

  constructor(
    private actSvc: ActivityService,
    private exSvc: ExerciseService,
    sysSvc: SystemService,
    router: Router) {
      super(sysSvc, router);
    }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.subscription = this.actSvc.list().subscribe((resp) => {
      this.activitiesList = resp;
      this.newExercise.user = this.sysSvc.loggedInUser;
    });
  }

  logExercise() {
    this.newExercise.elapsedTimeSeconds = this.minutes * 60 + this.seconds;
    this.subscription = this.exSvc.add(this.newExercise).subscribe((resp) => {
      this.router.navigateByUrl('/exercise-list');
    });
  }

}
