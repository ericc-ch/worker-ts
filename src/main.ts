import { Worker } from "node:worker_threads"
import { isBun, isDeno } from "std-env"

import { build } from "./lib/build"

interface CreateWorkerOption {
  skipBuild?: boolean
}

export async function workerTS(path: string, options: CreateWorkerOption = {}) {
  const skipBuild = options.skipBuild ?? (isBun || isDeno)

  const workerPath = skipBuild ? path : await build(path)

  return new Worker(workerPath)
}
