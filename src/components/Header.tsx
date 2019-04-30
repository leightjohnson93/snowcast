import React from 'react'
const { Offline, Online } = require('react-detect-offline')
import epicLogo from '../images/epic.png'
import ikonLogo from '../images/ikon.png'
import { distanceInWordsToNow } from 'date-fns'
import { Classes } from '../interfaces'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 6,
  },
  title: {
    flexGrow: 1,
    ['@media(max-width:600px)']: {
      display: 'none',
    },
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
  input: {
    color: '#85f3ff',
  },
  logo: {
    height: 55,
    // width: 180,
  },
}

const ButtonAppBar: React.FC<{
  classes: Classes
  updateTime: Date | null
  sortBy: string
  setSortBy: Function
}> = ({ classes, updateTime, sortBy, setSortBy }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          SnowCast
        </Typography>
        <Button>
          <img src={epicLogo} className={classes.logo} />
        </Button>
        <Button>
          <img src={ikonLogo} className={classes.logo} />
        </Button>
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
        <FormControl>
          <InputLabel focused>Sort</InputLabel>
          <Select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            input={<FilledInput name="sort" style={styles.input} />}
          >
            <MenuItem value="snowfall">Snowfall</MenuItem>
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  </div>
)

export default withStyles(styles)(ButtonAppBar)
