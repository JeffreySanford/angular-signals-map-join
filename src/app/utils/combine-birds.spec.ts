import { describe, expect, it } from 'vitest';
import { Bird, BirdDetails } from '../models/bird.models';
import { combineBirds } from './combine-birds';

describe('combineBirds', () => {
  const birds: ReadonlyArray<Bird> = [
    { id: 'bird-001', name: 'Bald Eagle' },
    { id: 'bird-002', name: 'Peregrine Falcon' }
  ];

  it('joins details by bird ID', () => {
    const details: ReadonlyArray<BirdDetails> = [
      { birdId: 'bird-001', habitat: 'Forests and waterways' }
    ];

    expect(combineBirds(birds, details)).toEqual([
      {
        id: 'bird-001',
        name: 'Bald Eagle',
        details: {
          birdId: 'bird-001',
          habitat: 'Forests and waterways'
        }
      },
      {
        id: 'bird-002',
        name: 'Peregrine Falcon',
        details: null
      }
    ]);
  });

  it('returns an empty result for an empty bird collection', () => {
    expect(combineBirds([], [])).toEqual([]);
  });

  it('uses the last detail record when IDs are duplicated', () => {
    const details: ReadonlyArray<BirdDetails> = [
      { birdId: 'bird-001', habitat: 'First habitat' },
      { birdId: 'bird-001', habitat: 'Updated habitat' }
    ];

    expect(combineBirds(birds, details)[0].details?.habitat).toBe(
      'Updated habitat'
    );
  });

  it('does not mutate the source arrays or objects', () => {
    const details: ReadonlyArray<BirdDetails> = [
      { birdId: 'bird-001', habitat: 'Forests and waterways' }
    ];
    const originalBirds = structuredClone(birds);
    const originalDetails = structuredClone(details);

    combineBirds(birds, details);

    expect(birds).toEqual(originalBirds);
    expect(details).toEqual(originalDetails);
  });
});
