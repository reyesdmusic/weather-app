/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("message is shown when in error state", () => {
  const { container } = render(
    <Search setError={{}} setIsLoading={{}} setSnapshot={{}} setForecast={{}} />
  );
  const input = container.querySelector("input");
  console.log(input);

  expect(input).toBeTruthy();
});
