import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import {
  INITIAL_BIRDS,
  INITIAL_BIRD_DETAILS
} from './data/bird.data';
import {
  Bird,
  BirdDetails,
  CombinedBird
} from './models/bird.models';
import { combineBirds } from './utils/combine-birds';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly birds = signal<ReadonlyArray<Bird>>(INITIAL_BIRDS);
  readonly birdDetails = signal<ReadonlyArray<BirdDetails>>(
    INITIAL_BIRD_DETAILS
  );

  /**
   * TypeScript readonly prevents replacing the signal property.
   * computed() prevents callers from setting the derived value directly.
   * ReadonlyArray prevents consumers from mutating the returned array.
   */
  readonly combinedBirds = computed<ReadonlyArray<CombinedBird>>(() =>
    combineBirds(this.birds(), this.birdDetails())
  );

  readonly matchedCount = computed(
    () => this.combinedBirds().filter(bird => bird.details !== null).length
  );

  addFalconDetails(): void {
    const birdId = 'bird-003';

    if (this.birdDetails().some(detail => detail.birdId === birdId)) {
      return;
    }

    this.birdDetails.update(currentDetails => [
      ...currentDetails,
      {
        birdId,
        habitat: 'Cliffs, mountains, and urban structures'
      }
    ]);
  }

  addSnowyOwl(): void {
    const birdId = 'bird-005';

    if (this.birds().some(bird => bird.id === birdId)) {
      return;
    }

    this.birds.update(currentBirds => [
      ...currentBirds,
      {
        id: birdId,
        name: 'Snowy Owl'
      }
    ]);
  }

  removeDetails(birdId: string): void {
    this.birdDetails.update(currentDetails =>
      currentDetails.filter(detail => detail.birdId !== birdId)
    );
  }

  reset(): void {
    this.birds.set(INITIAL_BIRDS);
    this.birdDetails.set(INITIAL_BIRD_DETAILS);
  }
}
