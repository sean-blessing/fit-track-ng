import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from '../../../model/activity';
import { ActivityService } from '../../../service/activity.service';
import { Router, RouterLink } from '@angular/router';
import { BaseComponent } from '../../../core/base/base.component';
import { SystemService } from '../../../service/system.service';
import { MenuComponent } from "../../../core/menu/menu.component";

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [RouterLink, MenuComponent],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent extends BaseComponent implements OnInit, OnDestroy{
  title: string = 'Activity List';
  activities!: Activity[];

  constructor(private activitySvc: ActivityService,
              sysSvc: SystemService,
              router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.subscription = this.activitySvc.list().subscribe((resp) => {
      this.activities = resp;
      this.activities.sort((a, b) => a.id - b.id);
    });
  }

  delete(id: number): void {
    this.subscription = this.activitySvc.delete(id).subscribe({
      next: () => {
        // refresh activity list.
        this.subscription = this.activitySvc.list().subscribe((resp) => {
          this.activities = resp;
        });
      },
      error: (err) => {
        console.error('Error deleting activity for id:' + id, err);
        alert('Error deleting activity for id:' + id);
      },
    });
  }

}
