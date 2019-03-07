import React, { useState } from 'react'
import { withTheme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { Forecast, Mountain, Theme } from './App'
import classes from '*.module.scss'

const Resort: React.FC<{
  forecast: Forecast
  mountain: Mountain
  theme: Theme
}> = ({ forecast, mountain, theme }) => {
  const [expanded, setExpanded] = useState(false)

  const { newSnow, last48Hours, last7Days, weatherForecast } = forecast
  const { name, logoURLString } = mountain
  const todayForecast = weatherForecast.find(day => day.daycode === 0)
  const { dayDescription, forecastString, temperatureHigh } = todayForecast
    ? todayForecast
    : { dayDescription: '', forecastString: '', temperatureHigh: '' }

  const snowfallToHex = (forecast: Forecast): string => {
    const forecastFloat = Object.values(forecast).map(
      (snowfall: string): number => parseFloat(snowfall)
    )
    const [newSnow, last48Hours, last7Days] = forecastFloat
    let weightedSnowfall = newSnow * 1.5 + last48Hours + last7Days * 0.5
    weightedSnowfall = weightedSnowfall > 255 ? 255 : weightedSnowfall
    return Math.floor((weightedSnowfall / 36) * 255).toString(16)
  }

  const styles = createStyles({
    card: {
      backgroundColor: `${theme.palette.primary.light}${snowfallToHex(
        forecast
      )}`,
    },
    gridItem: {
      // width: '24vw',
    },
    cardHeader: {
      textAlign: 'center',
    },
    cardActionArea: {
      display: 'flex',
      flexDirection: 'column',
    },
    media: {
      height: 150,
      width: 150,
      marginLeft: -50,
      marginTop: -40,
    },
    expand: {
      transform: expanded ? `rotate(180deg)` : 'rotate(0deg)',
      marginLeft: 'auto',
    },
  })

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={styles.gridItem}>
      <Paper>
        <Card style={styles.card}>
          <CardHeader title={name} style={styles.cardHeader} />
          {/* <CardActionArea style={styles.cardActionArea}> */}
          <CardContent>
            {/* <CardMedia
                style={styles.media}
                image={logoURLString || 'loading image...'}
                title={name}
              /> */}
            <List>
              <ListItem>
                <ListItemText primary={`${newSnow}"`} secondary="New Snow" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${last48Hours}"`}
                  secondary="48 Hours"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`${last7Days}"`} secondary="7 Days" />
              </ListItem>
            </List>
            {/* <List>
                <ListItem>
                  <ListItemText
                    primary={dayDescription}
                    secondary={forecastString}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`${temperatureHigh} °F`}
                    secondary="High"
                  />
                </ListItem>
              </List> */}
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <IconButton
              style={styles.expand}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" paragraph>
                {dayDescription}:
              </Typography>
              <Typography align="justify">{forecastString}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  )
}

export default withTheme()(Resort)
