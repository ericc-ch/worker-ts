import esbuild from "esbuild"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

export async function build(entry: string): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "worker-ts-"))

  const result = await esbuild.build({
    entryPoints: [entry],
    outdir: tmpDir,
    format: "esm",
    bundle: true,
    write: true,
    sourcemap: false,
    minify: false,
    treeShaking: false,
    logLevel: "silent",
    target: "esnext",
  })

  if (!result.outputFiles) {
    throw new Error("No output files")
  }

  const [out] = result.outputFiles

  return out.path
}
