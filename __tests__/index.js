import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rater from '../src'

Enzyme.configure({ adapter: new Adapter() })

describe('Interactive rater: <Rater total={5} rating={2} />', () => {
  const rater = mount(<Rater total={5} rating={2} />)
  it('renders 5 stars(2 active)', () => {
    expect(rater.find('.react-rater').length).toEqual(1)
    expect(rater.find('div.star').length).toEqual(5)
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
