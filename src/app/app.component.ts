import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewPlaceComponent } from './pages/new-place/new-place.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NewPlaceComponent]
})
export class AppComponent {
  title = 'Places';
}
