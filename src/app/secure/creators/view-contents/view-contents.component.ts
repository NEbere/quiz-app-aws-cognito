import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Content,  ContentService} from '../content.service' 

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-contents.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentsComponent implements OnInit {
  contents: Content;
  selectedContent: Content;

  constructor( 
    private contentService: ContentService,
    private router: Router
  ) { }

  getQuestions(): void{
    this.contentService
    .getContents()
    .then(response => {
      console.log(response, 'response from view questions component')
      this.contents = response.items
    })
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  onSelect(content: Content): void {
    this.selectedContent = content;
  }

  gotoDetail(): void {
    this.router.navigate(['securehome/detail', this.selectedContent.id]);
  }

}

