<!--suppress HtmlDeprecatedAttribute -->
<div align="center">

Cloned from Template project for setting up a TypeScript monorepo

[![tests](https://github.com/NiGhTTraX/ts-monorepo/actions/workflows/tests.yml/badge.svg)](https://github.com/NiGhTTraX/ts-monorepo/actions/workflows/tests.yml)

</div>

----

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [Features](#features)
- [Setup](#setup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

> The main focus of this repo is making the **`Go to definition`** feature in IDEs work without any surprises, meaning it will work after a fresh clone without needing to build the project.

## Setup

This repo uses [pnpm](https://pnpm.io/), but should work fine with any of the following:

- [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [npm 7 workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [npm < 7 and `lerna bootstrap`](https://github.com/lerna/lerna/blob/main/commands/bootstrap/README.md)

I strongly recommend `pnpm` over the other solutions, not only because it's usually faster, but because it avoids dependency problems caused by hoisting (see https://github.com/NiGhTTraX/ts-monorepo/commit/d93139166b25fab15e9538df58a7d06270b846c9 as an example).

```sh
# Install pnpm with your preferred method: https://pnpm.io/installation.
npm i -g pnpm

# Install all dependencies.
pnpm i
```