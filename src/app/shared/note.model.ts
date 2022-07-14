import { v4 as uuidv4 } from 'uuid';
export class Note{
    id?:string|any
    // title?:string
    // content?:string
    constructor(public title:string|any, public content:string|any){
        this.id=uuidv4();
        // this.title=title;
        // this.content=content
    }
}