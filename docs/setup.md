# Setup

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [Topics requiring more details](#topics-requiring-more-details)
- [Autopublish Packages](#autopublish-packages)
- [pnpm workspaces](#pnpm-workspaces)
  - [Development workflow example steps:](#development-workflow-example-steps)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Topics requiring more details

In order to make it run some steps were taken:

- packages\tsconfig
- packages.json: 
  - run pnpm i first
  - run build on packages before build on examples
- [doctoc](https://www.npmjs.com/package/doctoc) on subfolders

## Autopublish Packages

Based on [Publish packages from within a Monorepo](https://dev.to/menghif/publish-packages-from-within-a-monorepo-3b96) these steps lead to an `autopublishing`:

- create an environment `Dev` on Github.

- add environment `Dev` to workflow script

  ```  
  on:
    push:
    pull_request: ...

  jobs:
    tests:
      environment: Dev  
      steps: ...

  ```      

- add a step `Publish` to workflow script

  ```  
  - name: Publish
    run: pnpm -r publish --filter "txio-view-react"  --no-git-checks --access=public
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
  ```

- create a `New Access Token` on npm with type=**Automation**

- copy the generated token in a save place:

- create `.npmrc` in folder `packages\txio-view-react` (see: https://github.com/pnpm/pnpm/issues/3141#issuecomment-778844482) with the following content:

  ```
  //registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}
  ```


And that worked! The next error free push will automatically publish a new version of `@ertravi/txio-view-react`.

## [pnpm workspaces](https://pnpm.io/workspaces)

File `pnpm-workspace.yaml` created in projects repo root with this content:

```yaml
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

### Development workflow example steps:

- run **development server** in **`examples\nextjs`**

  ```
  pnpm dev`
  ```

- start **build** in **`packages\txio-view-react`**

  ```
  pnpm build`
  ```

- **add local package** in **`examples\nextjs`**

  ```
  pnpm i @ertravi/txio-view-react@*
  ```

