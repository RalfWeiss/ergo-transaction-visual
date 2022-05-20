import React from "react";
import { ErgoBox } from "../../model";
import { truncateWithEllipses } from "../../utils";

interface AssetsProps {
  ergoBox: ErgoBox;
}

interface AssetRowProps {
  name: string;
  type: string;
  tokenId: string;
  amount: string;
}

const TRUNCATE_MAXLEN = 10;

const assetRow = ({ name, type, tokenId, amount }: AssetRowProps) => (
  <tr key={tokenId}>
    <td>{name}</td>
    <td>{type}</td>
    <td>{truncateWithEllipses(TRUNCATE_MAXLEN)(tokenId)}</td>
    <td style={{ width: "10ch", textAlign: "right" }}>{amount}</td>
  </tr>
);

export const Assets = ({ ergoBox }: AssetsProps) => {
  if (!ergoBox.assets || ergoBox.assets.length === 0) {
    return null;
  }
  const Assets = ergoBox.assets.map(assetRow);
  return (
    <table>
      {/* <caption style={{textAlign:'left', fontSize: 'small'}}>assets</caption>         */}
      <thead>
        <tr style={{ width: "20ch" }}>
          <th style={{ width: "10ch" }}>name</th>
          <th style={{ width: "10ch" }}>type</th>
          <th style={{ width: "10ch" }}>tokenId</th>
          <th style={{ width: "10ch", textAlign: "right" }}>amount</th>
        </tr>
      </thead>
      <tbody>{Assets}</tbody>
    </table>
  );
};
