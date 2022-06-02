# Categorizing Boxes

Names for the categories could be: [Alice, Bob, Carol, Dave](https://www.elektronik-kompendium.de/sites/net/1909021.htm).

Context is based on: https://felixgerschau.com/react-typescript-context/

## Addresses

Address types are (semantics described below):

    0x01 - Pay-to-PublicKey(P2PK) address
    0x02 - Pay-to-Script-Hash(P2SH)
    0x03 - Pay-to-Script(P2S)



Assuming that the ergoTree value: 0008cd025e6f22d4ba36bd53adbfe449cf85ab11067cfd265b11a8e8faf6d100bd1c2913 
is a standard length address the length is 72.
Each ergoTree with a length of 72 will be handled as a P2PK-Address and labeled as Alice, Bob, etc.

An ergoTree value of: 1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304 will be seen as the fee.

Any other ergoTree value is a Smart Contract.



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

