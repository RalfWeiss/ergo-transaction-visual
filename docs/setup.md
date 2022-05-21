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


### First Try

- Error:

Run pnpm -r publish  --filter "@ertravi/txio-view-react" --no-git-checks --access=public
  

> @ertravi/txio-view-react@0.0.8 prepublishOnly /home/runner/work/ergo-transaction-visual/ergo-transaction-visual/packages/txio-view-react
> pnpm run build

 ERR_PNPM_NO_SCRIPT  Missing script: build

- so changing the prebuild by postbuild solution

### Second Try

- Error

npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in to https://registry.npmjs.org/
npm ERR! need auth You need to authorize this machine using `npm adduser`

- logged in to npm

```
npm adduser
```

try changing:

```
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

to 

```
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

-- create `.npmrc` in packages folder

```
//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}
```
