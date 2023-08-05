import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import ts from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export default [
    {
        input: {
            "content_script/insert_provider": "src/content_script/insert_provider.ts",
        },
        output: {
            dir: "dist",
            format: "iife",
        },
        plugins: [
            ts(),
            nodeResolve({ jsnext: true }),
            commonjs()
        ]
    },
    {
        input: {
            provider: "src/provider.ts",
        },
        output: {
            dir: "dist",
            format: "iife",
        },
        plugins: [
            ts(),
            nodeResolve({ jsnext: true }),
            commonjs()
        ]
    },
    {
        input: {
            "options_ui/index": "src/options_ui/index.ts",
        },
        output: {
            dir: "dist",
            format: "iife",
        },
        plugins: [
            ts(),
            nodeResolve({ jsnext: true }),
            commonjs(),
            copy({
                targets: [
                    { src: "src/manifest.json", dest: "dist"},
                    { src: "src/options_ui/index.html", dest: "dist/options_ui"},
                ]
            }),
        ]
    }
];