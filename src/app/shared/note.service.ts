import { Injectable, OnDestroy } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{
  
  
  notes:Note[]=[
    new Note('Test title','test content'),
    new Note('Hey!','testing one two three')
  ]
  localItem:string|any
  storageListSub?:Subscription
  // event?:StorageEvent
  constructor() { 

    this.loadState()
    //used to load data without refresh page but there is error
  //  this.storageListSub= fromEvent(window,'storage').subscribe((event:StorageEvent)=>{
  //     if(event.key==='notes') this.loadState()
  //     // console.log("storage event fireds!")
  //     // console.log(event)
  //   })
   
  }
  ngOnDestroy() {
    if(this.storageListSub) this.storageListSub.unsubscribe()
  }

  getNotes(){
    return this.notes
  }

  getNote(id:any){
      // return true when n.id equals the id passed into this method 
      return this.notes.find(n=> n.id===id)
  }

  addNote(note:Note){
    this.notes.push(note)
    this.saveState()
  }

  // updateNote(id:string|null|undefined,updatedFields:Partial<Note>){
  updateNote(id:any,updatedFields:Partial<Note>){
    const note:any=this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState()

    // note=Object.assign({}, updatedFields); does not work
  } 

  deleteNote(id:string|any){
    const noteIndex=this.notes.findIndex(n=>n.id===id)
    if(noteIndex==-1) return
    this.notes.splice(noteIndex,1)
    this.saveState()

  }
  // save data in local storage
  saveState(){
    localStorage.setItem('notes',JSON.stringify(this.notes))
  }
  loadState(){
    // this.localItem = localStorage.getItem("notes");
    // if(this.localItem == null){
    //   this.notes = [];
    // }
    // else{
    //   const  notesInStorage = JSON.parse(this.localItem);
    //   this.notes=notesInStorage
    // }

    try{
      
      this.localItem = localStorage.getItem("notes");

        
      const notesInStorage = JSON.parse(this.localItem);
      // if(!notesInStorage) return

      this.notes.length=0//clear the notes array (while keeping the reference)
      // this.notes=notesInStorage
      this.notes.push(...notesInStorage)

    }catch(e){
      console.log('there was an error retrieving the notes from localStorage')
      console.log(e)
    }
     

    
    // const notesInStorage=JSON.parse(localStorage.getItem('notes'))
  }
}
