import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private firestore: Firestore = inject(Firestore);
  private notesRef = collection(this.firestore, "notes");

  private notesSource = new BehaviorSubject<Note[]>([]);
  public notes$ = this.notesSource.asObservable();
  private notesSub?: () => void;

  fetchNotes() {
    if (this.notesSub) {
      this.notesSub(); //unsubscribe when there is active subscription running
    }
    const q = query(this.notesRef);
    this.notesSub = onSnapshot(q, (querySnapshot) => {
      let updatedNotes: Note[] = [];
      querySnapshot.forEach((doc) => {
        updatedNotes.push(this.setObject(doc.data(), doc.id));
      });
      this.notesSource.next(updatedNotes);
    });
  }

  fetchSingleNote(id: string) {

  }

  setObject(obj: Partial<Note>, noteid: string): Note {
    return {
      id: noteid,
      userid: obj.userid ?? "",
      title: obj.title ?? "",
      text: obj.text ?? "",
      created_timestamp: obj.created_timestamp ?? NaN,
      modified_timestamp: obj.modified_timestamp ?? NaN,
      isMarked: obj.isMarked ?? false
    }
  }

  stopNotesListeners() {
    if (this.notesSub) {
      this.notesSub();
    }
  }
}
