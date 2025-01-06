import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../domain/service';
import { CreateServiceFormComponent } from "../../components/create-service-form/create-service-form.component";

@Component({
    selector: 't-new-service',
    imports: [CreateServiceFormComponent],
    templateUrl: './new-service.component.html',
    styleUrl: './new-service.component.scss'
})
export class NewServiceComponent {
  constructor(private router: Router) { }

  onServiceCreated(service: Service): void {
    this.router.navigate(['admin/services', service.id]);
  }
}
