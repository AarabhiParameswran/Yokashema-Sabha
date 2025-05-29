import { DefaultComponent } from './default.component'

describe('DefaultComponent', () => {
  it('should mount', () => {
    cy.mount(DefaultComponent)
  })
})