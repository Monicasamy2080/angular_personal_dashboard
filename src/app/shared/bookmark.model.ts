import { v4 as uuidv4 } from 'uuid';
export class Bookmark{
    id?:string|any
    name?:string|any|undefined
    url?:URL|any

    constructor( name:string|any,  url:string|any){
        this.id=uuidv4();
        this.url=new URL(url);
        if(!name) name=this.url.hostname
        this.name=name
    }
}