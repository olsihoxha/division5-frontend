import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  navigationItems = [
    {
      title: 'Edit Profile',
      icon: 'person',
      link: '/profile',
      isSelected: false
    },
    {
      title: 'Products',
      icon: 'inventory_2',
      link: '/',
      isSelected: false
    }
  ];


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  changeContent(row) {
    for (let r of this.navigationItems) {
      r.isSelected = false;
    }
    row['isSelected'] = true;
    this.router.navigateByUrl(row['link']);
  }


}
