import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';


import { Content, ContentService } from '../content.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: [ './content-detail.component.css' ]
})

export class ContentDetailComponent implements OnInit {
  content: Content;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
      this.route.params
      .switchMap((params: Params) => this.contentService.getContent(params['id']))
      .subscribe(content => this.content = content);
  }

  save(): void {
    console.log(this.content, 'content from save')
    this.contentService.updateContent(this.content)
    .then(() => this.goBack());

      // this.router.navigate(['securehome/view-contents']);
    }

  goBack(): void {
    this.router.navigate(['securehome/view-contents']);
    window.location.reload()
  }

}

