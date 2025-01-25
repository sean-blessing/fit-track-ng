import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Exercise } from '../../../model/exercise';
import { ExerciseService } from '../../../service/exercise.service';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../../core/base/base.component';
import { MenuComponent } from "../../../core/menu/menu.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [MenuComponent, RouterLink, CommonModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Exercise List';
  exercises!: Exercise[];

  constructor(private exerciseSvc: ExerciseService,
              sysSvc: SystemService,
              router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.subscription = this.exerciseSvc.list().subscribe((resp) => {
      super.ngOnInit();
      this.exercises = resp;
    });
  }

  delete(id: number): void {
    this.subscription = this.exerciseSvc.delete(id).subscribe({
      next: () => {
        // refresh exercise list.
        this.subscription = this.exerciseSvc.list().subscribe((resp) => {
          this.exercises = resp;
        });
      },
      error: (err) => {
        console.error('Error deleting exercise for id:' + id, err);
        alert('Error deleting exercise for id:' + id);
      },
    });
  }
}
