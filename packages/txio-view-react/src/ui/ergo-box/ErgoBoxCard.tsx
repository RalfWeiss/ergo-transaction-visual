import React, { useRef, useLayoutEffect } from "react";
import { ErgoBox } from "../../model";
import { Assets } from "./Assets";
import { RootProps } from "./RootProps";
import { Registers } from "./Registers";
import { setDimension } from "../../model";
import { usePrevious, useStore } from "../../hooks";
import { FaFileContract, FaMoneyBill } from "react-icons/fa";
import { BiFace } from "react-icons/bi";
import * as R from "ramda";

const cardStyle = {
  // padding:'1ch',
  paddingBottom: "0",
  marginBottom: "0",
  borderRadius: "15px",
  fontSize: "small",
  // backgroundColor:'ButtonFace',
  backgroundColor: "inherit",
  // bgColor: "inherit",
  // opacity: '8'
  display: "flex",
  flexDirection: "column",
  position: "relative",
} as React.CSSProperties;

const partStyle = {
  padding: "2px",
  paddingLeft: "4px",
  marginBottom: "4px",
  borderRadius: "10px",
  backgroundColor: "ButtonFace",
  // color: "var(--chakra-colors-red-100)" // Todo: this works, when chakra is installed
  // opacity: '8'
};

interface PartProps {
  hideOn: (ergoBox: ErgoBox) => boolean; // function as property declaration
  ergoBox: ErgoBox;
  openState: boolean;
  label: string;
  children: any;
}

const Part = ({ ergoBox, hideOn, openState, label, children }: PartProps) => {
  if (hideOn(ergoBox)) {
    return null;
  }
  return (
    <details open={openState} style={partStyle}>
      <summary
        style={{ textAlign: "left", fontSize: "small", fontStyle: "italic" }}
      >
        {label}
      </summary>
      {children}
    </details>
  );
};

const getLabel = (store) => (ergoTree) => {
  if (!store || !ergoTree) {
    return "";
  }
  const t = store?.colorMap[ergoTree]?.label;
  return t || "";
};

const getType = (store) => (ergoTree) => {
  if (!store || !ergoTree) {
    return "";
  }
  const t = store?.colorMap[ergoTree]?.type;
  return t || "";
};

interface ErgoBoxCardProps {
  ergoBox: ErgoBox;
}

const badgeIconStyle = {
  backgroundColor: "inherit",
  // paddingLeft: "4px",
  // paddingBottom: "2px"
};

const badgeLabelStyle = {
  //  paddingLeft: "2px"
};

export const TypeBadge = ({ ergoTree }) => {
  const { state } = useStore();

  // FaFileContract
  const badgeType = getType(state)(ergoTree);
  const badgeText = getLabel(state)(ergoTree);
  const Icon = R.cond([
    [
      R.equals("SC"),
      R.always(() => (
        <FaFileContract style={{ fontSize: "large", paddingBottom: "2px" }} />
      )),
    ],
    [
      R.equals("Fee"),
      R.always(() => <FaMoneyBill style={{ fontSize: "large" }} />),
    ],
    [R.T, R.always(() => <BiFace style={{ fontSize: "large" }} />)],
  ])(badgeType);
  return (
    <div className="badges">
      {badgeText && badgeText !== "" ? (
        <div style={badgeIconStyle}>
          <Icon />
        </div>
      ) : null}
      {badgeText && badgeText !== "" ? ( // && badgeText !== "Fee")
        <div style={badgeLabelStyle}>
          <span>{badgeText}&nbsp;</span>
        </div>
      ) : null}
    </div>
  );
};

export const ErgoBoxCard = ({ ergoBox }: ErgoBoxCardProps) => {
  const prevErgoBox = usePrevious(ergoBox);
  // const { state, setState } = useContext(TxioStoreContext);
  const { state, setState } = useStore();
  const ref: any = useRef(null);

  useLayoutEffect(() => {
    if (!ergoBox) {
      return;
    }
    if (R.equals(prevErgoBox, ergoBox)) {
      return;
    }

    const dimension = {
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    };
    const dimensionsFromState = state.dimensions[ergoBox.internalId];

    if (
      dimension.height !== 0 &&
      dimension.width !== 0 &&
      !R.equals(dimension, dimensionsFromState)
    ) {
      setState(setDimension(ergoBox.internalId)(dimension));
    }
  }, [state, ergoBox, prevErgoBox, setState]);

  if (!ergoBox) {
    // return null;
    return <div>Missing ergoBox data</div>;
  }
  // don't hide root props anymore
  // hideOn={R.o(R.isEmpty, R.prop('value'))}
  return (
    <div ref={ref} style={cardStyle}>
      <TypeBadge ergoTree={ergoBox.ergoTree} />
      <Part
        ergoBox={ergoBox}
        openState
        hideOn={R.always(false)}
        label="root properties"
      >
        <RootProps ergoBox={ergoBox} />
      </Part>
      <Part
        ergoBox={ergoBox}
        openState
        hideOn={R.o(R.isEmpty, R.prop("assets"))}
        label="assets"
      >
        <Assets ergoBox={ergoBox} />
      </Part>
      <Part
        ergoBox={ergoBox}
        openState
        hideOn={R.o(R.isEmpty, R.prop("additionalRegisters"))}
        label="additionalRegisters"
      >
        <Registers ergoBox={ergoBox} />
      </Part>
    </div>
  );
};
