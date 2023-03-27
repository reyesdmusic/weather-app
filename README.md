# weather-app

### Install npm packages

To install npm packages for root as well as client and server:

- `npm run install-all`

### Run Application

To run both client and server from root:

- `npm run dev`

### Run Unit Tests

To run Unit Tests, from root or client directory:

- `npm run test`
- Currently only a couple small client tests are running. More tests will need to be written.

### Accessibility considerations

Semantic HTML and appropriate header elements were used, descriptive aria-labels placed for icon buttons, focus outline on focusable elements, alert role on error message, contrast of 4.5:1 or greater for all text, fully keyboard navigable

### Dependencies

- [React](https://react.dev/)
- [Express](https://www.npmjs.com/package/express)
- [Axios](https://axios-http.com/docs/api_intro)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [react-autocomplete](https://www.npmjs.com/package/react-autocomplete)
- [react-icons](https://react-icons.github.io/react-icons/)
- [recharts](https://recharts.org/en-US/)
- [date-fns](https://date-fns.org/)

### Third Party API

Location and Weather data is fetched from [OpenWeatherMap](https://openweathermap.org/api)

- Currently utilzing the weather, four-day forecast, and location APIs

### Error Handling

The handleError utils in the client and server are placeholders for more robust implementations of error logging and monitoring

### Geolocation

[Geolocation.getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) used for geolocation

### Search Component

Supports search by location or zip. Utilizes [react-autocomplete](https://www.npmjs.com/package/react-autocomplete) for autocomplete. On keydown, a debounced fetch is made to the locations api to populate the location options in the dropdown. When user selects an option or submits, that location gets sent to the weather and forecast endpoints.

### Forecast Component

The forecast component utilizes [recharts](https://recharts.org/en-US/) to generate the data in a chart - displaying humidity and temparature data. Other data points can be added down the road.

### WeatherIcon

The WeatherIcon component is consumed by the WeatherInfo component. It's mapped to 18 different weather statuses, so that if the weather is "partly cloudy", for example, a "partly cloud" icon is rendered.
