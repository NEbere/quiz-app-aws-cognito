import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';


import { Content, ContentService } from '../content.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: [ './content-detail.component.css' ]
})
export class ContentDetailComponent implements OnInit {
  content: any;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
      console.log(this.route.params, 'this.route.params')
    this.route.params
      .switchMap((params: Params) => this.contentService.getContent(params['id']))
      .subscribe(content => this.content = content);
  }

  save(): void {
    this.contentService.updateContent(this.content)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

