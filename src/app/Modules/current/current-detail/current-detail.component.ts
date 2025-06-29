import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../../shared/services/current.service';
import { CurrentViewModel } from '../../../shared/models/view-models/current-view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-detail',
  templateUrl: './current-detail.component.html',
  styleUrl: './current-detail.component.css',
})
export class CurrentDetailComponent implements OnInit {
  account!: CurrentViewModel | null;
  errorMessage: string = '';
  currentId: string = '';
  constructor(
    private currentService: CurrentService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.extractId();
    this.loadCurrnt();
  }

  extractId() {
    this.activateRoute.params.subscribe((params) => {
      this.currentId = params['id'];
    });
  }

  loadCurrnt() {
    if (this.currentId) {
      this.currentService.getById(this.currentId).subscribe({
        next: (res) => (this.account = res),
        error: (err) => (this.errorMessage = err.error?.Message),
      });
    }
  }
}
