import React, { useState } from 'react'
import { withTheme, createStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
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
import { Forecast, Mountain, Theme } from '../interfaces'

const Resort: React.FC<{
  forecast: Forecast
  mountain: Mountain
  theme: Theme
  maxWeightedSnowfall: number
}> = ({ forecast, mountain, theme, maxWeightedSnowfall }) => {
  const [expanded, setExpanded] = useState(false)
  const {
    newSnow,
    last48Hours,
    last7Days,
    weightedSnowfall,
    weatherForecast,
  } = forecast
  const { name, logoURLString } = mountain
  const todayForecast = weatherForecast.find(day => day.daycode === 0)
  const { dayDescription, forecastString, temperatureHigh } = todayForecast
    ? todayForecast
    : { dayDescription: '', forecastString: '', temperatureHigh: '' }

  const snowfallToHex = (): string =>
    Math.floor((weightedSnowfall / maxWeightedSnowfall) * 255).toString(16)

  const styles = createStyles({
    card: {
      backgroundColor: `${theme.palette.primary.light}${snowfallToHex()}`,
    },
    gridItem: {
      padding: useMediaQuery('(max-width:600px)') ? '8px 0px' : '8px 8px',
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
          <CardContent>
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
          </CardContent>
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
