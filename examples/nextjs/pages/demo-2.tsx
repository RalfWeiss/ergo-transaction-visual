import React from "react";
import { TxIoView } from "@ertravi/txio-view-react";
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

too big:
baf44dba0b91a7105cb2648f0ad75c820c2b55e39eb315dd400e46768b16c206
*/

export default () => {
  const { data, error } = useFetch(
    "/ergoexplorer/en/transactions/2cb6ed530859a3f1c638278d66aea66ce81b750e776a8da46711803d13972198"
  );

  if (error) {
    return <p>There is an error: {JSON.stringify(error, null, 2)}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <TxIoView width={800} height={800} ergoTx={data as any} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
