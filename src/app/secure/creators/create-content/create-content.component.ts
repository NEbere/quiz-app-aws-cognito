import { Component, OnInit } from '@angular/core';
import { Content, ContentService } from '../content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {
  content = new Content('', '', [], [])
  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  addContent(content: any): void {
    let tagsArray = content.tags.split(",")
    let responsesArray = content.responses.split(",")
    content.tags = tagsArray
    content.response = responsesArray
    this.contentService.createContent(content)
      .then(() => this.goBack());
  }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate(['securehome/view-contents']);
  }
}
