import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Note } from '../../../../models/note.interface';
import { NotesService } from '../../../firebase-services/notes.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatFormField,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {

  constructor(public dialogRef: MatDialogRef<AddNoteComponent>, private noteService: NotesService){}

  loading: boolean = false;
  title = "";
  text = "";
  isMarked = false;


  saveNote() {
    this.noteService.addNote(this.createNote())
      .then(() => {
        console.log('New note added.');
        this.closeDialog();
      })
      .catch((e) => {
        console.error('Error when saving the note. ', e);
      })
  }

  createNote(): Partial<Note> {
    return {
      title: this.title,
      text: this.text,
      isMarked: this.isMarked
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
