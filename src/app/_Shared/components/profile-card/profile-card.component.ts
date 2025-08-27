import { Component, Input, signal, Signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})

export class ProfileCardComponent {
  @Input() receivedColor : Signal<string> = signal('');
  @Input() iconClass : Signal<string> = signal('');
  @Input() dataLabels : Signal<string> = signal('');
  @Input() data : Signal<string> = signal('');
}