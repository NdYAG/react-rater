jest.autoMockOff()

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const Rater = require('../src/').default

describe('<Rater total={5} rating={2} limit={4} />', () => {
  it('renders 5 stars (2 active, 1 unclickable)', () => {
    const rater = TestUtils.renderIntoDocument(
      <Rater total={5} rating={2} limit={4} />
    )
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(rater, 'a')
    const activeStars = TestUtils.scryRenderedDOMComponentsWithClass(rater, 'is-active')
    const unclickableStars = TestUtils.scryRenderedDOMComponentsWithClass(rater, 'is-disabled')

    expect(stars.length).toEqual(5)
    expect(activeStars.length).toEqual(2)
    expect(unclickableStars.length).toEqual(1)
  })

  it('can only be rated to 4 as maximum', () => {
    const rater = TestUtils.renderIntoDocument(
      <Rater total={5} rating={2} limit={4} />
    )
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(rater, 'a')
    TestUtils.Simulate.click(stars[3])
    TestUtils.Simulate.click(stars[4])
    expect(rater.state.rating).toEqual(4)
  })
})
