import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestCountriesService } from 'src/app/services/rest-countries.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit, OnDestroy {
  countries: any[] = [];
  loadingData = false;
  private subscription$ = new Subscription

  constructor (
    private countryService: RestCountriesService,
  ) {

  }

  ngOnInit(): void {
    this.fetchCountries();
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  private fetchCountries() {
    this.loadingData = true;
    const fetchCountriesSubscription$ = this.countryService.getCountries().subscribe({
      next: (response: any) => {
        this.countries = response
      }, 
      error: error => {
        console.error('Error while fetching countries:', error)
      }, 
      complete: () => {
        this.loadingData = false;
      }
    })
    this.subscription$.add(fetchCountriesSubscription$);
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
}
