import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Exercise } from '../../../model/exercise';
import { ExerciseService } from '../../../service/exercise.service';
import { SystemService } from '../../../service/system.service';
import { Activity } from '../../../model/activity';
import { ActivityService } from '../../../service/activity.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-edit',
  standalone: true,
  imports: [MenuComponent, FormsModule, RouterLink],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css'
})
export class ExerciseEditComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'Exercise Edit';
  exerciseId!: number;
  exercise!: Exercise;
  // list of users not necessary - field is not editable
  // list of activities for user to select from
  activities: Activity[] = [];
  // list of weeks not necessary - will be determined by back-end

  constructor(
    private exerciseSvc: ExerciseService,
    private actSvc: ActivityService,
    sysSvc: SystemService,
    router: Router,
    private actRoute: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.actRoute.params.subscribe((parms) => {
      this.exerciseId = parms['id'];
      this.subscription = this.exerciseSvc.getById(this.exerciseId).subscribe({
        next: (resp) => {
          this.exercise = resp;
          this.subscription = this.actSvc.list().subscribe((resp) => {
            this.activities = resp;
          })
        },
        error: (err) => {
          console.log('Error retrieving exercise for id ' + this.exerciseId, err);
        }
      });
    });
  }

  save(): void {
    // NOTE: Check for existence of exercise email before save?
    this.exerciseSvc.edit(this.exercise).subscribe({
      next: (resp) => {
        this.exercise = resp;
        this.router.navigateByUrl('/exercise-list');
      },
      error: (err) => {
        console.log('Error updating exercise for id: ' + this.exerciseId, err.message);
      },
      complete: () => { },
    });
  }

  compActivity(a: Activity, b: Activity): boolean {
    return a && b && a.id === b.id;
  }
}
