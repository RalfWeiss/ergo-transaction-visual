<!--suppress HtmlDeprecatedAttribute -->
<div align="center">

**ertravi** = Ergo Transactions Visuals

This is an <b>alpha</b> version!

</div>

----

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [Features](#features)
- [Getting started](#getting-started)
- [Example **NextJS**](#example-nextjs)
- [Configuration](#configuration)
  - [Chakra](#chakra)
  - [rootPropsToShow](#rootpropstoshow)
  - [boxColors](#boxcolors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

----

## Features

> The main focus of this repo is making tools to help understand the **[Ergo](https://ergoplatform.org/)** blockchain. As a starting point you'll find the **txio-view-react** which tries to map inputs to outputs in a visual appealing way usable within a **React** app.

As of now, with version v0.0.28, you could see sth. like this:

![](media/demo-output-v0-0-28.png)

This means:
- deep combinatory analysis
  - spreads values over boxes until it finds a reasonable solution (least changes)
  - **drawbacks**: 
    - can take some time if the no of boxes rises
    - blocks UI while performing analysis
- configure `boxColors` and `rootPropsToShow`
- **Auto-Layout** could rearrange connected boxes
- ability to toggle between **Auto-Layout** and simple positioning
- related boxes (same value for `ergoTree`) share same color.
- ~~boxes with same boxId are connected by an arrow line~~
- ~~boxes which have same tokenId are connected by an arrow line~~

## Getting started

To add it to your project run:

```
yarn add @ertravi/txio-view-react
```

## Example **NextJS**

This example shows:

- the use of an optional config object to configure the visualisation

- `pages\_app.tsx`

```tsx
import React from "react";
import { TxioStoreProvider, ReactFlowProvider } from "@ertravi/txio-view-react";

// use an optional config 
const TxioViewConfig = {
  rootPropsToShow: [
    "boxId",
    "address",
    "ergoTree",
    "blockId",
    "transactionId",
    "value",
  ],
  boxColors: [
    "var(--chakra-colors-green-600)",
    "var(--chakra-colors-blue-300)",    
    "var(--chakra-colors-red-300)",    
  ]  
};

export default function MyApp({ Component, pageProps }) {
  return (
    <TxioStoreProvider  config={TxioViewConfig}>
      <ReactFlowProvider>
        <Component {...pageProps} // eslint-disable-line
        />
      </ReactFlowProvider>
    </TxioStoreProvider>
  );
}

```

- `pages\index.tsx` (extracts)

```tsx
...
import { TxDiagram, useToggleDagreLayout } from "@ertravi/txio-view-react"; 

...

const Buttons = ({ setTxData }) => {
  const [withDagreLayout, toogleWithDagreLayout] = useToggleDagreLayout();
  return (
    <>
      {demos.map(({ title, data }) => (
        <button onClick={() => setTxData(data as any)}
          ...
        >
          {title}
        </button>
      ))}
      <button onClick={() => (toogleWithDagreLayout as () => void)()}
        ...
      >
        {withDagreLayout ? "No Dagre Layout" : "Use Dagre Layout"}
      </button>
    </>
  );
};

export default () => {
  const [txData, setTxData] = useState(data4);

  return (
    ...
    <Buttons {...{ setTxData }} />
    <TxDiagram width={800} height={800} data={txData} />
    ...
  );
};
```

## Configuration

### Chakra

If you use [Chakra](https://chakra-ui.com/) as your component library you may want to use [Chakra Global Styles](https://chakra-ui.com/docs/styled-system/features/global-styles) as well in order to style the **address-link** to **Ergo-Explorer**.

As an example for **NextJS** you might use the following approach in file `_app.tsx`:

```tsx
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { TxioStoreProvider, ReactFlowProvider } from "@ertravi/txio-view-react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "gray.600",
        lineHeight: "tall",
      },
      a: {
        color: "blue.500",
      },
    },
  },
});

...

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <TxioStoreProvider config={TxioViewConfig}>
        <ReactFlowProvider>
          <Component {...pageProps} // eslint-disable-line
          />
        </ReactFlowProvider>
      </TxioStoreProvider>
    </ChakraProvider>
  );
}
```


### rootPropsToShow

A list of `property` names to show up in the **root properties** section. 

> The order of the names is used for display order.

Choose from these possibilities:

- "address"
- "blockId"
- "boxId"
- "ergoTree"
- "transactionId"
- "value"

The default is:

```js
[
  "value", 
  "boxId", 
  "address"
]
```

### boxColors

`boxColors` is a list of `Color` values. 

- use any string that can be used as a `Color`.
- use as many as you expect different values of `ergoTree`

You can even use **Chakra's CSS Variables**

**Example**:

```js
const TxioViewConfig = {
  ...
  boxColors: [
    "var(--chakra-colors-green-600)", 
    "LightCoral",    
    "#996600",    
  ]  
};
var(--chakra-colors-green-600)
```

The default is:

```js
[
  "LightCoral",
  "PaleGreen",
  "SkyBlue",
  "Khaki",
  "NavajoWhite",    
  "MistyRose",
]
```