# Categorizing Boxes

Names for the categories could be: [Alice, Bob, Carol, Dave](https://www.elektronik-kompendium.de/sites/net/1909021.htm).

Context is based on: https://felixgerschau.com/react-typescript-context/

# Coloring




Boxes with the same `ergoTree` or `address` value should share same color:

```js
{
  inputs: [
    { id: "In-A", address: "adr-1", ergoTree: "et-1"},
    { id: "In-B", address: "adr-1", ergoTree: ""},
    { id: "In-C", address: "", ergoTree: ""},
    { id: "In-D", address: "", ergoTree: "et-2"} 
  ],
  outputs: [
    { id: "Out-1", address: "adr-1", ergoTree: ""},
    { id: "Out-2", address: "", ergoTree: "et-1"},
    { id: "Out-3", address: "", ergoTree: ""}    
  ]
}
```

- group ergoTree by address

```js
{
  "": ["", "et-2", "et-1", "", ],
  "adr-1": ["et-1", "", ""]
}
```

- group by address and ergoTree


```js
{
  "": {
    "": ["In-C", "Out-3"],
    "et-1": ["Out-2"],
    "et-2": ["In-D"]
  },
  "adr-1": {
    "":  ["In-B", "Out-1"],
    "et-1":  ["In-A"]
  },

}
```



expected outcome:

```js
{
  inputs: [
    { id: "In-A", address: "Adr-1", ergoTree: "et-1"},
    { id: "In-B", address: "Adr-1", ergoTree: ""},
    { id: "In-C", address: "", ergoTree: ""}    
  ],
  outputs: [
    { id: "Out-1", address: "Adr-1", ergoTree: ""},
    { id: "Out-2", address: "", ergoTree: "et-1"},
    { id: "Out-3", address: "", ergoTree: ""}    
  ]
}
```


823996534933636

