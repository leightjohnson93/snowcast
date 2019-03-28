import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'firebase/firestore'
import firebase from '../firebase'
import Resort from './Resort'
import { Forecast, Mountain, Theme } from '../interfaces'
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
  const [updateTime, setUpdateTime] = useState<Date | null>(null)
  const [sortBy, setSortBy] = useState<string>('snowfall')

  useEffect(() => {
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/mountains.ashx'
    ).then(({ data }) => handleMountainData(data.mountains))
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/weather.ashx'
    ).then(({ data }) => handleForecastData(data.snowconditions))
  }, [])

  useEffect(() => {
    let sortedForecasts: Forecast[] = forecasts
    switch (sortBy) {
      case 'snowfall':
        sortedForecasts = forecasts.sort(
          (a: Forecast, b: Forecast): number =>
            b.weightedSnowfall - a.weightedSnowfall
        )
        break
      case 'temperature':
        sortedForecasts = forecasts.sort(
          (a: Forecast, b: Forecast): number =>
            parseInt(b.weatherForecast[0].temperatureHigh) -
            parseInt(a.weatherForecast[0].temperatureHigh)
        )
        break
      case 'name':
        const forecastsWithName = forecasts.map(forecast => ({
          ...forecast,
          mountain: mountains.find(
            mountain => mountain.mountainID === forecast.resortID
          ),
        }))
        sortedForecasts = forecastsWithName.sort(
          (a: any, b: any): number => {
            if (a.mountain.name < b.mountain.name) return -1
            if (a.mountain.name > b.mountain.name) return 1
            return 0
          }
        )
    }
    setForecasts(sortedForecasts)
  }, [sortBy])

  const addWeightedSnowfall = (snowconditions: Forecast[]): Forecast[] =>
    snowconditions
      .map((forecast: Forecast) => ({
        ...forecast,
        weightedSnowfall:
          parseInt(forecast.newSnow) * 1.5 +
          parseInt(forecast.last48Hours) +
          parseInt(forecast.last7Days) * 0.5,
      }))
      .sort(
        (a: Forecast, b: Forecast): number =>
          b.weightedSnowfall - a.weightedSnowfall
      )

  const handleForecastData = async (snowconditions: Forecast[]) => {
    let data = snowconditions
    snowconditions
      ? pushToFirebase(data, 'forecasts')
      : (data = await getDataFromFirebase('forecasts'))
    const forecastWithSnowfall = addWeightedSnowfall(data)
    setForecasts(forecastWithSnowfall)
  }

  const handleMountainData = async (mountains: Mountain[]) => {
    let data = mountains
    mountains
      ? pushToFirebase(data, 'mountains')
      : (data = await getDataFromFirebase('mountains'))
    setMountains(data)
  }

  const pushToFirebase = (
    data: (Forecast | Mountain)[],
    docName: 'mountains' | 'forecasts'
  ) => {
    const collection = firebase.firestore().collection('data')
    collection.doc(docName).set({ [docName]: data })
    if (docName === 'forecasts')
      collection.doc('timestamp').set({ timestamp: new Date() })
  }

  const getDataFromFirebase = (docName: 'mountains' | 'forecasts'): any => {
    const collection = firebase.firestore().collection('data')
    if (docName === 'forecasts')
      collection
        .doc('timestamp')
        .get()
        .then(date => setUpdateTime(date.data()!.timestamp.toDate()))
    return collection
      .doc(docName)
      .get()
      .then(doc => doc.data()![docName])
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header updateTime={updateTime} sortBy={sortBy} setSortBy={setSortBy} />
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
                (mountains[0] &&
                  mountains.find(
                    (mountain: Mountain) =>
                      mountain.mountainID === forecast.resortID
                  )) || { mountainID: 0, name: '', logoURLString: '' }
              }
            />
          ))}
      </Grid>
    </MuiThemeProvider>
  )
}

export default App
