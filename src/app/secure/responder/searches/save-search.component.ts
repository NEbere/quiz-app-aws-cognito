import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';


import { Content, ContentService } from '../../creators/content.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './save-search.component.html',
  styleUrls: ['./save-search.component.css']
})

export class SaveSearchComponent implements OnInit {
  searchTags: any;
  title: any;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.searchTags = params['tags'];
      });

  }

  save(searchTags, title): void {
    this.title = title
    this.searchTags = searchTags
    let content = {
        favoriteName: this.title,
        tags: this.searchTags
    }
    this.contentService.saveSearch(content)
      .then(() => {
          this.goBack()
      });
  }

  goBack(): void {
    this.router.navigate(['securehome/view-favorites']);
  }

}

