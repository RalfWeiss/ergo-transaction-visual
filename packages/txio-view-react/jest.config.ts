/**
 * @jest-environment jsdom
 */

import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
// Load the config which holds the path aliases.
import { compilerOptions } from "../../tsconfig.json";

// import {jsdom} from 'jsdom';
// const DEFAULT_HTML = '<html><body></body></html>';

// // Define some variables to make it look like we're a browser
// // First, use JSDOM's fake DOM as the document
// global.document = jsdom.jsdom(DEFAULT_HTML);

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: "<rootDir>/../../",
  }),
};

export default config;
