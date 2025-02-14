import path from "node:path"
import { Worker } from "node:worker_threads"
import { describe, it, expect } from "vitest"

import { workerTS } from "../src/main"

describe("createWorker", () => {
  const fixturePath = path.join(import.meta.dirname, "fixtures/simple.ts")

  it("creates a worker with build", async () => {
    const worker = await workerTS(fixturePath, { skipBuild: false })
    expect(worker).toBeInstanceOf(Worker)

    // Wait for worker to complete
    await new Promise((resolve) => {
      worker.on("exit", resolve)
    })

    await worker.terminate()
  })
})
