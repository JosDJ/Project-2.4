import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../interfaces/country';

@Pipe({
  name: 'countriesEqual'
})
export class CountriesEqualPipe implements PipeTransform {

  transform(country1: Country, country2: Country): boolean {
    return country1.id == country2.id;
  }

}
