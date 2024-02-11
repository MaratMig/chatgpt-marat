import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrl: './input-panel.component.scss',
})
export class InputPanelComponent implements OnInit {
  @Output() public emmitForm = new EventEmitter<string>();
  textForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.textForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  submitText() {
    const message = this.textForm.value.text.trim();
    if (message !== '') {
      this.emmitForm.emit(message);
    }

    this.textForm.reset();
  }

}
