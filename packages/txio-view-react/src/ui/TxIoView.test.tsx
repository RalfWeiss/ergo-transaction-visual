// import dependencies
import React from 'react'

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import {TxIoView} from './TxIoView'


describe("TxIoView", () => {
  it("should show 'Click me'", async () => {
    const data = {
      inputs: [{boxId: "000x"}],
      outputs: [{boxId: "100x"}]
    }
    render(<TxIoView width={800} height={800} ergoTx={data}/>)

    //fireEvent.click(screen.getByText('Load Greeting'))
  
    //await waitFor(() => screen.getByRole('alert'))
    // await waitFor(() => screen.getByText('Click me'))    
    await waitFor(() => screen.getByText('default title')) 
    
  });
});