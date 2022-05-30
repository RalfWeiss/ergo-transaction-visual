import React, { useEffect } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

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
      const webWorkerMessage = await worker.hello("Tobi");
      setMessage(webWorkerMessage);
    })();
  }, [worker]);

  return <div title="Home"> {message} </div>;
}
