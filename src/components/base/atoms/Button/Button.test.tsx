import React from 'react'

import { render } from '~/src/__tests__/utils'

import Button from './Button'

test('Button', () => {
  const { container } = render(<Button />)
  expect(container).toMatchSnapshot()
})
