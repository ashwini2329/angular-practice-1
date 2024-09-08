import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public allowLinks:boolean = false;
  constructor(private useService: UserService) {}

  ngOnInit(): void {
      this.allowLinks = this.useService.getAllowLinks();
  }
}
