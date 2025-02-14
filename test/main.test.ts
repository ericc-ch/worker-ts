import path from "node:path"
import { fileURLToPath } from "node:url"
import { Worker } from "node:worker_threads"
import { describe, it, expect } from "vitest"

import { createWorker } from "../src/main"

describe("createWorker", () => {
  const fixturePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "fixtures/simple.ts",
  )

  it("creates a worker with build", async () => {
    const worker = await createWorker(fixturePath, { skipBuild: false })
    expect(worker).toBeInstanceOf(Worker)

    // Wait for worker to complete
    await new Promise((resolve) => {
      worker.on("exit", resolve)
    })

    await worker.terminate()
  })
})
