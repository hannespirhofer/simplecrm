import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../../firebase-services/notes.service';
import { Note } from '../../../models/note.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNoteComponent } from '../dialog/add-note/add-note.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule, MatButtonModule, MatTooltipModule, MatDialogModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {

  private subscription: Subscription = new Subscription();

  constructor(private ns: NotesService, public dialog: MatDialog){}

  notes: Note[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ns.fetchNotes();
    this.subscription = this.ns.notes$.subscribe(notes => {
      this.notes = notes;
    })
  }

  openDialog(): void {
    this.dialog.open(AddNoteComponent)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.ns.stopNotesListeners();
  }

}
