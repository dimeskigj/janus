import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Service } from '../../domain/service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { PageTitleComponent } from '../common/page-title/page-title.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 't-create-service-form',
  imports: [
    PageTitleComponent,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './create-service-form.component.html',
  styleUrl: './create-service-form.component.scss',
})
export class CreateServiceFormComponent {
  @Input() isEditing = false;
  @Output() savedChanges = new EventEmitter<Service>();
  @Input() service?: Service;

  isLoadingChanges = false;
  serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(private serviceService: ServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.service);
    if (changes['service'] && this.service) {
      this.serviceForm.controls.name.setValue(this.service?.name ?? '');
      this.serviceForm.controls.description.setValue(
        this.service?.description ?? '',
      );
    }
  }

  onCreateService(): void {
    this.isLoadingChanges = true;
    this.serviceService
      .createService({
        name: this.serviceForm.value.name!,
        description: this.serviceForm.value.description ?? '',
      })
      .subscribe({
        next: (service) => {
          this.savedChanges.next(service);
        },
        error: (error) => {
          console.error(error);
          this.isLoadingChanges = false;
        },
      });
  }

  onSaveEdit(): void {
    this.isLoadingChanges = true;

    this.serviceService
      .updateService({
        ...this.service!,
        name: this.serviceForm.controls.name.value!,
        description: this.serviceForm.controls.description.value ?? '',
      })
      .subscribe({
        next: (service) => {
          this.savedChanges.next(service);
        },
        error: (error) => {
          console.error(error);
          this.isLoadingChanges = false;
        },
      });
  }
}
