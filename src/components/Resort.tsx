import React from 'react'
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
import { Forecast, Mountain, Theme } from './App'

const Resort: React.SFC<{
  forecast: Forecast
  mountain: Mountain
  theme: Theme
}> = ({ forecast, mountain, theme }) => {
  const { newSnow, last48Hours, last7Days } = forecast
  const { name, logoURLString } = mountain

  const styles = createStyles({
    card: {
      backgroundColor: `${theme.palette.secondary.main}${(+last48Hours / 12) *
        100}`
    },
    gridItem: {
      width: '24vw'
    },
    cardActionArea: {
      display: 'flex',
      flexDirection: 'column'
    },
    media: {
      height: 150,
      width: 150,
      marginLeft: -50,
      marginTop: -40
    }
  })
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={styles.gridItem}>
      <Paper>
        <Card style={styles.card}>
          <CardActionArea style={styles.cardActionArea}>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CardMedia
                      style={styles.media}
                      image={logoURLString}
                      title={name}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
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
          </CardActionArea>
        </Card>
      </Paper>
    </Grid>
  )
}
export default withTheme()(Resort)
