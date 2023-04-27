export function convertTemperature(temperature: any, toFarenheit: boolean) {
  if (toFarenheit) {
    return temperature * 1.8 + 32;
  } else {
    return temperature;
  }
}
