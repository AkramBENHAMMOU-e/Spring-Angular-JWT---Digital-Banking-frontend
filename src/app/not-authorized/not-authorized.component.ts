import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css'
})
export class NotAuthorizedComponent implements OnInit {
  constructor(private router : Router){}
  ngOnInit(): void {
    this.router.navigateByUrl("/admin/notAuthorized");
  }

}
