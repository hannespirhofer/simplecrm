import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../../firebase-services/notes.service';
import { Note } from '../../../models/note.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNoteComponent } from '../dialog/add-note/add-note.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditNoteComponent } from '../dialog/edit-note/edit-note.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatAccordion
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {

  private subscription: Subscription = new Subscription();

  constructor(
    private ns: NotesService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }

  noteId: string = '';
  notes: Note[] = [];
  openedNoteId: string | null = null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ns.fetchNotes();
    this.subscription = this.ns.notes$.subscribe(notes => {
      this.notes = notes;
    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.openedNoteId = params['id'];
    })
  }

  async deleteNote(id: string) {
    try {
      await this.ns.deleteNote(id);
      console.log('Deleted Note with ID: ', id);
    } catch (error) {
      console.log('Problem deleting the Note document.');
    }
  }

  openNewNoteDialog(): void {
    this.dialog.open(AddNoteComponent)
  }

  openEditNoteDialog(note: Note): void {
    this.dialog.open(EditNoteComponent, {
      data: {
        note: note
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.ns.stopNotesListeners();
  }

}
