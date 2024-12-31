import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { BottomNavButtonComponent } from '../common/bottom-nav-button/bottom-nav-button.component';

@Component({
  selector: 't-bottom-nav-bar',
  standalone: true,
  imports: [MatToolbar, BottomNavButtonComponent],
  templateUrl: './bottom-nav-bar.component.html',
  styleUrl: './bottom-nav-bar.component.scss'
})
export class BottomNavBarComponent { }
