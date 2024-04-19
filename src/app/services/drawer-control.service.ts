import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerControlService {

  private drawerState = new BehaviorSubject<boolean>(false);
  drawerState$ = this.drawerState.asObservable();

  constructor() { }

  toggleDrawer() {
    this.drawerState.next(!this.drawerState.value);
  }
}
