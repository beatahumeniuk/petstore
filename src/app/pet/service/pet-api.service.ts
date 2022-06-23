import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pet} from "../model/pet";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetApiService {
  baseEndpoint = environment.apiUrl + 'pet';

  constructor(private http: HttpClient) {
  }

  savePet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.baseEndpoint, pet);
  }

  getAvailablePets(status: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseEndpoint + '/findByStatus', {params: new HttpParams().set("status", status)});
  }
}
