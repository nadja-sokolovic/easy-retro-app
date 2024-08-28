import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  mobileWidth: boolean;
  navItems = [
    {'name' : 'Pregled akcija', 'action': 'actions'},
    {'name' : 'Najbolje u sprintu', 'action': 'stories-competition'},
    {'name' : 'Izvještaji', 'action': 'reports'}
  ];

  constructor(private router: Router) {
    this.mobileWidth = window.innerWidth < 600;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobileWidth = window.innerWidth < 600;
  }

  ngOnInit(): void {}
}
