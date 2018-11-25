import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rater from '../src'

Enzyme.configure({ adapter: new Adapter() })

describe('Interactive rater: <Rater total={5} rating={2} />', () => {
  const rater = mount(<Rater total={5} rating={2} />)
  it('renders 5 stars(2 active)', () => {
    expect(rater.find('.react-rater').length).toEqual(1)
    expect(rater.find('.react-rater-star').length).toEqual(5)
    expect(rater.find('.is-active').length).toEqual(2)
  })
  it('renders 3 active stars when rate 3', () => {
    rater
      .find('.react-rater')
      .childAt(2)
      .simulate('click')
    expect(rater.find('.is-active').length).toEqual(3)
  })
})

describe('Readonly rater: <React rating={2} interactive={false} />', () => {
  const rater = mount(<Rater rating={2} interactive={false} />)
  it('render 2 active stars when rate 3', () => {
    rater
      .find('.react-rater')
      .childAt(2)
      .simulate('click')
    expect(rater.find('.is-active').length).toEqual(2)
  })
})

describe('Rater with callback', () => {
  const handleRate = jest.fn()
  const handleRating = jest.fn()
  const handleCancelRate = jest.fn()
  const rater = mount(
    <Rater
      onRate={handleRate}
      onRating={handleRating}
      onCancelRate={handleCancelRate}
    />
  )
  it('onRate will be called when user clicks star', () => {
    rater
      .find('.react-rater')
      .childAt(3)
      .simulate('click')
    expect(handleRate).toHaveBeenCalled()
  })
  it('onRating will be called when mouse moves on stars', () => {
    rater
      .find('.react-rater')
      .childAt(2)
      .simulate('mouseover')
    rater
      .find('.react-rater')
      .childAt(3)
      .simulate('mouseover')
    expect(handleRating).toHaveBeenCalled()
    expect(handleRating.mock.calls.length).toBe(2)
  })
  it('onCancelRate will be called when mouse moves out from rater', () => {
    rater.find('.react-rater').simulate('mouseout')
    expect(handleCancelRate).toHaveBeenCalled()
  })
})
