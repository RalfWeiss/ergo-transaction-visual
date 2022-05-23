# Input to Output Connections

Starting with this data:

```js
{
  inputs: [
    { id: "In-A", assets: [
      { tokenId: "T1" }, { tokenId: "T2"}
    ]},
    { id: "In-B", assets: [
      { tokenId: "T1" }
    ]}    
  ],
  outputs: [
    { id: "Out-1", assets: [
      { tokenId: "T2"}
    ]},
    { id: "Out-2", assets: [
      { tokenId: "T1" }, { tokenId: "T2" }
    ]}
  ]
}
```

1. Normalize `inputs`:

```js
[
  ["In-A", ["T1", "T2"]],
  ["In-B", ["T1"]],
]
```

2. On `inputs` match `tokenId` with `id`:

```js
[
  ["In-A", "T1"],
  ["In-A", "T2"],
  ["In-B", "T1"],
]
```

3. On `inputs` group `inputIds` by `tokenId`: --> inputIdsByTokenId

```js
{
  "T1": ["In-A", "In-B"],
  "T2": ["In-A"],
}
```

4. Normalize `outputs`: --> tokenIdsByOutputId

```js
{
  "Out-1", ["T2"],
  "Out-2", ["T1", "T2"],
}
```

5. Replace each `tokenId` in `tokenIdsByOutputId` with `inputIdsByTokenId[tokenId]`: 

```js
{
  "Out-1", [ ["In-A"] ],
  "Out-2", [ ["In-A", "In-B"], ["In-A"]],
}
```

6. Unnest these lists

```js
{
  "Out-1", ["In-A"],
  "Out-2", ["In-A", "In-B", "In-A"],
}
```

7. Remove duplicates in these lists

```js
{
  "Out-1", ["In-A"],
  "Out-2", ["In-A", "In-B"],
}
```

8. Map each of these lists over it key:

```js
{
  "Out-1", [["In-A", "Out-1"]],
  "Out-2", [["In-A", "Out-2"], ["In-B", "Out-2"]],
}
```

9. Extract the values:

```js
[ 
  [["In-A", "Out-1"]],
  [["In-A", "Out-2"], ["In-B", "Out-2"]]
]
```

10. Unnest

```js
[ 
  ["In-A", "Out-1"],
  ["In-A", "Out-2"], 
  ["In-B", "Out-2"]
]
```

11. Map `EdgeCreator`

```js
[ 
  { id: "In-A_Out-1", source: "In-A", target: "Out-1"},
  { id: "In-A_Out-2", source: "In-A", target: "Out-2"},
  { id: "In-B_Out-2", source: "In-B", target: "Out-2"},
]
```
