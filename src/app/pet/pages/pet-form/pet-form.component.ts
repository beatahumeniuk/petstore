import {Component, OnDestroy, OnInit} from '@angular/core';
import {PetApiService} from "../../service/pet-api.service";
import {PetStatus} from "../../model/pet-status";
import {BehaviorSubject, Subject} from "rxjs";
import {Pet} from "../../model/pet";
import {takeUntil} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'petstore-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  availablePets: Pet[];
  dataSource = new BehaviorSubject<any>(null);
  submitted = new BehaviorSubject<any>(false);

  constructor(
    private petApiService: PetApiService,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.initValues();
  }

  private initValues() {
    this.petApiService.getAvailablePets(PetStatus.AVAILABLE.valueOf())
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.availablePets = data;
        this.dataSource.next(data);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  saveNewPet(pet: Pet) {

    this.submitted.next(true);
    this.petApiService.savePet(pet).pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.availablePets.push(data);
        this.dataSource.next(this.availablePets);
        this.submitted.next(false);
        this.initValues();
        this.showSnackbar("Zapisano pomyślnie!");
      }, () => {
        this.showSnackbar("Zapis nie powiódł się!");
        this.submitted.next(false);
      });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, null, {
      duration: 12000
    })
  }

  refresh() {
    this.initValues();
  }
}
