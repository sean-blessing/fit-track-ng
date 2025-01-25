import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseComponent } from '../../core/base/base.component';
import { SystemService } from '../../service/system.service';
import { MenuComponent } from "../../core/menu/menu.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, MenuComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent extends BaseComponent implements OnInit, OnDestroy{
  
  constructor(
    sysSvc:SystemService,
    router: Router
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
  }



}
