import React from 'react'
const { Offline, Online } = require('react-detect-offline')
import { distanceInWordsToNow } from 'date-fns'
import { Classes } from '../interfaces'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 6,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  timestamp: {
    padding: '10px 10px',
    flexGrow: 1,
    ['@media (max-width:600px)']: {
      fontSize: 14,
    },
  },
}

const ButtonAppBar: React.FC<{
  classes: Classes
  updateTime: Date | null
}> = ({ classes, updateTime }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.title}>
          SnowCast
        </Typography>
        <Typography
          variant="h6"
          color="inherit"
          align={useMediaQuery('(max-width:450px)') ? 'center' : 'left'}
          className={classes.timestamp}
        >
          <Online>
            {updateTime && `Updated ${distanceInWordsToNow(updateTime)} ago`}
          </Online>
          <Offline>Offline</Offline>
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>
)

export default withStyles(styles)(ButtonAppBar)
