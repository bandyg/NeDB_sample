import { Component, OnInit } from '@angular/core';
import { TodoItemsService } from '../../services/todo-items.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  searchKey: string;

  constructor(private todoServ: TodoItemsService) { }

  ngOnInit() {
    this.todoServ.getTodos();
    this.todoServ.getDones();
  }

  async search() {
    console.log('search for item');
    console.log(await this.todoServ.getTodos());
  }

  addTodo() {
    this.searchKey.trim();
    if (this.searchKey.length > 0) {

      console.log('add one todo item');
      this.todoServ.todos.push(this.searchKey);
      this.todoServ.insertTodos(this.searchKey);
      this.searchKey = '';
    }
  }

  delTodo(index: number): string {
    if (index >= 0) {
      console.log('del one todo item');
      const item: any = this.todoServ.todos.splice(index, 1);
      this.todoServ.removeTodos(item[0]);
      return item[0];
    }
  }

  delDone(index: number): string {
    if (index >= 0) {
      console.log('del one todo item');
      const item: any = this.todoServ.dones.splice(index, 1);
      this.todoServ.removeDones(item[0]);
      return item[0];
    }
  }

  switchToDone(index: number) {
    if (index >= 0) {
      console.log('switch one todo item');
      //const item: any = this.todoServ.todos.splice(index, 1);
      const item: any = this.delTodo(index);
      this.todoServ.dones.push(item);
      this.todoServ.insertDones(item);
    }
  }

  switchToTodo(index: number) {
    if (index >= 0) {
      console.log('switch one todo item');
      const item: any = this.delDone(index);//this.todoServ.dones.splice(index, 1);
      this.todoServ.todos.push(item);
      this.todoServ.insertTodos(item);
    }
  }

}
