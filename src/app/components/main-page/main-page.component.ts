import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RestCountriesService } from 'src/app/services/rest-countries.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit, OnDestroy {
  private subscription$ = new Subscription
  public readonly fullNameOption = 'Full Name';
  public readonly partialNameOption = 'Partial Name';
  public readonly supportedFilteredOptions = [this.fullNameOption, this.partialNameOption]

  paginatedCountriesData: any[] = [];
  plainCountriesData: any[] = [];
  totalCountries: number = 0;
  initialPageSize: number = 25;
  loadingData = false;
  searchCountryForm = this.fb.group({
    option: ['', Validators.required],
    value: [{ value: '', disabled: true }] // maybe consider to have a validator here.
  })

  get option() {
    return this.searchCountryForm.get('option');
  }

  get value() {
    return this.searchCountryForm.get('value');
  }

  constructor (
    private countryService: RestCountriesService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.fetchCountries();
    this.validateSearchForm();
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  private getPaginatedPage(startIndex?: number, endIndex?: number) {
    if (!startIndex) {
      startIndex = 0;
    } 
    if (!endIndex) {
      endIndex = this.initialPageSize;
    }
    this.paginatedCountriesData = this.plainCountriesData.slice(startIndex, endIndex);
  }

  public onPageChange(event: PageEvent) {
    // Update the table data based on the current page
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.getPaginatedPage(startIndex, endIndex);
  }

  private validateSearchForm() {
    this.option?.valueChanges.subscribe((value) => {
      if (!value || value === 'none') {
        this.value?.disable();
        this.value?.reset();
      } else {
        this.value?.enable();
      }
    });
  }

  private getAmountOfCountries(data: any[]): number {
    return data.length; 
  }

  public fetchCountries() {
    this.loadingData = true;
    const fetchCountriesSubscription$ = this.countryService.getCountries().subscribe({
      next: (response: any) => {
        this.loadingData = false;
        this.plainCountriesData = response;
        this.totalCountries = this.getAmountOfCountries(this.plainCountriesData);
        this.getPaginatedPage();
      }, 
      error: error => {
        console.error('Error while fetching countries:', error);
        this.loadingData = false;
        this.plainCountriesData = [];
        this.totalCountries = this.getAmountOfCountries(this.plainCountriesData);
        this.getPaginatedPage();
      }
    })
    this.subscription$.add(fetchCountriesSubscription$);
  }

  public findCountry() {
    this.loadingData = true;
    let isFullName = false;
    if (this.option && this.value) {
      if (this.option.value === this.fullNameOption) {
        isFullName = true;
      }
      const fetchCountrySubscription$ = this.countryService.getCountries(this.value.value, isFullName).subscribe({
        next: (response: any) => {
          this.plainCountriesData = response;
          this.loadingData = false;
          this.totalCountries = this.getAmountOfCountries(this.plainCountriesData);
          this.getPaginatedPage();
        }, 
        error: error => {
          console.error('Error while fetching country:', error)
          this.loadingData = false;
          this.plainCountriesData = [];
          this.totalCountries = this.getAmountOfCountries(this.plainCountriesData);
          this.getPaginatedPage();
        }
      })
      this.subscription$.add(fetchCountrySubscription$);
    }
  }

  /**
   * 
   * @returns true means disable button. False means enable
   */
  public verifyFindCountryButton(): boolean {
    if (this.value?.value && this.option?.value !== 'none') {
      return false;
    }
    return true;
  }

  public verifyClearSearchFormButton(): boolean {
    if (this.option?.value && this.option?.value !== 'none') {
      return false;
    }
    return true;
  }

  public clearAndFetchAllCountries() {
    this.searchCountryForm.reset();
    this.fetchCountries();
  }

  public clearSearchingValue() {
    this.value?.reset();
  }

  public parseLanguagesObjectToString(objectValue: any): string {
    const returnValuesInSetType = new Set<string>([]);
    if (this.isObject(objectValue)) {
      for (const key in objectValue) {
        returnValuesInSetType.add(objectValue[key]);
      }
    }
    return this.convertSetToString(returnValuesInSetType);
  }

  public parseCurrenciesObjectToString(objectValue: any): string {
    const returnValuesInSetType = new Set<string>([]);
    if (this.isObject(objectValue)) {
      for (const key in objectValue) {
        returnValuesInSetType.add(`${objectValue[key].name} (${objectValue[key].symbol})`);
      }
    }
    return this.convertSetToString(returnValuesInSetType);
  }

  private isObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  private convertSetToString(setList: Set<string>): string {
    return Array.from(new Set(setList)).join(", ");
  }
  public formatPopulation(populationValue: any): string {
    return String(populationValue).replace(/(.)(?=(\d{3})+$)/g,'$1.');
  }

}
