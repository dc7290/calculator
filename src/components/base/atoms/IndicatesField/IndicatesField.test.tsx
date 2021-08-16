import React from 'react'

import { render } from '~/src/__tests__/utils'

import IndicatesField from './IndicatesField'

test('IndicatesField', () => {
  const { container } = render(<IndicatesField />)
  expect(container).toMatchSnapshot()
})
