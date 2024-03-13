import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"
import Game from "../components/Game"
import Card from "../components/Card"

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

test('renders card with correct image and alt text', () => {
  const testProps = {
    code: 'AC',
    image: 'test_image_url',
    value: 'Ace',
    suit: 'Hearts',
  };

  const { getByAltText } = render(<Card {...testProps} />);

  const cardImage = getByAltText(`${testProps.value} of ${testProps.suit}`);
  expect(cardImage).toBeInTheDocument();
  expect(cardImage).toHaveAttribute('src', testProps.image);
});




