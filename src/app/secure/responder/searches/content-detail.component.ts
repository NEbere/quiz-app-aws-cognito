import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';


import { Content, ContentService } from '../../creators/content.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './content-detail.component.html',
})

export class ResponderContentDetailComponent implements OnInit {
  content: any;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.contentService.getContent(params['id']))
      .subscribe(content => {
        this.content = content
      });
  }
  saveResponse(response): void{
      if(response) {
          var responseData = {
            docId: this.content.id,
            response: response
          }
          this.contentService.saveResponse(responseData)
          .then(() => this.router.navigate(['securehome/view-favorites']));
      } else {
          window.alert('enter response to save')
      }
  }

}

