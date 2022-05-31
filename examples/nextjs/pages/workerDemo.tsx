import React, { useEffect } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const data = {
  inputs: [
    { address: "Z000001", value: 1, assets: [{ tokenId: "T1" }] },
    { ergoTree: "001et", value: 2 },
    { ergoTree: "002et", value: 3 },
    { ergoTree: "003et", value: 4 },
    { ergoTree: "004et", value: 5 },
  ],
  outputs: [
    { ergoTree: "001et", value: 6 },
    {
      ergoTree: "001et",
      value: 1,
      assets: [{ tokenId: "T1" }],
    },
    { ergoTree: "005et", value: 8 },
  ],
};

export default () => (
  <div>
    <h1>Worker-Demo</h1>
    <Home />
  </div>
);

// assume ./worker.ts contains
// export function hello(name) {
//  return `Hello, ${name}`;
// }

const createWorker = createWorkerFactory(() => import("../worker/demoWorker"));

function Home() {
  const worker = useWorker(createWorker);
  const [message, setMessage] = React.useState(null);

  useEffect(() => {
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!
      // const webWorkerMessage = await worker.hello("Tobi");
      const webWorkerMessage = await worker.convertToState(data);
      setMessage(JSON.stringify(webWorkerMessage, null, 2));
    })();
  }, [worker]);

  return (
    <div title="Home">
      <pre>{message}</pre>
    </div>
  );
}
