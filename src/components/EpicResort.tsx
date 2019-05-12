import React, { useState } from 'react'
import { withTheme, createStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
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

const EpicResort: React.FC<{
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

  const snowfallToHex = (): string =>
    Math.floor((weightedSnowfall / maxWeightedSnowfall) * 255).toString(16)

  const styles = createStyles({
    card: {
      backgroundColor: `${theme.palette.primary.light}${snowfallToHex()}`,
    },
    gridItem: {
      padding: useMediaQuery('(max-width:600px)') ? '8px 0px' : '8px 8px',
    },
    avatar: {
      width: 100,
      height: 100,
    },
    forecastToday: {
      height: 250,
    },
    weatherToday: {
      maxWidth: 225,
    },
    expand: {
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      marginLeft: 'auto',
      marginTop: 'auto',
    },
  })

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={styles.gridItem}>
      <Paper>
        <Card style={styles.card}>
          <CardHeader
            title={<Typography variant="h4">{name}</Typography>}
            disableTypography
            avatar={
              <Avatar
                src={logoURLString.replace('http', 'https')}
                alt="resort logo"
                style={styles.avatar}
              />
            }
          />
          <CardContent style={styles.forecastToday}>
            <Grid container justify="space-around">
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={`${newSnow}"`}
                      secondary="New Snow"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`${last48Hours}"`}
                      secondary="48 Hours"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`${last7Days}"`}
                      secondary="7 Days"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item style={styles.weatherToday}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={weatherForecast[0].summaryDescription}
                      secondary="Weather"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`${weatherForecast[0].temperatureHigh} °F`}
                      secondary="High"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`${weatherForecast[0].temperatureLow} °F`}
                      secondary="Low"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ bottom: 0 }}>
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
              <Grid container>
                {weatherForecast.map(dayForecast => (
                  <Grid item key={dayForecast.daycode}>
                    <Typography variant="h6">
                      {dayForecast.dayDescription}
                    </Typography>
                    <Typography align="justify" paragraph>
                      {dayForecast.forecastString}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  )
}

export default withTheme()(EpicResort)
