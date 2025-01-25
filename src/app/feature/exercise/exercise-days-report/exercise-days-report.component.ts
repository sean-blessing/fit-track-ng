import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../../../model/exercise';
import { BaseComponent } from '../../../core/base/base.component';
import { Router } from '@angular/router';
import { ExerciseService } from '../../../service/exercise.service';
import { SystemService } from '../../../service/system.service';
import { ExerciseDayReport } from '../../../model/exercise-day-rpt';
import { MenuComponent } from "../../../core/menu/menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-days-report',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './exercise-days-report.component.html',
  styleUrl: './exercise-days-report.component.css'
})
export class ExerciseDaysReportComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'Exercise Days Report';
  reportLines!: ExerciseDayReport[];

    constructor(private exerciseSvc: ExerciseService,
                sysSvc: SystemService,
                router: Router
    ) {
      super(sysSvc, router);
    }
  
    override ngOnInit(): void {
      super.ngOnInit();
      this.checkLogin();
      this.subscription = this.exerciseSvc.getDayReport().subscribe((resp) => {
        super.ngOnInit();
        this.reportLines = resp;
      });
    }
}
