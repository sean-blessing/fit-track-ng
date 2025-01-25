import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { Router } from '@angular/router';
import { Activity } from '../../../model/activity';
import { ActivityService } from '../../../service/activity.service';
import { SystemService } from '../../../service/system.service';
import { MenuComponent } from "../../../core/menu/menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './activity-create.component.html',
  styleUrl: './activity-create.component.css'
})
export class ActivityCreateComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Activity Create';
  activity: Activity = new Activity();
  message?: string;

  constructor(private activitySvc: ActivityService,
    sysSvc: SystemService,
    router: Router) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
  }

  save(): void {
    // NOTE: Check for existence of activity name before save?
    this.activitySvc.add(this.activity).subscribe({
      next: (resp) => {
        this.activity = resp;
        this.router.navigateByUrl('/activity-list');
      },
      error: (err) => {
        console.log("Error creating activity: " + err.message);
      },
      complete: () => { 
      }
    });
  }
}
