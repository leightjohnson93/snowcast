import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Resort from './Resort'
import { CssBaseline, Grid } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Header from './Header'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#98e6e6' },
    secondary: { main: '#dbffff' }
  }
})

const App: React.SFC = () => {
  const [forecast, setForecast] = useState([])
  const [mountains, setMountains] = useState([])

  useEffect(() => {
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/weather.ashx'
    ).then(({ data }) => setForecast(data.snowconditions))
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/mountains.ashx'
    ).then(({ data }) => setMountains(data.mountains))
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container spacing={16} justify="center">
        {forecast &&
          forecast.map((resort: Forecast) => (
            <Resort
              key={resort.resortID}
              forecast={resort}
              mountain={
                mountains.find(
                  (mountain: Mountain) =>
                    mountain.mountainID === resort.resortID
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
}

export interface Mountain {
  mountainID: number
  name: string
  logoURLString: string
}

export interface Theme {
  palette: {
    primary: { main: string }
    secondary: { main: string }
  }
}

export default App
