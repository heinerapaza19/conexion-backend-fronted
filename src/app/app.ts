import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Muy importante
  imports: [RouterModule, RouterOutlet], // ✅ RouterOutlet incluido
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ plural
})
export class App {
  protected readonly title = signal('clinica');
}
