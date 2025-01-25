import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { Router } from '@angular/router';
import { ExerciseService } from '../../../service/exercise.service';
import { SystemService } from '../../../service/system.service';
import { ExerciseWeekReport } from '../../../model/exercise-week-rpt';
import { MenuComponent } from "../../../core/menu/menu.component";
import { Week } from '../../../model/week';
import { WeekService } from '../../../service/week.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-weeks-report',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './exercise-weeks-report.component.html',
  styleUrl: './exercise-weeks-report.component.css'
})
export class ExerciseWeeksReportComponent extends BaseComponent implements OnInit, OnDestroy {
  title: string = 'Exercise Weeks Report';
  reportLines!: ExerciseWeekReport[];
  sum: number = 0;
  weeksMap: Map<number, Week> = new Map<number, Week>();

    constructor(private exerciseSvc: ExerciseService,
                private weekSvc: WeekService,
                sysSvc: SystemService,
                router: Router
    ) {
      super(sysSvc, router);
    }
  
    override ngOnInit(): void {
      super.ngOnInit();
      this.checkLogin();
      this.subscription = this.exerciseSvc.getWeekReport().subscribe((resp) => {
        super.ngOnInit();
        this.reportLines = resp;
        this.sum = this.reportLines.reduce((total, item) => total + item.count, 0);
        // get weeks for lookup against week report
        this.subscription = this.weekSvc.list().subscribe((resp) => {
          resp.forEach((item) => {
            this.weeksMap.set(item.weekNumber, item);
          });
        });
      });
    }
    
    getWeek(nbr: number) {
      return this.weeksMap.get(nbr);
    }
}
