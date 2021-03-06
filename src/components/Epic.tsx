import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../Context'
import axios from 'axios'
import EpicResort from './EpicResort'
import { Forecast, Mountain } from '../interfaces'
import { CssBaseline, Grid } from '@material-ui/core'
import { createMuiTheme, createStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = createStyles({
  gridContainer: {
    width: '100vw',
    margin: 'auto',
  },
})

const Epic: React.FC = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([])
  const [mountains, setMountains] = useState<Mountain[]>([])
  const { sortBy } = useContext(Context)

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
      {!forecasts.length && <LinearProgress />}
      <Grid
        container
        spacing={16}
        justify="flex-start"
        style={styles.gridContainer}
      >
        {forecasts
          .sort(forecast =>
            localStorage.getItem(`Epic ${forecast.resortID}`) ? -1 : 1
          )
          .map((forecast: Forecast) => (
            <EpicResort
              key={forecast.resortID}
              forecast={forecast}
              maxWeightedSnowfall={Math.max.apply(
                Math,
                forecasts.map(forecast => forecast.weightedSnowfall)
              )}
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
