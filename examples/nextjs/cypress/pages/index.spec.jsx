import React from 'react'
import { mount } from '@cypress/react'
import IndexPage from '../../pages/index'

it('Renders page component', () => {
  mount(<IndexPage />)
  cy.contains('Click me')
})