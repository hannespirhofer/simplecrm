import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../models/note.interface';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from '../../../firebase-services/notes.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    MatProgressBar,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss'
})
export class EditNoteComponent {
  noteForm!: FormGroup;

  loading = false;
  note: Note;

  constructor(
    private noteService: NotesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {note: Note}) {
      this.note = data.note;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.noteForm = this.fb.group({
      title: [''],
      text: [''],
      isMarked: [false]
    });

    this.noteForm.setValue({title: this.data.note.title, text: this.data.note.text, isMarked: this.data.note.isMarked});
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveNote() {
    try {
      this.noteService.updateNote(this.data.note.id, this.noteForm.value);
      this.closeDialog();
    } catch (error) {
      console.error('Error updating th note: ', error);
    }
  }

  createNoteJSON(): Partial<Note> {
    return {
      title: this.note.title,
      text: this.note.text,
      isMarked: this.note.isMarked,
      modified_timestamp: new Date().getTime()
    }
  }
}
