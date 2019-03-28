export interface Forecast {
  resortID: number
  newSnow: string
  last48Hours: string
  last7Days: string
  weightedSnowfall: number
  mountain: Mountain | undefined
  weatherForecast: [
    {
      daycode: number
      dayDescription: string
      forecastString: string
      iconName: string
      summaryDescription: string
      temperatureHigh: string
      temperatureLow: string
    }
  ]
}

export interface Mountain {
  mountainID: number
  name: string
  logoURLString: string
}

export interface Theme {
  palette: {
    primary: { main: string; light: string; dark: string }
  }
}

export interface Classes {
  root: string
  menuButton: string
  title: string
  timestamp: string
}
