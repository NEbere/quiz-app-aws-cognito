import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';   
import {Content,  ContentService} from '../content.service' 

@Component({
  selector: 'app-view-contents',
  templateUrl: './view-contents.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentsComponent implements OnInit {
  contents: Content;
  selectedContent: any;

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

  gotoDetail(content: any): void {
    this.selectedContent = content;
    this.router.navigate(['securehome/detail', this.selectedContent.id]);
  }

  goToCreatePage(): void {
    this.router.navigate(['securehome/create-content']);
    window.location.reload()
  }
}

