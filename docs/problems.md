# Problems

- add `txio-view-react` during developemnt

Goto `examples\nextjs` and use:

```
yarn add @ertravi/txio-view-react@*
```


- `flexDirection is not assignable to CSSProperties`

> 

```
Type '{ backgroundColor: string; width: number; height: number; display: string; flexDirection: string; }' is not assignable to type 'CSSProperties'.
  Types of property 'flexDirection' are incompatible.
    Type 'string' is not assignable to type 'FlexDirection'.
```

see: [flexDirection is not assignable to CSSProperties](https://github.com/cssinjs/jss/issues/1344)

On possible solution:

```ts
const mainStyle = {
  backgroundColor: "lightgray",
  width: 800,
  height: 800,
  display: "flex",
  flexDirection: "column",
} as React.CSSProperties;
```



- `Not all constituents of type 'string | ((value: string) => void)' are callable.`

The main part of the TypeScript error that we need to focus on is this: 

> Not all constituents of type 'string | ((value: string) => void)' are callable.

see: [Custom hooks in TypeScript](https://maecapozzi.com/custom-hooks-in-typescript/)

On possible solution: use `as const` for exported `array`.

```ts
export const useToggleDagreLayout = () => {
  // Todo: make clear if there are some drawbacks of using object destructuring here
  const {
    state: {
      config: { useDagreLayout },
    },
    setState,
  } = useContext(StoreContext);

  const toggleLayout = React.useCallback(() => {
    setState(setUseDagreLayout(!useDagreLayout));
    setState(setNoOfGraphLayouts(0));
  }, [useDagreLayout, setState]);

  return [useDagreLayout, toggleLayout] as const;
};
```