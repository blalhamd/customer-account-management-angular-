import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../shared/services/client.service';
import { ClientViewModel } from '../../../shared/models/view-models/client.view-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ClientQuery } from '../../../shared/models/dtos/client-query';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent implements OnInit {
  clients: ClientViewModel[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  // Search form
  searchForm: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
  }

  ngOnInit(): void {
    this.loadClients();

    // Watch for form changes with debounce
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1; // Reset to first page when filters change
        this.loadClients();
      });
  }

  loadClients(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const query: ClientQuery = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      searchBy: this.searchForm.value.searchTerm,
    };

    this.clientService.getAll(query).subscribe({
      next: (res) => {
        this.clients = res.items;
        this.totalPages = res.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err.error?.Message ||
          'Failed to load clients. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadClients();
  }

  getAge(birthDate: Date): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }

  trackByClientId(index: number, client: ClientViewModel): string {
    return client.id;
  }

  resetFilters(): void {
    this.searchForm.reset();
    this.currentPage = 1;
  }
}
