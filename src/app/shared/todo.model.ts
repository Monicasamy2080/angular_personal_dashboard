import {v4 as uuidv4}from'uuid'

export class Todo{
    id?:string|null|undefined
    // text?:string|any
    completed?:boolean|any
    constructor( public text:string|any){
        this.id=uuidv4()
        // this.text=text
    }
}