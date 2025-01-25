import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { Router } from '@angular/router';
import { Week } from '../../../model/week';
import { SystemService } from '../../../service/system.service';
import { WeekService } from '../../../service/week.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-week-create',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './week-create.component.html',
  styleUrl: './week-create.component.css'
})
export class WeekCreateComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Week Create';
  week: Week = new Week();
  message?: string;

  constructor(private weekSvc: WeekService,
    sysSvc: SystemService,
    router: Router) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
  }

  save(): void {
    // NOTE: Check for existence of week email before save?
    this.weekSvc.add(this.week).subscribe({
      next: (resp) => {
        this.week = resp;
        this.router.navigateByUrl('/week-list');
      },
      error: (err) => {
        console.log("Error creating week: " + err.message);
      },
      complete: () => { 
      }
    });
  }
}
