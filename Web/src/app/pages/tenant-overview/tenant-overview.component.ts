import { Component } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TenantInformationDto } from '../../domain/dto';
import { AsyncPipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 't-tenant-overview',
  imports: [AsyncPipe, MatRippleModule, MatIconModule, RouterModule],
  templateUrl: './tenant-overview.component.html',
  styleUrl: './tenant-overview.component.scss',
})
export class TenantOverviewComponent {
  tenantInformation$?: Observable<TenantInformationDto>;
  slug = '';

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tenantInformation$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.slug = params.get('slug')!;
        return this.publicService.getTenantInformationBySlug(this.slug);
      }),
    );
  }
}
