import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-register',
    templateUrl: './register.html',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterPage{}