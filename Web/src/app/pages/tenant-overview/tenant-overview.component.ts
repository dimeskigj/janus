import { Component } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TenantInformationDto } from '../../domain/dto';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 't-tenant-overview',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './tenant-overview.component.html',
  styleUrl: './tenant-overview.component.scss'
})
export class TenantOverviewComponent {
  tenantInformation$?: Observable<TenantInformationDto>;

  constructor(private publicService: PublicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tenantInformation$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('slug')!;
        return this.publicService.getTenantInformationBySlug(id);
      })
    );
  }
}
