export interface Bird {
  readonly id: string;
  readonly name: string;
}

export interface BirdDetails {
  readonly birdId: string;
  readonly habitat: string;
}

export interface CombinedBird extends Bird {
  readonly details: BirdDetails | null;
}
