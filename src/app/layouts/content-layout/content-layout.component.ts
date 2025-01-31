import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  template: `
    <router-outlet />
  `,
  styles: ``,
  imports: [RouterOutlet]
})
export class ContentLayout {

}
