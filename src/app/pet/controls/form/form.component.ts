import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Category, Pet} from "../../model/pet";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PetStatus} from "../../model/pet-status";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'petstore-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  private unsubscribe = new Subject();
  pet: Pet = new Pet();
  @Output()
  savePet = new EventEmitter<any>();
  @ViewChild('tagName') inputName;
  tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur: true;
  formGroup: FormGroup;
  @Input()
  blockedForm: any = false;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      name: ['', Validators.required],
      category: [''],
      tags: ['']
    });
  }

  ngOnInit(): void {
  }


  remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(event.value);
    }
    this.inputName.nativeElement.value = '';
  }

  addNewPet(value: any) {
    if (this.formGroup.valid) {
      this.pet.name = value.name;
      this.pet.category = new Category();
      this.pet.category.name = value.category;
      this.pet.status = PetStatus.AVAILABLE;
      this.pet.tags = [];
      this.tags.forEach(tag => this.pet.tags.push({id: null, name: tag}))
      this.savePet.emit(this.pet);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.blockedForm
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.submitted = data;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
