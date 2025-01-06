import { Component, Input } from '@angular/core';
import { Service } from '../../domain/service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 't-services-list',
  imports: [MatIconModule, MatTooltip, MatRippleModule, RouterModule],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
})
export class ServicesListComponent {
  @Input() services?: Service[];
}
