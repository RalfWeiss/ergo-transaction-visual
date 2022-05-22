<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [Features](#features)
- [Getting started](#getting-started)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--suppress HtmlDeprecatedAttribute -->
<div align="center">

**ertravi** = Ergo Transactions Visuals

</div>

----

## Features

> The main focus of this repo is making tools to help understand the **[Ergo](https://ergoplatform.org/)** blockchain. As a starting point you'll find the **txio-view-react** which tries to map inputs to outputs in a visual appealing way usable within a **React** app.

As of now, with version v0.0.16, you could see sth. like this:

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


