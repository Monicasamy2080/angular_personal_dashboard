import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService  {
  bookmarks:Bookmark[]=[
    new Bookmark('wikipedia','http://wikipedia.org'),
    new Bookmark('YouTube','http://youtube.com'),
    new Bookmark('Google','http://google.com'),
  ]
  localItem:string|any

  constructor() { 
    this.loadState()
  }
  getBookmarks(){
    return this.bookmarks
  }
  getBookmark(id:string|any){
    return this.bookmarks.find(b=>b.id===id)
  }
  addBookmark(bookmark:Bookmark){
    this.bookmarks.push(bookmark)
    this.saveState()
  }
  updateBookmark(id:string,updatedFields:Partial<Bookmark>){
    const bookmark:any=this.getBookmark(id)
    Object.assign(bookmark, updatedFields)
    this.saveState()
  }
  deleteBookmark(id:string|any){
    const bookmarkIndex=this.bookmarks.findIndex(b=>b.id===id)
    if(bookmarkIndex==-1) return
    this.bookmarks.splice(bookmarkIndex,1)
    this.saveState()
  }
  saveState(){
    localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks))
  }
  loadState(){
    try{
      this.localItem = localStorage.getItem("bookmarks");
      const bookmarksInStorage = JSON.parse(this.localItem,(key,value)=>{
        if(key=='url') return new URL(value)//used to return  correct image of bookmarks //solve issue of image of bookmarks
        return value
      });
      if(!bookmarksInStorage) return
      this.bookmarks.length=0//clear the notes array (while keeping the reference)
      this.bookmarks.push(...bookmarksInStorage)
    }catch(e){
      console.log('there was an error retrieving the bookmarks from localStorage')
      console.log(e)
    }  
  }  
}
