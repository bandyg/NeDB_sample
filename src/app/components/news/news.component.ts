import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public title: String = 'I\'m the news title';
  public news: String[] = [
    'I\'m the first news',
    'Second news here',
    'Third news here'
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
