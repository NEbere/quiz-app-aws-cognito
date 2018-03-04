import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';


import { Content, ContentService } from '../../creators/content.service';

@Component({
  selector: 'edit-detail',
  templateUrl: './edit-search.component.html',
  styleUrls: ['./edit-search.component.css']
})

export class EditSearchComponent implements OnInit {
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
      .subscribe(content => this.content = content);
  }

  save(): void {
    let tagsArray = this.content.tags.replace(/\s+/g, '').split(",")
    let responsesArray
    if(this.content.responses){
      responsesArray = this.content.responses.split(",")
      this.content.response = responsesArray
    }

    this.content.tags = tagsArray
    this.contentService.updateContent(this.content)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['securehome/view-contents']);
  }

}

