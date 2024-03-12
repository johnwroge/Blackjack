import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"
import Game from "../components/Game"

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

test("Renders the game", () => {
  render(<Game />)
  expect(true).toBeTruthy()
})


