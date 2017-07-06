import React from 'react'
import { mount } from 'enzyme'
import Rater from '../src'

describe('Interactive rater: <Rater total={5} rating={2} />', () => {
  const rater = mount(<Rater total={5} rating={2} />)
  it('renders 5 stars(2 active)', () => {
    expect(rater.find('.react-rater').length).toEqual(1)
    expect(rater.find('a').length).toEqual(5)
    expect(rater.find('.is-active').length).toEqual(2)
  })
  it('renders 3 active stars when rate 3', () => {
    rater.find('.react-rater').childAt(2).simulate('click')
    expect(rater.find('.is-active').length).toEqual(3)
  })
})

describe('Readonly rater: <React rating={2} interactive={false} />', () => {
  const rater = mount(<Rater rating={2} interactive={false} />)
  it('render 2 active stars when rate 3', () => {
    rater.find('.react-rater').childAt(2).simulate('click')
    expect(rater.find('.is-active').length).toEqual(2)
  })
})
