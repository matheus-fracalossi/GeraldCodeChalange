// Jest setup file

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-localize
jest.mock("react-native-localize", () => ({
  getLocales: () => [
    {
      countryCode: "US",
      languageTag: "en-US",
      languageCode: "en",
      isRTL: false,
    },
  ],
  getNumberFormatSettings: () => ({
    decimalSeparator: ".",
    groupingSeparator: ",",
  }),
  getCalendar: () => "gregorian",
  getCountry: () => "US",
  getCurrencies: () => ["USD"],
  getTemperatureUnit: () => "fahrenheit",
  getTimeZone: () => "America/New_York",
  uses24HourClock: () => false,
  usesMetricSystem: () => false,
  usesAutoDateAndTime: () => true,
  usesAutoTimeZone: () => true,
}));
