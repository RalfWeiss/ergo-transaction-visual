import React from "react";
import { Box, Button, Container, HStack, Input, Text } from "@chakra-ui/react";
import {
  TxDiagram,
  TxioStoreProvider,
  ReactFlowProvider,
} from "@ertravi/txio-view-react";

// import { useFetch } from 'usehooks-ts'
import { useFetch } from "../hooks/useFetch";
// import data from "../fixtures/demo-2.json";

// export default () => <TxIoView width={800} height={800} ergoTx={data as any} />;

/*
transaction-IDs that worked:
2cb6ed530859a3f1c638278d66aea66ce81b750e776a8da46711803d13972198
444e78bd9e41e52fbf14a17a5d5c218e5db62476404a5df47e6e9d13bd89e253
1ab31add256ef431d9e15a26bea4f5ebc69b1c6aec89a48d42ac21d29032b7db
a9165c2e40a27024a3bda3012bb5796dd39a16be9d6488868f2294424e752342

 cd06edc33550d5755a0a872d3bf8a139da0b0bd211445abd6c69b7e524d19ea3
74b442520f7b20e292cd574f4074f5ee6888eb030d005d2d0b4b381b2e4f9175

too big:
baf44dba0b91a7105cb2648f0ad75c820c2b55e39eb315dd400e46768b16c206
*/

const MaxBoxes = 5;

// use an optional config
const TxioViewConfig = {
  rootPropsToShow: [
    "value",
    "ergoTree",
    "address",
    "boxId",
    "blockId",
    "transactionId",
  ],
  boxColors: [
    // "#996600",
    "var(--chakra-colors-red-200)",
    "var(--chakra-colors-green-200)",
    "var(--chakra-colors-blue-200)",
    "var(--chakra-colors-yellow-300)",
    "var(--chakra-colors-purple-300)",
    "var(--chakra-colors-pink-300)",
  ],
};

const TransactionView = ({ txId }) => {
  const { data, error } = useFetch(`/ergoexplorer/en/transactions/${txId}`);

  if (error) {
    return <p>There is an error: {JSON.stringify(error, null, 2)}</p>;
  }

  if (!data) {
    return (
      <>
        <Text fontSize="3xl" mb={4}>
          Loading ...
        </Text>
        <Text fontSize="2xl" align="center" mb={4}>
          Please be patient.
          <br />
          It can take some time.
          <br />
          <br />
          Sometimes 20-40 seconds.
        </Text>
        <Text fontSize="2xl" align="center" mb={40}>
          This is still a <b>alpha</b> version.
        </Text>
      </>
    );
  }

  if (data?.inputs?.length > MaxBoxes || data?.outputs?.length > MaxBoxes) {
    // return <Text>As of now I can only handle 2 inputs x 2 outputs</Text>
    return (
      <>
        <Text fontSize="3xl">Sorry !!!</Text>
        <Text fontSize="2xl" align="center" mb={4}>
          At present I can only handle <br />
          max {MaxBoxes} inputs to max {MaxBoxes} outputs.
          <br />
        </Text>
        <Text fontSize="2xl" align="center" mb={40}>
          This transaction
          <br />
          has {data?.inputs?.length} inputs to {data?.outputs?.length} outputs.
          <br />
        </Text>
      </>
    );
  }

  // return <TxIoView width={800} height={800} ergoTx={data as any} />
  return (
    <>
      <TxDiagram width={1100} height={800} data={data as any} />
      {/*       <Flex flexDirection="column">
      <div>state form useStore</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      </Flex> */}
      <div style={{ marginTop: 200, overflow: "hidden" }}>
        <div>data from ErgoExplorer</div>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};

const TransactionViewWrapper = ({ txId }) => {
  if (!txId || txId.length < 40) {
    return (
      <Text fontSize="3xl" align="center" mb={40}>
        Provide an <br />
        <b>Ergo Transaction Id</b> <br />
        and press <br />
        the <b>View</b> button.
      </Text>
    );
  }
  return <TransactionView txId={txId} />;
};

export default () => {
  const [txId2View, setTxId2View] = React.useState("");
  const [txId, setTxId] = React.useState(
    "95c9ffdf0bfc4e4f904dfba2f516bb8e3929a2fb369c59b7a5a93087ba7730ef"
  );
  const handleChange = (event) => setTxId(event.target.value);

  return (
    <Box w="full" bg="gray.100">
      <Container p={4} mt={2} centerContent>
        <HStack spacing="24px">
          <Input
            value={txId}
            onChange={handleChange}
            placeholder="Ergo Transaction Id"
            w="70ch"
          />
          <Button
            size="sm"
            colorScheme="blue"
            isDisabled={txId.length < 40}
            onClick={() => setTxId2View(txId)}
          >
            View
          </Button>
        </HStack>
        <Box
          w={1000}
          h={840}
          pt={2}
          // align="center"
          // justify="center"
          flexDirection="column"
        >
          <TxioStoreProvider config={TxioViewConfig}>
            <ReactFlowProvider>
              <TransactionViewWrapper txId={txId2View} />
            </ReactFlowProvider>
          </TxioStoreProvider>
        </Box>
      </Container>
    </Box>
  );
};
