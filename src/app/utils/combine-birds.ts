import {
  Bird,
  BirdDetails,
  CombinedBird
} from '../models/bird.models';

/**
 * Performs a left join from birds to details.
 *
 * Time complexity: O(n + m)
 * Additional space: O(m)
 *
 * When duplicate detail records share a birdId, the last record wins.
 */
export function combineBirds(
  birds: ReadonlyArray<Bird>,
  details: ReadonlyArray<BirdDetails>
): ReadonlyArray<CombinedBird> {
  const detailsByBirdId = new Map<string, BirdDetails>(
    details.map(detail => [detail.birdId, detail])
  );

  return birds.map(bird => ({
    ...bird,
    details: detailsByBirdId.get(bird.id) ?? null
  }));
}
