import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, doc, getDoc, deleteDoc, query, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore)
  private usersRef = collection(this.firestore, "users");

  private usersSub?: () => void;  // Store the unsubscribe users function
  private usersSource = new BehaviorSubject<User[]>([]);

  private userSub?: () => void;  // Store the unsubscribe user function
  private userSource = new BehaviorSubject<User>(new User());


  public users$ = this.usersSource.asObservable();  // Expose as an observable
  public user$ = this.userSource.asObservable();  // Expose as an observable

  private birthDate: Date = new Date();

  //addDoc Add Document to collection
  async addUser(user: User) {
    try {
      const docRef = await addDoc(this.usersRef, this.userToJSON(user));
      console.log('Document written with the ID: ', docRef.id);
    } catch (err) {
      console.error(err);
    }
  }

  // Get all documents from a collection
  getUserList() {
    if (this.usersSub) {
      this.usersSub(); //unsubscribe when there is active subscription running
    }
    const q = query(this.usersRef);
    this.usersSub = onSnapshot(q, (querySnapshot) => {
      let updatedUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        updatedUsers.push(this.setUserObject(doc.data(), doc.id));
      });
      this.usersSource.next(updatedUsers);
    });
  }

  //Get a single document
  getSingleUser(docId: string): void {
    const docRef = doc(this.firestore, 'users', docId);
    if (this.userSub) {
      this.userSub();
    }

    this.userSub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        this.userSource.next(userData);
      } else {
        console.log('Document cant be found with the Id: ', docId);
        this.userSource.next(new User());
      }
    }, (error) => {
      console.error('Error fetching document: ', error);
    });
  }

  // Delte a document
  async deleteUser(docId: string) {
    const docRef = doc(this.firestore, 'users', docId);
    try {
      await deleteDoc(docRef) //returning the promise
      console.log('User with ID ', docId, ' sucessful deleted.');
    } catch (e) {
      console.error('Error removing the User: ', e);
      throw e;
    }
  }

  //Update a document
  async updateUser(docId: string, user:User) {
    const docRef = doc(this.firestore, 'users', docId);
    try {
      await updateDoc(docRef, this.userToJSON(user));
    } catch (e) {
      console.error('Error removing the User: ', e);
      throw e;
    }
  }

  userToJSON(obj: any) {
    return {
      firstname: obj.firstname,
      lastname: obj.lastname,
      birthdate: obj.birthdate,
      street: obj.street,
      zipcode: obj.zipcode,
      city: obj.city,
      email: obj.email
    };
  }

  setUserObject(obj: Partial<User>, id: string): User {
    return {
      id: id ?? "",
      firstname: obj.firstname ?? "",
      lastname: obj.lastname ?? "",
      birthdate: obj.birthdate ?? 0,
      street: obj.street ?? "",
      zipcode: obj.zipcode ?? 0,
      city: obj.city ?? "",
      email: obj.email ?? ""
    }
  }

  stopServiceListener() {
    if (this.usersSub) {
      this.usersSub();
      this.usersSub = undefined;
    }
    if (this.userSub) {
      this.userSub();
      this.userSub = undefined;
    }
  }
}
