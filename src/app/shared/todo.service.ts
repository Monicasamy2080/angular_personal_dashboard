import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import {Todo} from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos:Todo[]=[
    new Todo('this is a test'),
    new Todo('Hey!!!')
  ]
  localItem:string|any
  // storageListSub
  constructor() {
    // this.todos[0].completed=true
    // this.todos[1].completed=true
    this.loadState()
    //   fromEvent(window,'storage').subscribe((event:StorageEvent)=>{
    //   if(event.key==='notes') this.loadState()
    //   // console.log("storage event fireds!")
    //   // console.log(event)
    // })
   }
  getTodos(){
    return this.todos
  }
  getTodo(id:string|any){
    return this.todos.find(t=>t.id===id)

  }
  addTodo(todo:Todo){
    this.todos.push(todo)
    this.saveState()
  }
  updateTodo(id:string|any,updateTodoFields:Partial<Todo>){
    const todo:any=this.getTodo(id)
    Object.assign(todo,updateTodoFields)
    this.saveState()
  }
  deleteTodo(id:string|any){
    const index=this.todos.findIndex(t=>t.id===id)
    if(index==-1) return
    this.todos.splice(index,1)
    this.saveState()
  }
  saveState(){
    localStorage.setItem('todos',JSON.stringify(this.todos))
  }
  loadState(){
    try{
      this.localItem = localStorage.getItem("todos");
      const todosInStorage = JSON.parse(this.localItem);
      if(!todosInStorage) return
      this.todos.length=0//clear the notes array (while keeping the reference)
      // this.notes=notesInStorage
      this.todos.push(...todosInStorage)
    }catch(e){
      console.log('there was an error retrieving the todos from localStorage')
      console.log(e)
    }  
  }  
}
