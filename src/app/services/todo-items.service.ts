import { Injectable } from '@angular/core';
import * as Nedb from '../../libs/db';
//import { Datastore } from 'nedb-async-await';
//TODO: BUILD THE DB INIT AND CREATE METHOD ASYNC CORRECTLY.
@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  db: any = null;
  todos: string[] = [];
  dones: string[] = [];

  constructor() {
    this.db = Nedb('todos.db');
    console.log(this.db);
    this.initDB(); 
  }

  async getTodos() {
    const todos = await this.db.find({ collection: 'Todos' });
    if ( todos.length !== 0 && todos[0].Todos !== null ) {
      this.todos = todos[0].Todos;   
    }
    return this.todos;
  }

  async getDones() {
    const dones = await this.db.find({ collection: 'Dones' });
    if ( dones.length !== 0 && dones[0].Dones !== null ) {
      this.dones = dones[0].Dones;
    }
    return this.dones;
  }

  async insertTodos(newTodo: string) {
    await this.db.update({ collection: 'Todos' }, { $push: { Todos: newTodo } }, {});
  }

  async insertDones(newDone: string) {
    await this.db.update({ collection: 'Dones' }, { $push: { Dones: newDone } }, {});
  }

  async removeTodos(rmTodo: string) {
    const rmCount = await this.db.update({ collection: 'Todos' }, { $pull: {Todos: rmTodo} } );
  }

  async removeDones(rmDone: string) {
    const rmCount = await this.db.update({ collection: 'Dones' }, { $pull: {Dones: rmDone} } );
  }

  async initTodos() {
    await this.db.insert({ collection: 'Todos' });
    const docs = await this.db.find();
    console.log(docs);
  }

  async initDones() {
    await this.db.insert({ collection: 'Dones' });
    const docs = await this.db.find();
    console.log(docs);
  }

  async testFind() {
    const docs = await this.db.find({});
    console.log(docs);
  }

  async resetDB() {
    await this.db.remove({}, { multi: true });
  }

  async initDB() {
    const anyCollection = await this.db.find({});

    if (anyCollection.length === 0) {
      this.initTodos();
      this.initDones();
    }

    const todosCollection = await this.db.find({ collection: 'Todos' });
    if (todosCollection.length !== 0) {
      //do nothing, empty todos
    }
  }

}
