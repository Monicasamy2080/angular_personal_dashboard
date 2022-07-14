import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {
  bookmark?:Bookmark

  constructor(private bookmarkService:BookmarkService ,
    private route:ActivatedRoute,
    private router:Router,
    private notificationService:NotificationService,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      const bookmarkId=paramMap.get('id')
      this.bookmark=this.bookmarkService.getBookmark(bookmarkId)
    })
  }
  onFormSubmit(form:NgForm){
    // if(form.invalid)return
    const{name,url}=form.value
    this.bookmarkService.updateBookmark(this.bookmark?.id,{
      name,
      url:new URL(url)
    })
    // this.router.navigateByUrl('/manage')
    // this.notificationService.show('bookmark update!',1000)//no of duration
    this.notificationService.show('bookmark update!')

  }
  delete(){
    this.bookmarkService.deleteBookmark(this.bookmark?.id)
    this.router.navigate(["../"],{relativeTo:this.route})
    this.notificationService.show('Deleted bookmark !')


  }

}
