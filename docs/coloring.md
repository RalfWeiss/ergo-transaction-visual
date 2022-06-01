# Categorizing Boxes

Names for the categories could be: [Alice, Bob, Carol, Dave](https://www.elektronik-kompendium.de/sites/net/1909021.htm).

Context is based on: https://felixgerschau.com/react-typescript-context/

## Addresses

Address types are (semantics described below):

    0x01 - Pay-to-PublicKey(P2PK) address
    0x02 - Pay-to-Script-Hash(P2SH)
    0x03 - Pay-to-Script(P2S)

Hey ilyalbn,

hope things went well with your presentation.

Regarding your labeling suggestions, I've got some questions.

Right now the boxes are colored based on different values in field: ergoTree.
I do not look at the value of the address field.
I'm talking about the field address in the transaction data:

According to the docs we have P2PK, P2SH and P2S addresses coded in the address field. Right?

Do you want me to do the following?

- If it is a P2PK address label it as Alice, Bob, etc.?
- If it is a P2SH or P2S label it as Contract?

By the way, what is the difference between P2SH and P2S?


{
  "course": "Layman Design Course",
  "organizedBy": "DeCo",
  "awardedTo": "ralf#9965",
  "team": "Tensile",
  "leadBy": "Auggie",
  "assistedBy": "Zalvures",
  "courseCompleted": true,
  "completedDate": "25th May 2022",
  "finalProject": "Tensile",
  "batch": 1,
  "remarks": "This is to award ${awardedTo} for persevering and completing the DeCo: Layman Design Course.",
  "studentQuote": "Entertaining format that learned me a lot."
}



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

