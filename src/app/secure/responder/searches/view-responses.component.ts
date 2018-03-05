import { Component, OnInit } from '@angular/core';
import { Content, ContentService } from '../../creators/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searches',
  templateUrl: './view-responses.component.html',
})
export class ViewResponsesComponent implements OnInit {
  responses: any
  loading: boolean

  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getResponses();
  }

  getResponses(): void{
    this.loading = true
    this.contentService
    .getResponses()
    .then(response => {
      this.responses = response.items
      this.loading = false
    })
    .catch(error => {
      console.log(error, 'Error getting favorites')
      return error
    })
  }


}
