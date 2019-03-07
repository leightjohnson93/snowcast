import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Resort from './Resort'
import { CssBaseline, Grid } from '@material-ui/core'
import {
  MuiThemeProvider,
  createMuiTheme,
  createStyles,
} from '@material-ui/core/styles'
import Header from './Header'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#8b85ff', light: '#85f3ff', dark: '#85ff91' },
  },
  typography: {
    useNextVariants: true,
  },
})

const styles = createStyles({
  gridContainer: {
    width: '100vw',
    margin: 'auto',
  },
})

const App: React.FC = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([])
  const [mountains, setMountains] = useState<Mountain[]>([])

  useEffect(() => {
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/weather.ashx'
    ).then(({ data }) => addWeightedSnowfallToForecast(data.snowconditions))
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/mountains.ashx'
    ).then(({ data }) => setMountains(data.mountains))
  }, [])

  const weightedSnowfall = (forecast: Forecast): number => {
    const forecastFloat = Object.values(forecast).map(
      (snowfall: string): number => parseFloat(snowfall)
    )
    const [newSnow, last48Hours, last7Days] = forecastFloat
    return newSnow * 1.5 + last48Hours + last7Days * 0.5
  }

  const addWeightedSnowfallToForecast = (snowconditions: any) => {
    const forecastWithSnowfall: Forecast[] = snowconditions
      .map((forecast: Forecast) => ({
        ...forecast,
        weightedSnowfall: weightedSnowfall(forecast),
      }))
      .sort((a: any, b: any): any => b.weightedSnowfall - a.weightedSnowfall)
    setForecasts(forecastWithSnowfall)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid
        container
        spacing={16}
        justify="center"
        style={styles.gridContainer}
      >
        {forecasts &&
          forecasts.map((forecast: Forecast) => (
            <Resort
              key={forecast.resortID}
              forecast={forecast}
              maxWeightedSnowfall={forecasts[0].weightedSnowfall}
              mountain={
                mountains.find(
                  (mountain: Mountain) =>
                    mountain.mountainID === forecast.resortID
                ) || { mountainID: 0, name: '', logoURLString: '' }
              }
            />
          ))}
      </Grid>
    </MuiThemeProvider>
  )
}

export interface Forecast {
  resortID: number
  newSnow: string
  last48Hours: string
  last7Days: string
  weightedSnowfall: number
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

export default App
