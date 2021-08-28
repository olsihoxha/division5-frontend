import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/_services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isSignedIn = false;


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


  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.checkIfHasToken();
  }

  changeContent(row) {
    for (let r of this.navigationItems) {
      r.isSelected = false;
    }
    row['isSelected'] = true;
    this.router.navigate([row['link']]);
  }


  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isSignedIn = false;
  }



}
