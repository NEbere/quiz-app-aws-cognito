import { Component, OnInit } from '@angular/core';
import { Content, ContentService } from '../../creators/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searches',
  templateUrl: './view-favorites.component.html',
  styleUrls: ['./view-favorites.component.css']
})
export class ViewFavoritesComponent implements OnInit {
  favorites: any
  searchListings: any
  searchTags: any
  loading: boolean

  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites(): void{
    this.loading = true
    this.contentService
    .getFavorites()
    .then(response => {
      this.favorites = response.items
      this.loading = false
    })
    .catch(error => {
      console.log(error, 'Error getting favorites')
      return error
    })
  }

  viewResults(favorite: any): void{
    const tags = favorite.tags.split(",")
      this.contentService.searchContent(tags)
      .then(response => {
        this.searchListings = response
      })
      .catch(error => {
        console.log(error, 'Error getting search results')
        return error
      })
  }

  gotoSearchListings(content: any): void {
    this.searchTags = content;
    this.router.navigate(['securehome/search-listings', this.searchTags]);
  }

  createFavorite(): void {
    this.router.navigate(['securehome/search']);
  }

}
