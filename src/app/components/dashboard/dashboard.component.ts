import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

const MODULES = [
  ReactiveFormsModule,
  CommonModule
];

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [MODULES],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  personForm!: FormGroup;
  people: any[] = [];
  editIndex: number | null = null;

  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      career: ['', Validators.required]
    });

    this.loadPeople();
  }

  addPerson() {
    if (this.personForm.invalid) {
      return;
    }

    const person = this.personForm.value;

    if (this.editIndex !== null) {
      this.people[this.editIndex] = person;
      this.editIndex = null;
    } else {
      this.people.push(person);
    }

    this.savePeople();
    this.personForm.reset();
  }

  editPerson(index: number) {
    const person = this.people[index];
    this.personForm.patchValue(person);
    this.editIndex = index;
  }

  deletePerson(index: number) {
    this.people.splice(index, 1);
    this.savePeople();
  }

  savePeople() {
    localStorage.setItem('people', JSON.stringify(this.people));
  }

  loadPeople() {
    const savedPeople = localStorage.getItem('people');
    if (savedPeople) {
      this.people = JSON.parse(savedPeople);
    }
  }
}