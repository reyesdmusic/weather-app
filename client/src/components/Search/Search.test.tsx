/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("search input should be shown", () => {
  const { container } = render(
    <Search setError={{}} setIsLoading={{}} setSnapshot={{}} setForecast={{}} />
  );
  const input = container.querySelector("input");
  expect(input).toBeTruthy();
});
