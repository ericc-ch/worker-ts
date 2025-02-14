import fs from "node:fs/promises"
import path from "node:path"
import { describe, it, expect, afterEach, vi } from "vitest"

import { build } from "../../src/lib/build"

const FIXTURES_DIR = path.join(import.meta.dirname, "..", "fixtures")

describe("build", () => {
  // Track output files that need cleanup
  const filesToCleanup: Array<string> = []

  afterEach(async () => {
    // Clean up any created files and their parent directories
    for (const file of filesToCleanup) {
      try {
        await fs.unlink(file)
        // Remove the parent directory (the temp dir)
        await fs.rmdir(path.dirname(file))
      } catch (error) {
        // Ignore errors during cleanup
        console.warn("Cleanup error:", error)
      }
    }
    filesToCleanup.length = 0 // Clear the array
    vi.restoreAllMocks()
  })

  it("should bundle an entry file and produce an output file", async () => {
    const fixtureFile = path.join(FIXTURES_DIR, "simple.ts")
    const outputFilePath = await build(fixtureFile)
    filesToCleanup.push(outputFilePath)

    expect(typeof outputFilePath).toBe("string")
    await fs.access(outputFilePath)
  })

  it("should produce distinct output files on multiple invocations", async () => {
    const fixtureFile = path.join(FIXTURES_DIR, "simple.ts")

    const outputFilePath1 = await build(fixtureFile)
    const outputFilePath2 = await build(fixtureFile)

    filesToCleanup.push(outputFilePath1, outputFilePath2)

    expect(outputFilePath1).not.toEqual(outputFilePath2)
  })
})
