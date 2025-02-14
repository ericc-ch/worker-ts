import fs from "node:fs/promises"
import path from "node:path"
import { describe, it, expect, afterEach, vi } from "vitest"

import { build } from "../../src/lib/esbuild"

const FIXTURES_DIR = path.join(import.meta.dirname, "..", "fixtures")

describe("build", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should bundle an entry file and produce an output file", async () => {
    const fixtureFile = path.join(FIXTURES_DIR, "simple.ts")
    const outputFilePath = await build(fixtureFile)

    expect(typeof outputFilePath).toBe("string")
    await fs.access(outputFilePath)
  })

  it("should produce distinct output files on multiple invocations", async () => {
    const fixtureFile = path.join(FIXTURES_DIR, "simple.ts")

    const outputFilePath1 = await build(fixtureFile)
    const outputFilePath2 = await build(fixtureFile)

    expect(outputFilePath1).not.toEqual(outputFilePath2)
  })
})
