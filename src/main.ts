import { Worker } from "node:worker_threads"
import { isBun, isDeno } from "std-env"

import { build } from "./lib/build"

interface CreateWorkerOption {
  skipBuild?: boolean
}

export async function createWorker(
  path: string,
  options: CreateWorkerOption = {},
) {
  const workerUrl = new URL(path, import.meta.url)
  const skipBuild = options.skipBuild ?? (isBun || isDeno)

  const workerPath =
    skipBuild ? workerUrl.pathname : await build(workerUrl.pathname)

  return new Worker(workerPath)
}
