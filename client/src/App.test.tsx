/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Search/Search", () => () => {});
jest.mock("./components/Snapshot/Snapshot", () => () => {});
jest.mock("./components/WeatherInfo/WeatherInfo", () => () => {});
jest.mock("./components/Forecast/Forecast", () => () => {});

test("page renders", () => {
  const { container } = render(<App />);

  const page = container.getElementsByClassName("page");
  expect(page.length).toBe(1);
});
