import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlacesService } from '../../services/places.service';
@Component({
  selector: 'app-new-place',
  standalone: true,
  imports: [],
  templateUrl: './new-place.component.html',
  styleUrl: './new-place.component.css'
})
export class NewPlaceComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(
    private placesService: PlacesService
  ) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      latitude: new FormControl(),
      longitude: new FormControl(),
      description: new FormControl(),
      image: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.formulario.value)
    const response = await this.placesService.addPlace(this.formulario.value);
    console.log(response);
  }

}






-Correr un programa en angular:

npx ng serve   -- ABRIR LA PAGINA

npx ng g c pages/"Nombre del componente"    -- crear un componente

 npx ng g service services/contactos         --- generar un servicio















import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



ng generate service task






import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

  getTasks(): Observable<any> {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  createTask(task: any) {
    return this.firestore.collection('tasks').add(task);
  }

  updateTask(id: string, task: any) {
    return this.firestore.doc('tasks/' + id).update(task);
  }

  deleteTask(id: string) {
    return this.firestore.doc('tasks/' + id).delete();
  }
}





ng generate component task





<app-task></app-task>






import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[];
  newTask = { title: '', date: '', labels: '' };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        };
      })
    });
  }

  createTask() {
    this.taskService.createTask(this.newTask);
    this.newTask = { title: '', date: '', labels: '' };
  }

  updateTask(task) {
    this.taskService.updateTask(task.id, task);
  }

  deleteTask(id) {
    this.taskService.deleteTask(id);
  }
}






<div>
  <h1>Task Manager</h1>
  <form (ngSubmit)="createTask()">
    <input [(ngModel)]="newTask.title" name="title" placeholder="Title" required>
    <input [(ngModel)]="newTask.date" name="date" placeholder="Date" required>
    <input [(ngModel)]="newTask.labels" name="labels" placeholder="Labels" required>
    <button type="submit">Add Task</button>
  </form>

  <ul>
    <li *ngFor="let task of tasks">
      <input [(ngModel)]="task.title" (change)="updateTask(task)">
      <input [(ngModel)]="task.date" (change)="updateTask(task)">
      <input [(ngModel)]="task.labels" (change)="updateTask(task)">
      <button (click)="deleteTask(task.id)">Delete</button>
    </li>
  </ul>
</div>







form {
  margin-bottom: 20px;
}

input {
  margin-right: 10px;
}

button {
  margin-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}