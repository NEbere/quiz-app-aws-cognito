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
  
  ngOnInit(): void {
    this.getContents();
  }
  getContents(): void{
    this.contentService
    .getContents()
    .then(response => this.contents = response.items)
  }


  // ngOnInit(): void {
  //   this.getContents();
  // }

  gotoDetail(content: Content): void {
    this.selectedContent = content;
    this.router.navigate(['securehome/detail', this.selectedContent.id]);
  }

}

