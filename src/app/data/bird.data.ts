import { Bird, BirdDetails } from '../models/bird.models';

export const INITIAL_BIRDS: ReadonlyArray<Bird> = [
  {
    id: 'bird-001',
    name: 'Bald Eagle'
  },
  {
    id: 'bird-002',
    name: 'American Robin'
  },
  {
    id: 'bird-003',
    name: 'Peregrine Falcon'
  },
  {
    id: 'bird-004',
    name: 'Great Horned Owl'
  }
];

export const INITIAL_BIRD_DETAILS: ReadonlyArray<BirdDetails> = [
  {
    birdId: 'bird-001',
    habitat: 'Forests and waterways'
  },
  {
    birdId: 'bird-002',
    habitat: 'Woodlands, parks, and backyards'
  },
  {
    birdId: 'bird-004',
    habitat: 'Forests, deserts, and open country'
  }
];
