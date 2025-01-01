import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Service } from '../../domain/service';
import { ServiceService } from '../../services/service.service';
import { AsyncPipe } from '@angular/common';
import { CreateServiceFormComponent } from "../../components/create-service-form/create-service-form.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [AsyncPipe, CreateServiceFormComponent, MatProgressSpinnerModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.scss'
})
export class EditServiceComponent {
  editingService$?: Observable<Service>;

  constructor(private route: ActivatedRoute, private router: Router, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.editingService$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.serviceService.getServiceById(id);
      })
    );
  }

  onSavedChanges(service: Service) {
    this.router.navigate(['/admin/services', service.id]);
  }
}
