import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';


import { Content, ContentService } from '../../creators/content.service';

@Component({
  selector: 'search-listing',
  templateUrl: './search-listings.component.html',
  styleUrls: ['./save-search.component.css']
})

export class SearchListComponent implements OnInit {
  searchTags: any;
  title: any;
  searchListings: any;
  loading: boolean;
  selectedContent: any;

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
      let tags = this.searchTags.split(",")
      this.viewResults(tags)
  }

  viewResults(searchTags: any): void{
    this.loading = true
      this.contentService.searchContent(searchTags)
      .then(response => {
        this.searchListings = response
        this.loading = false
      })
      .catch(error => {
        console.log(error, 'Error getting search results')
        return error
      })
  }

  viewContent(content: any): void {
    this.selectedContent = content;
    this.router.navigate(['securehome/content-detail', this.selectedContent.id]);
  }

  goBack(): void {
    this.router.navigate(['securehome/view-favorites']);
  }

}

