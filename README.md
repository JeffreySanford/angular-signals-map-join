# Angular Signals + Map Join

A focused Angular interview exercise demonstrating how to combine two related collections efficiently while using writable signals and derived `computed()` state.

## What this demonstrates

- Angular writable signals for source state
- A read-only `computed()` signal for derived state
- An O(n + m) in-memory left join using `Map`
- Immutable array updates with `set()` and `update()`
- Modern Angular template control flow with `@for` and `@if`
- `OnPush` change detection
- Strict TypeScript and `ReadonlyArray`
- Unit tests for matching, missing data, duplicates, immutability, and signal recomputation

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Run checks

```bash
npm run build
npm test
```

## Core algorithm

```ts
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
```

Building the `Map` costs O(m). Traversing the bird collection costs O(n). The overall time complexity is approximately **O(n + m)** with **O(m)** additional space.

A nested solution such as `birds.map(bird => details.find(...))` can degrade toward **O(n × m)** because it may scan the details array once for every bird.

## Signals design

```ts
readonly birds = signal<ReadonlyArray<Bird>>(INITIAL_BIRDS);
readonly birdDetails = signal<ReadonlyArray<BirdDetails>>(
  INITIAL_BIRD_DETAILS
);

readonly combinedBirds = computed<ReadonlyArray<CombinedBird>>(() =>
  combineBirds(this.birds(), this.birdDetails())
);
```

There are three related protections here:

1. TypeScript `readonly` prevents the component property from being reassigned.
2. Angular `computed()` exposes derived state without `set()` or `update()` methods.
3. `ReadonlyArray<CombinedBird>` prevents callers from mutating the returned collection through the type system.

The source signals remain writable because they represent application state. `combinedBirds` remains derived rather than being manually synchronized as a third writable signal.

## Interview explanation

> I index the secondary collection into a Map using the shared identifier, then make one pass over the primary collection and perform average constant-time lookups. That reduces the join from a possible O(n × m) nested search to approximately O(n + m). In Angular, the two source collections are writable signals and the joined collection is a computed signal. Angular tracks both dependencies and invalidates the computed value whenever either source changes. The computed result is lazy, memoized, and cannot be updated directly, so I avoid duplicated state and manual synchronization.

## Senior-level follow-up topics

- What should happen when the details collection contains duplicate IDs?
  The duplicates are ignored, and the first matching record is used. This is a common approach in SQL joins, but it may not be appropriate for all use cases.

- Should unmatched primary records be retained, dropped, or reported?
  Retaining unmatched records is a common approach in left joins, but it may not be appropriate for all use cases. Dropping unmatched records may be appropriate if the details collection is considered authoritative. Reporting unmatched records may be appropriate if the application needs to track missing data.

- At what data size should the join move to the backend or database?
  Once the data size exceeds the available memory or the performance of the in-memory join becomes unacceptable, it may be appropriate to move the join to the backend or database. This threshold will depend on the specific application and its performance requirements.

- How would server-side filtering and cursor pagination change the design?
  Server-side filtering and cursor pagination would require the join to be performed on the backend, and the frontend would need to request only the relevant data. This would reduce the amount of data transferred over the network and improve performance, but it would also increase the complexity of the backend and require additional API endpoints.

- Which database indexes would support the equivalent SQL join?
  Primary key indexes on the bird ID in both the birds and bird details tables would support the equivalent SQL join. Additionally, a foreign key constraint on the bird details table referencing the birds table would ensure referential integrity.

- How would you measure memory use, request latency, payload size, and rendering time?
  Memory use can be measured using browser developer tools or profiling tools. Request latency can be measured using network monitoring tools or by logging request and response times. Payload size can be measured by inspecting the network requests and responses. Rendering time can be measured using browser developer tools or performance profiling tools.

## Project structure

```text
src/app/
├── data/
│   └── bird.data.ts
├── models/
│   └── bird.models.ts
├── utils/
│   ├── combine-birds.ts
│   └── combine-birds.spec.ts
├── app.component.ts
├── app.component.html
├── app.component.css
└── app.component.spec.ts
```

## License

MIT
