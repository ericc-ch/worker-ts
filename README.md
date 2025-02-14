# worker-ts

A probably unnecessary TypeScript utility for creating Worker threads with build support.

## Why You Probably Don't Need This

You can probably somehow configure the build step to include the worker file and then load that.

I'm too lazy to do that for my side projects, instead I just use either `tsx` / Bun / Deno. And even with `tsx`, Node.js won't let you load TypeScript file for Worker.

## But if you're feeling adventurous...

This package lets you create Worker threads from TypeScript files with some attempted smart handling:
- Tries to bundle your TS files on the fly for Node.js
- Skips build steps in Bun/Deno because they support TypeScript Worker natively

```typescript
import { createWorker } from 'worker-ts'

// Automatically skip build on Bun / Deno
const worker = await createWorker('./worker.ts')

// Skip build step, then this package basically does nothing
const worker = await createWorker('./worker.ts', { skipBuild: true })
```

## Serious Note

This package is more of an experiment than a production-ready solution. For real applications:
1. Set up proper build pipelines
2. Use your bundler's worker plugins
3. Handle worker compilation during your build step

## License

[Mozilla Public License 2.0](./LICENSE.md) License
