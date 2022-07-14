import {animate,group,query,style,transition ,trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bufferToggle, Observable, timer } from 'rxjs';
import {map  } from 'rxjs/operators';
const baseStyles= style({
  // display:'block',
  position:'absolute',
  top:0,
  left:0,
  width:'100%',
  height:'100%'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // using animation by using trigger and inside it using query style animate 
  // animations:[
  //   trigger('routeAnim',[
  //     transition('*=>*',[
  //       ///////////////////////////////////
  //       query(':enter',[
  //         style({
  //           background:'wheat',
  //           display:'block',
  //           height:'100%'
  //         }),
  //         animate(1000,style({
  //           background:'*'
  //         }))
  //       ],{optional:true}),

  //       style({
  //         background:'blue'
  //       }),
  //       animate(1000)
  //     ])
  //   ])
  // ]

  animations:[
    trigger('routeAnim',[

      // using transition  incase of increment like tab:1 to tab:3 & change direction from left to right

      transition(':increment',[
        style({
          position:'relative',
          overflow:"hidden"
        }),
        query(':enter,:leave',[
          baseStyles
        ],{optional:true}),
        // query(':enter',[
        //   style({opacity:0})
        // ],{optional:true}),
        group([
          query(':leave',[
            animate("200ms ease-in",style({
              opacity:0,
              transform:'translateX(-50px)'
            }))
          ],{optional:true}),
          query(':enter',[
            style({
              transform:'translateX(50px)',
              opacity:0
            }),
            animate("250ms 120ms ease-out",style({
              opacity:1,
              transform:'translateX(0)'
            }))
          ],{optional:true})
        ])
      ]),


      //////
      // using transition  incase of decrement like tab:2 to tab:1 & change direction from right to left
      
      transition(':decrement',[
        style({
          position:'relative',
          overflow:"hidden"
        }),
        query(':enter,:leave',[
         baseStyles
        ],{optional:true}),
        group([
          query(':leave',[
            animate("200ms ease-in",style({
              opacity:0,
              transform:'translateX(50px)'
            }))
          ],{optional:true}),
          query(':enter',[
            style({
              transform:'translateX(-50px)',
              opacity:0
            }),
            animate("250ms 120ms ease-out",style({
              opacity:1,
              transform:'translateX(0)'
            }))
          ],{optional:true})
        ])
      ]),


      transition('*=>secondary',[
        style({
          position:'relative',
          // overflow:"hidden"
        }),
        query(':enter,:leave',[
         baseStyles
        ],{optional:true}),
        group([
          query(':leave',[
            animate("200ms ease-in",style({
              opacity:0,
              transform:'scale(0.8)'
            }))
          ],{optional:true}),
          query(':enter',[
            style({
              transform:'scale(1.2)',
              opacity:0
            }),
            animate("250ms 120ms ease-out",style({
              opacity:1,
              transform:'scale(1)'
            }))
          ],{optional:true})
        ])

      ]),
      /////////////////////////////////////////////////////
      transition('secondary=>*',[
        style({
          position:'relative',
          // overflow:"hidden"
        }),
        query(':enter,:leave',[
          baseStyles
        ],{optional:true}),
        group([
          query(':leave',[
            animate("200ms ease-in",style({
              opacity:0,
              transform:'scale(1.25)'
            }))
          ],{optional:true}),
          query(':enter',[
            style({
              transform:'scale(0.8)',
              opacity:0
            }),
            animate("250ms 120ms ease-out",style({
              opacity:1,
              transform:'scale(1)'
            }))
          ],{optional:true})
        ])

      ])/////////////////////////////////////
    ]),
    trigger('bgAnime',[
      transition(':leave',[
        animate(1000,style({
          opacity:0
        }))
      ]),

    ]),
    
    trigger('bgAnime',[
      transition(':leave',[
        animate(1000,style({
          opacity:0
        }))
      ])

    ]),

    trigger('fadeAnim',[
      transition(':enter',[
        style({opacity:0}),
        animate(250,style({
          opacity:1
        }))
      ]),
      transition(':leave',[
        animate(250,style({opacity:0}))
      ])
    ])
    
   
  ]
})
export class AppComponent implements OnInit {
  backgrounds:string[]=['https://images.hdqwalls.com/download/nature-night-space-1920x1080.jpg']
  loadingBGImage?:boolean

  dateTime?:Observable<Date>
  ngOnInit(){
   this.dateTime= timer(0,1000).pipe(map(()=>{
      return new Date()
    }))

  }
  prepareRoute(outlet:RouterOutlet){
   if(outlet.isActivated){
    const tab= outlet.activatedRouteData['tab']
    if(!tab) return'secondary'
    return tab
  }
   return 0;

  }
 async changeBGImage(){
  this.loadingBGImage=true
      const result=  await fetch('https://source.unsplash.com/random/1920x1080',{
      method:'HEAD'
    })
    // if(result.url===this.bg)return this.changeBGImage()
    // this.bg=result.url
    // const alreadyGot=this.backgrounds.includes(result.url)
    // if(alreadyGot){
    //   //this is the same image as we currently ,so re-run the functionto get another image
    //   return this.changeBGImage()
    // }
    this.backgrounds.push(result.url)
  }
  onBGImageload(imgEvent:Event){
    //bg img has loaded , now remove the old bg image from the backgrounds array
    const imgElement=imgEvent.target as HTMLImageElement
    const src=imgElement.src
    this.backgrounds=this.backgrounds.filter(b=>b===src)
    // this.backgrounds=[src]
    this.loadingBGImage=false
  }
}
