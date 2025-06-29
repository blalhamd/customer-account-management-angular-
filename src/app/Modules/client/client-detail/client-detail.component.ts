import { Component, OnInit } from '@angular/core';
import { ClientViewModel } from '../../../shared/models/view-models/client.view-model';
import { ClientService } from '../../../shared/services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css',
})
export class ClientDetailComponent implements OnInit {
  client!: ClientViewModel;
  clientId: string = '';
  errorMessage: string = '';
  constructor(
    private clientService: ClientService,
    private activate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.activate.params.subscribe((params) => {
      this.clientId = params['id'];
      console.log(this.clientId);
    });
    if (this.clientId) {
      this.clientService.getById(this.clientId).subscribe({
        next: (res) => {
          this.client = res;
        },
        error: (err) => (this.errorMessage = err.error?.Message),
      });
    }
  }

  calculateAge(birthDate: Date): number {
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

  maskSSN(ssn: string): string {
    if (!ssn) return '';
    return '•••-••-' + ssn.slice(-4);
  }

  getFinancialSourceName(source: number): string {
    const sources: { [key: number]: string } = {
      0: 'Not Specified',
      1: 'Employment Salary',
      2: 'Investments',
      3: 'Business Income',
      4: 'Inheritance',
      5: 'Government Support',
    };
    return sources[source] || 'Other Source';
  }

  getIncomeSourceIcon(source: number): string {
    const icons: { [key: number]: string } = {
      1: 'fa-building',
      2: 'fa-chart-line',
      3: 'fa-store',
      4: 'fa-gem',
      5: 'fa-landmark',
    };
    return icons[source] || 'fa-money-bill-wave';
  }

  getIncomeProgress(income: number): number {
    // Example progress calculation (adjust as needed)
    if (income < 1000) return 20;
    if (income < 3000) return 40;
    if (income < 6000) return 60;
    if (income < 10000) return 80;
    return 100;
  }
}
