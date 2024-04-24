import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from './../../firebase-services/user.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LiveClockComponent } from '../live-clock/live-clock.component';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../firebase-services/notes.service';
import { Note } from '../../../models/note.interface';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, LiveClockComponent, CommonModule, MatListModule, MatIcon, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private ns: NotesService) { }

  notes: Note[] = [];
  totalUsers?: Observable<number>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.fetchUserCount();
    this.totalUsers = this.userService.userCount$;

    this.ns.fetchNotes();
    this.subscription = this.ns.notes$.subscribe(notes => {
      this.notes = notes;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userService.stopServiceListener();
  }
}
