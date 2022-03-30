import { render, screen } from '@testing-library/react';
import App from './App';
import {ucwords} from './utils/fontHandler'

test('Testing Uppercase First Char', ()=> {
  expect(ucwords('test')).toBe('Test')
})