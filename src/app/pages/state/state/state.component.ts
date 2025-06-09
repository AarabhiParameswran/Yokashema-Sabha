import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StateService } from 'src/app/core/services/state.service';
import { NewsService } from 'src/app/core/services/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css'
})
export class StateComponent implements OnInit {
  districts: any[] = [];
  upasabhas: any[] = [];
  upasabhaFiles: any[] = [];
  
  // News arrays
  stateNews: any[] = [];
  usualNews: any[] = [];
  jillaNews: any[] = [];
  
  selectedDistrictCode: any = null;
  selectedUpasabhaCode: any = null;
  
  constructor(
    private stateService: StateService,
    private newsService: NewsService
  ) {}
  
  ngOnInit(): void {
    this.getDistrictList();
    this.getStateNews();
    this.getUsualNews();
  }

  getDistrictList() {
    this.showLoader();

    this.stateService.getDistrictsList().subscribe({
      next: (response: any) => {
        console.log('Districts:', response);
        this.districts = response;
        this.hideLoader();
      },
      error: (error) => {
        console.error("Error Fetching District List:", error);
        this.hideLoader();
        this.showError("Failed to fetch districts", error);
      },
    });
  }

  getStateNews() {
    this.newsService.getStateOrUsualNews('state').subscribe({
      next: (response: any) => {
        console.log('State News:', response);
        this.stateNews = response;
      },
      error: (error) => {
        console.error("Error Fetching State News:", error);
        this.showError("Failed to fetch state news", error);
      },
    });
  }

  getUsualNews() {
    this.newsService.getStateOrUsualNews('usual').subscribe({
      next: (response: any) => {
        console.log('Usual News:', response);
        this.usualNews = response;
      },
      error: (error) => {
        console.error("Error Fetching Usual News:", error);
        this.showError("Failed to fetch usual news", error);
      },
    });
  }

  getJillaNews(districtCode: number) {
    this.newsService.getJillaNews('jilla', districtCode).subscribe({
      next: (response: any) => {
        console.log('Jilla News:', response);
        this.jillaNews = response;
      },
      error: (error) => {
        console.error("Error Fetching Jilla News:", error);
        this.showError("Failed to fetch jilla news", error);
      },
    });
  }
  
  onDistrictChange() {
    console.log('Selected district code:', this.selectedDistrictCode);
    
    // Reset dependent dropdowns
    this.upasabhas = [];
    this.upasabhaFiles = [];
    this.jillaNews = [];
    this.selectedUpasabhaCode = null;
    
    if (this.selectedDistrictCode) {
      this.getUpasabhaList(this.selectedDistrictCode);
      this.getJillaNews(this.selectedDistrictCode);
    }
  }
  
  getUpasabhaList(districtCode: number) {
    this.showLoader();
    
    this.stateService.getUpasabhaList(districtCode).subscribe({
      next: (response: any) => {
        console.log('Upasabhas:', response);
        this.upasabhas = response;
        this.hideLoader();
      },
      error: (error) => {
        console.error("Error Fetching Upasabha List:", error);
        this.hideLoader();
        this.showError("Failed to fetch upasabhas", error);
      },
    });
  }
  
  onUpasabhaChange() {
    console.log('Selected upasabha code:', this.selectedUpasabhaCode);
    
    // Reset files
    this.upasabhaFiles = [];
    
    if (this.selectedUpasabhaCode) {
      this.getUpasabhaFiles(this.selectedUpasabhaCode);
    }
  }
  
  getUpasabhaFiles(upasabhaCode: number) {
    this.showLoader();
    
    this.stateService.getUpasabhaFilesList(upasabhaCode).subscribe({
      next: (response: any) => {
        console.log('Upasabha Files:', response);
        this.upasabhaFiles = response;
        this.hideLoader();
      },
      error: (error) => {
        console.error("Error Fetching Upasabha Files:", error);
        this.hideLoader();
        this.showError("Failed to fetch upasabha files", error);
      },
    });
  }
  
  private showLoader() {
    const loader = document.getElementById("elmLoader");
    if (loader) {
      loader.classList.remove("d-none");
      loader.classList.add("d-flex");
    }
  }
  
  private hideLoader() {
    const loader = document.getElementById("elmLoader");
    if (loader) {
      loader.classList.add("d-none");
      loader.classList.remove("d-flex");
    }
  }
  
  private showError(title: string, error: any) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: error?.error?.detail || title,
    });
  }
  
  downloadFile(file: any) {
    const downloadUrl = file.download_url || file.file_url;
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      console.error('No download URL available for file:', file);
    }
  }
  
  viewFile(file: any) {
    const viewUrl = file.view_url;
    if (viewUrl) {
      window.open(viewUrl, '_blank');
    } else {
      console.error('No view URL available for file:', file);
    }
  }
}