import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import { externals } from "rollup-plugin-node-externals";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const commonjs = require("@rollup/plugin-commonjs");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const replace = require("@rollup/plugin-replace");

export async function prepareNodePackage(entryPoint: string, external: string[], tmpFolder: string) {
    
    console.log('Preparing package ...');
    
    const result = await rollup({
      input: entryPoint,
  
      plugins: [
        commonjs(),
        externals({ include: external }),
        resolve(),
        replace({
          preventAssignment: true,
          values: {
            "process.env.NODE_ENV": '"development"',
          },
        }),
      ],
    });
  
    await result.write({
      format: "esm",
      file: tmpFolder,
      sourcemap: true,
      exports: "named",
    });
  }