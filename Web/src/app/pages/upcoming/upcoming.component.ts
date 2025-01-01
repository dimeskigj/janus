import { Component } from '@angular/core';
import { PageTitleComponent } from "../../components/common/page-title/page-title.component";

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent {

}
