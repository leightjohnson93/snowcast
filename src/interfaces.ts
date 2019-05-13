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

export interface Resort {
  resort_id: number
  pastSnow: {
    sum3: number
    snow0day: number
  }
  primaryRegion: {
    country: string
  }
  snowcone: {
    active_date_epoch: number
  }
  weightedSnowfall: number
  resort_name_short: string
  name: string
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
  logo: string
  transparent: string
}

export interface ContextInterface {
  pass: string
  setPass: Function
  sortList: string[]
  sortBy: string
  setSortBy: Function
}
