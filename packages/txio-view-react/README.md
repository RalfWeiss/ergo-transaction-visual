<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [Features](#features)
- [Getting started](#getting-started)
- [Example **NextJS**](#example-nextjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--suppress HtmlDeprecatedAttribute -->
<div align="center">

**ertravi** = Ergo Transactions Visuals

</div>

----

## Features

> The main focus of this repo is making tools to help understand the **[Ergo](https://ergoplatform.org/)** blockchain. As a starting point you'll find the **txio-view-react** which tries to map inputs to outputs in a visual appealing way usable within a **React** app.

As of now, with version v0.0.19, you could see sth. like this:

![](media/demo-output-v0-0-16.png)

This means: 
- **Auto-Layout** could rearrange connected boxes
- ability to toggle between **Auto-Layout** and simple positioning
- related boxes share the same color.
- boxes with same boxId are connected by an arrow line

## Getting started

To add it to your project run:

```
yarn add @ertravi/txio-view-react
```

## Example **NextJS**

- `pages\_app.tsx`

```tsx
import React from "react";
import { TxioStoreProvider, ReactFlowProvider } from "@ertravi/txio-view-react";

export default function MyApp({ Component, pageProps }) {
  return (
    <TxioStoreProvider>
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