// import dependencies
import React from 'react'

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import {Provider} from './StoreProvider'
import {Title} from '../ui'


describe("TxIoView", () => {
  it("should show title from Store", async () => {
    render(
      <Provider>
        <Title />
      </Provider>
    )

    await waitFor(() => screen.getByText('default title'))        
  });
});