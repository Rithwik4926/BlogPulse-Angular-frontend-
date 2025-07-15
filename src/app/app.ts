import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from "./MyComponents/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'codepulse';
}
