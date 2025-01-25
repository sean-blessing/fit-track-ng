import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Exercise } from '../../../model/exercise';
import { ExerciseService } from '../../../service/exercise.service';
import { SystemService } from '../../../service/system.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [MenuComponent, FormsModule, RouterLink],
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.css'
})
export class ExerciseDetailComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'Exercise Detail';
  exerciseId!: number;
  exercise!: Exercise;

  constructor(
    private exerciseSvc: ExerciseService,
    sysSvc: SystemService,
    router: Router,
    private actRoute: ActivatedRoute
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.actRoute.params.subscribe((parms) => {
      this.exerciseId = parms['id'];
    });
    this.subscription = this.exerciseSvc.getById(this.exerciseId).subscribe({
      next: (resp) => {
        this.exercise = resp;
      },
      error: (err) => {
        console.log('Error retrieving exercise for id '+this.exerciseId, err);
      }
    });
  }
  
  delete() {
    this.exerciseSvc.delete(this.exerciseId).subscribe({
      next: (resp) => {
        if (resp == false) {
          ('ExerciseDetailComponent - error deleting exercise');
        } else {
          this.router.navigateByUrl('exercise-list');
        }
      },
      error: (err) => {
        console.log('Error deleting exercise for id: '+this.exerciseId, err.message);
      },
      complete: () => {},
    });
  }
}
