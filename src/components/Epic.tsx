import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EpicResort from './EpicResort'
import { Forecast, Mountain } from '../interfaces'
import { CssBaseline, Grid } from '@material-ui/core'
import { createMuiTheme, createStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Header from './Header'

const styles = createStyles({
  gridContainer: {
    width: '100vw',
    margin: 'auto',
  },
})

const Epic: React.FC = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([])
  const [mountains, setMountains] = useState<Mountain[]>([])
  const [sortBy, setSortBy] = useState<string>('snowfall')

  useEffect(() => {
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/mountains.ashx'
    ).then(({ data }) => setMountains(data.mountains))
    axios(
      'https://cors-anywhere.herokuapp.com/http://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/weather.ashx'
    ).then(({ data }) => setForecasts(addWeightedSnowfall(data.snowconditions)))
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

  return (
    <>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      {!forecasts.length && <LinearProgress />}
      <Grid
        container
        spacing={16}
        justify="flex-start"
        style={styles.gridContainer}
      >
        {forecasts.map((forecast: Forecast) => (
          <EpicResort
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
    </>
  )
}

export default Epic
