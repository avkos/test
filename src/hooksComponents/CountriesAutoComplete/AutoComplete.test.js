import { render, screen } from '@testing-library/react'
import AutoComplete from './index'

test('renders text field', () => {
  render(<AutoComplete/>)
  const TextInput = screen.getByPlaceholderText(/Countries/i)
  expect(TextInput).toBeInTheDocument()
})
