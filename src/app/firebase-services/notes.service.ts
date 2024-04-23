import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
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

  async addNote(note: Partial<Note>) {
    try {
      const docRef = await addDoc(this.notesRef, this.noteToJSON(note));
      console.log('Document written with the ID: ', docRef.id);
    } catch (err) {
      console.error('Failed to add note. ', err);
    }
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

  noteToJSON(note: Partial<Note>): any {
    //id will be set automatically by firestore
    const timestamp = new Date().getTime();
    return {
      title: note.title,
      text: note.text,
      isMarked: note.isMarked,
      created_timestamp: timestamp
    }
  }

  stopNotesListeners() {
    if (this.notesSub) {
      this.notesSub();
    }
  }
}
