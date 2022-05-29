import React, { useContext } from "react";
import { ErgoBox, Context as StoreContext, Selectors } from "../../model";
import { pickKeyValue } from "../../utils";
import {
  LabeledValueEntry,
  ErgoExplorerQueryLink,
  TruncatedLabeledValueEntry,
  ErgoExplorerAddressLink,
  LabeledCurrency,
} from "./components";

// import appConfig from "../../appConfig";

interface RootPropsProps {
  ergoBox: ErgoBox;
}

type KeyValueType = {
  key: string;
  value: string;
};

// // searching by entering address, block hash or transaction
// // transactionId ok, blockId ok,
// const ErgoExplorerQueryLink = ({label,value}:LabeledValueEntryProps) => (
//   <LabeledValueEntry label={label} value={
//     <a href={`https://explorer.ergoplatform.com/en/search?query=${value}`}
//       target="_blank" rel="noopener noreferrer"
//     >{truncateWithEllipses(TRUNCATE_MAXLEN)(value)}</a>
//   } />
// )

// interface Map {
//   [key: string]: string | undefined;
// }

const components: any = {
  address: ErgoExplorerAddressLink,
  blockId: ErgoExplorerQueryLink,
  boxId: TruncatedLabeledValueEntry,
  ergoTree: TruncatedLabeledValueEntry,
  transactionId: ErgoExplorerQueryLink,
  value: LabeledCurrency,
  default: LabeledValueEntry,
};

// Todo: remove truncation from transform in utils
// const mapBaseProps = (components:any) => (propName:string) => {
// const mapBaseProps = (components:any) => ({key,value}:KeyValueType) => {
//   const compName = (propNameToComponentMapping[key] || propNameToComponentMapping.default) as string
//   const Component = components[compName]
//   return <Component key={key} label={key} value={value} />
// }

const mapBaseProps =
  (components: any) =>
  ({ key, value }: KeyValueType) => {
    const Component = components[key] || components.default;
    // const Component = LabeledValueEntry
    return <Component key={key} label={key} value={value} />;
  };

// const mapBaseProps_ = (components:any) => ({key,value}:KeyValueType) => {
//   const Component = R.cond([
//     [ () => R.equals('address', key), () => components['ErgoExplorerAddressLink']],
//     [ () => R.equals('blockId', key), () => components['ErgoExplorerQueryLink']],
//     [ () => R.equals('boxId', key), () => components['TruncatedLabeledValueEntry']],
//     [ () => R.equals('ergoTree', key), () => components['TruncatedLabeledValueEntry']],
//     [ () => R.equals('transactionId', key), () => components['ErgoExplorerQueryLink']],
//       [ R.T, () => components['LabeledValueEntry']],
//   ])()
//   return <Component key={key} label={key} value={value} />
// }

export const RootProps = ({ ergoBox }: RootPropsProps) => {
  const { state } = useContext(StoreContext);
  // const { components } = useContext(GuiContext);
  // const Container = components["BaseInfoContainer"] as any
  // these keys should show up in base info section
  const BasicKeys = pickKeyValue(
    // ['boxId', 'address', 'ergoTree', 'blockId', 'transactionId', 'value']
    // ["boxId", "address", "ergoTree", "blockId", "value"]
    // ["boxId", "address", "value"]
    // appConfig.rootPropsToShow
    Selectors.selRootPropsToShow(state)
  )(ergoBox).map(mapBaseProps(components));
  return (
    <table>
      <tbody>{BasicKeys}</tbody>
    </table>
  );
};
