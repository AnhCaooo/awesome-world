import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesService {
  private readonly restCountriesCoresUrl = 'https://restcountries.com';
  private readonly urlVersion = 'v3.1';
  private readonly findAll = 'all';
  private readonly findByName = 'name';
  private readonly findFullTextOption = 'fullText'
  private readonly findByCode = 'alpha';
  private readonly findByCurrency = 'currency';
  private readonly findByLanguage = 'lang';
  private readonly findByCapital = 'capital';
  private readonly findByRegion = 'region';
  private readonly findBySubregion = 'subregion';
  private readonly findByTranslation = 'translation';
  private readonly filter = '';

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * 
   * @param name - string. Name of country
   * @param isFullName - boolean. Search by full name of that country or not.
   * @returns finding country based on given parameters. If no parameters are given, search for all
   */
  getCountries(name?: string | null, isFullName?: boolean): Observable<any> {
    let url = `${this.restCountriesCoresUrl}/${this.urlVersion}/`
    if (name) {
      url += `${this.findByName}/${name}`;

      if (isFullName) {
        url += `?${this.findFullTextOption}=${isFullName}`;
      }
    } else {
      url += this.findAll;
    }
  
    return this.http.get<any>(url);
  }
}
