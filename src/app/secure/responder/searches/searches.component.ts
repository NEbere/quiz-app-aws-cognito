import { Component, OnInit } from '@angular/core';
import { Content, ContentService } from '../../creators/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit {
  searchTags: any;
  searchResults:any;
  favorites: any

  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchContents(searchTags: any): void {
    let tagsArray = searchTags.split(",")
    this.contentService.searchContent(tagsArray)
    .then(response => {
      this.searchResults = response
    })
  }

  saveSearch(searchTags: any): void {
    this.searchTags = searchTags
    this.router.navigate(['securehome/save-search', this.searchTags]);
  }

  getFavorites(): void{
    this.contentService
    .getFavorites()
    .then(response => {
      this.favorites = response.items
    })
  }

  gotoDetail(content: any): void {
    this.searchTags = content;
    this.router.navigate(['securehome/save-search', this.searchTags]);
  }

}
