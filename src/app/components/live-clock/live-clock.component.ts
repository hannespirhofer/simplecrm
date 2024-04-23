import { Component, Input } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-clock.component.html',
  styleUrl: './live-clock.component.scss'
})
export class LiveClockComponent {
  @Input() timepipe: string = 'shortTime';
  @Input() isLocal: boolean = false;

  time$!: Observable<Date>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.time$ = interval(999).pipe(
      map(() => new Date())
    )
  }
}
