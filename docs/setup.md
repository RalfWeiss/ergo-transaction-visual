# Setup

In order to make it run some steps were taken:

- packages\tsconfig
- packages.json: 
  - run pnpm i first
  - run build on packages before build on examples
- github\workflows
  - autopublish packages


## Autopublish Packages

Based on [Publish packages from within a Monorepo](https://dev.to/menghif/publish-packages-from-within-a-monorepo-3b96)


```
  - run: pnpm -r publish --no-git-checks --access=public
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```


```
  - run: pnpm -r publish --no-git-checks --access=public
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

-     environment: Dev added to workflow script


Create New Access Token on npm with:

name: PublishFromGit
type: Automation

Copied the generated token in a save place:

Environment Dev created on Github.
