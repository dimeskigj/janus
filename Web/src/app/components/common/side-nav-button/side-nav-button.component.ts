import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 't-side-nav-button',
  imports: [MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './side-nav-button.component.html',
  styleUrl: './side-nav-button.component.scss',
})
export class SideNavButtonComponent {
  readonly link = input('');
  readonly icon = input('');
  readonly text = input('');
  readonly disabled = input(false);
}
