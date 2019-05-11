import React, { useState, useEffect } from 'react'
import Header from './Header'
import IkonResort from './IkonResort'
import axios from 'axios'
import { Resort } from '../interfaces'
import { createMuiTheme, createStyles } from '@material-ui/core/styles'
import { CssBaseline, Grid } from '@material-ui/core'

const styles = createStyles({
  gridContainer: {
    width: '100vw',
    margin: 'auto',
  },
})

const Ikon = () => {
  const [resorts, setResorts] = useState<Resort[]>([])
  const [sortBy, setSortBy] = useState<string>('snowfall')

  useEffect(() => {
    axios(
      'https://skiapp.onthesnow.com/app/widgets/resortlist?region=us&regionids=1542&language=en&pagetype=skireport'
    ).then(({ data }) =>
      setResorts(addWeightedSnowfall(shortenName(data.rows)))
    )
  }, [])

  const addWeightedSnowfall = (snowconditions: Resort[]): Resort[] =>
    snowconditions
      .map((resort: Resort) => ({
        ...resort,
        weightedSnowfall: resort.pastSnow.snow0day + resort.pastSnow.sum3 * 0.5,
      }))
      .sort(
        (a: Resort, b: Resort): number =>
          b.weightedSnowfall - a.weightedSnowfall
      )

  const shortenName = (snowconditions: Resort[]): Resort[] =>
    snowconditions.map((resort: Resort) => ({
      ...resort,
      name: resort.resort_name_short.split('-')[0],
    }))

  return (
    <>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      <Grid
        container
        spacing={16}
        justify="flex-start"
        style={styles.gridContainer}
      >
        {resorts.map((resort: Resort) => (
          <IkonResort
            key={resort.resort_id}
            resort={resort}
            maxWeightedSnowfall={resorts[0].weightedSnowfall}
          >
            {resort.pastSnow.sum3}
          </IkonResort>
        ))}
      </Grid>
    </>
  )
}

export default Ikon
