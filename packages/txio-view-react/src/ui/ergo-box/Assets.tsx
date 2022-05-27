import React from "react";
import { ErgoBox } from "../../model";
import * as R from "ramda";
import { truncateWithEllipses } from "../../utils";

interface AssetsProps {
  ergoBox: ErgoBox;
}

interface AssetRowProps {
  name: string;
  type: string;
  tokenId: string;
  amount: number;
}

const TRUNCATE_MAXLEN = 10;

const assetRow =
  ({ hasNames, hasTypes }) =>
  ({ name, type, tokenId, amount }: AssetRowProps) =>
    (
      <tr key={tokenId}>
        {hasNames ? <td>{name}</td> : null}
        {hasTypes ? <td>{type}</td> : null}
        <td>{truncateWithEllipses(TRUNCATE_MAXLEN)(tokenId)}</td>
        <td style={{ width: "10ch", textAlign: "right" }}>{amount}</td>
      </tr>
    );

export const Assets = ({ ergoBox }: AssetsProps) => {
  if (!ergoBox.assets || ergoBox.assets.length === 0) {
    return null;
  }
  const hasNames =
    R.filter(R.propEq("name", ""))(ergoBox.assets).length !==
    ergoBox.assets.length;
  const hasTypes =
    R.filter(R.propEq("type", ""))(ergoBox.assets).length !==
    ergoBox.assets.length;
  const Assets = ergoBox.assets.map(assetRow({ hasNames, hasTypes }));
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table>
        {/* <caption style={{textAlign:'left', fontSize: 'small'}}>assets</caption>         */}
        <thead style={{ fontSize: "x-small" }}>
          <tr style={{ width: "20ch" }}>
            {hasNames ? <th style={{ width: "10ch" }}>name</th> : null}
            {hasTypes ? <th style={{ width: "10ch" }}>type</th> : null}
            <th style={{ width: "10ch" }}>tokenId</th>
            <th style={{ width: "10ch", textAlign: "right" }}>amount</th>
          </tr>
        </thead>
        <tbody>{Assets}</tbody>
      </table>
    </div>
  );
};
