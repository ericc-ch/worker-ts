import esbuild from "esbuild"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

export async function build(entry: string): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "worker-ts-"))

  await esbuild.build({
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

  // Get the output file path - it will have the same name as the input file but with .js extension
  const outputFileName = path.basename(entry, path.extname(entry)) + ".js"
  const outputPath = path.join(tmpDir, outputFileName)

  return outputPath
}
