import React, { useRef, useContext, useLayoutEffect } from "react";
import { TxioStoreContext } from "../../model";
import { ErgoBox } from "../../model";
import { Assets } from "./Assets";
import { RootProps } from "./RootProps";
import { Registers } from "./Registers";
import { setDimension } from "../../model";
import { usePrevious } from "../../hooks";
import * as R from "ramda";

const cardStyle = {
  // padding:'1ch',
  paddingBottom: "0",
  marginBottom: "0",
  borderRadius: "15px",
  fontSize: "small",
  // backgroundColor:'ButtonFace',
  // opacity: '8'
};

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

interface ErgoBoxCardProps {
  ergoBox: ErgoBox;
}

export const ErgoBoxCard = ({ ergoBox }: ErgoBoxCardProps) => {
  const prevErgoBox = usePrevious(ergoBox);
  const { state, setState } = useContext(TxioStoreContext);
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
