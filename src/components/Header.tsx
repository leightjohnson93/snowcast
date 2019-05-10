import React, { useContext } from 'react'
import { Context } from '../Context'
import epicLogo from '../images/epic.png'
import ikonLogo from '../images/ikon.png'
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
  },
  transparent: {
    opacity: 0.35,
    height: 55,
  },
}

const ButtonAppBar: React.FC<{
  classes: Classes

  sortBy: string
  setSortBy: Function
}> = ({ classes, sortBy, setSortBy }) => {
  const { pass, setPass } = useContext(Context)
  const isEpic = pass === 'epic'
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            SnowCast
          </Typography>

          <Button
            name="epic"
            disabled={isEpic}
            onClick={() => {
              setPass('epic')
            }}
          >
            <img
              src={epicLogo}
              className={isEpic ? classes.logo : classes.transparent}
            />
          </Button>
          <Button
            name="ikon"
            disabled={!isEpic}
            onClick={() => setPass('ikon')}
          >
            <img
              src={ikonLogo}
              className={!isEpic ? classes.logo : classes.transparent}
            />
          </Button>

          <Typography
            variant="h6"
            color="inherit"
            align={useMediaQuery('(max-width:450px)') ? 'center' : 'left'}
            className={classes.timestamp}
          />
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
}

export default withStyles(styles)(ButtonAppBar)
