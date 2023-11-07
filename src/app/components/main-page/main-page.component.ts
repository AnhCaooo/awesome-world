import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  countries: any[] = [];
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

  private validateSearchForm() {
    this.option?.valueChanges.subscribe((value) => {
      if (!value || value === 'none') {
        this.value?.disable();
      } else {
        this.value?.enable();
      }
    });
  }

  public fetchCountries() {
    this.loadingData = true;
    const fetchCountriesSubscription$ = this.countryService.getCountries().subscribe({
      next: (response: any) => {
        this.countries = response;
        this.loadingData = false;
      }, 
      error: error => {
        console.error('Error while fetching countries:', error);
        this.loadingData = false;
        this.countries = [];
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
          this.countries = response;
          this.loadingData = false;
        }, 
        error: error => {
          console.error('Error while fetching country:', error)
          this.loadingData = false;
          this.countries = [];
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

  public clearAndFetchAllCountries() {
    this.searchCountryForm.reset();
    this.fetchCountries();
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
