import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Card, Fab, CircularProgress, Typography, withStyles } from '@material-ui/core';
import { RefreshOutlined } from '@material-ui/icons'
import { geolocated } from "react-geolocated";
import { ScaleLoader, BounceLoader } from 'react-spinners'
import moment from 'moment'
import 'moment/locale/pt-br';
import clsx from 'clsx'

import ApiWeather from './Api'

const styles = theme => ({
    home: {
        minHeight: '100vh',
        background: '#8E2DE2',
        background: '-webkit-linear-gradient(to top, #4A00E0, #8E2DE2)',
        background: 'linear-gradient(to top, #4A00E0, #8E2DE2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'inherit'
    },
    backHome: {

    },
    defaultCard: {
        background: '#451db5',
        boxShadow: theme.shadows[4],
        padding: 20,
        borderRadius: 10

    },
    cardWeather: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10
    },
    cardCurrentWeather: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    currentDate: {
        color: '#fff',
        marginLeft: 10
    },
    refreshIcon: {
        background: 'red'
    }
})

const StyledFab = withStyles({
    root: {
        background: 'linear-gradient(to top, #4A00E0, #8E2DE2)',
        color: 'white',
        margin: 'auto',
        cursor: 'pointer'
    },
    label: {
        textTransform: 'capitalize',
    },
})(Fab);
const App = ({ classes, coords }) => {
    console.log('COORDS', coords)
    console.log('nav', navigator.geolocation)
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(() => {
        coords && getCurrentWeather(coords.latitude, coords.longitude)
    }, [coords])

    const getCurrentWeather = async (lat, long) => {
        try {
            const { data } = await ApiWeather.getCurrentWeather(lat, long)
            setCurrentWeather(data)
        } catch (error) {

        }
    }
    console.log('---->', currentWeather)
    return (
        <div className={classes.home}>
            <Grid container className={classes.backHome} justify='center' alignItems='center' spacing={2}>
                <Grid item xs={10} sm={8}>
                    {!coords && (
                        <Typography align='center' style={{color:'#FFF'}}>Habilite a localização !!</Typography>
                    )}
                    <Card className={clsx(classes.defaultCard)}>
                        <Grid container alignItems='center'>
                            <Grid item xs={10} sm={2}>
                                {currentWeather ? (
                                    <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} />
                                ) : (
                                        <BounceLoader color='#fff' />
                                    )}
                            </Grid>
                            <Grid item xs={10} sm={8}>
                                <Typography variant='h4' className={classes.currentDate}>
                                    {moment().format('dddd, HH:MM' )}
                                </Typography>
                                <Typography variant='h6' className={classes.currentDate}>
                                    {currentWeather ? (
                                        currentWeather.weather[0].description.toUpperCase()
                                    ) :
                                        (
                                            <ScaleLoader
                                                color='#fff'
                                            />
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                <StyledFab onClick={e => {
                                    setCurrentWeather(null)
                                    getCurrentWeather(coords.latitude, coords.longitude)
                                }}>
                                    <RefreshOutlined />
                                    {/* <CircularProgress color='inherit'/> */}
                                </StyledFab>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={10} sm={8}>
                    <Grid container justify='space-between' alignItems='center' spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Card className={clsx(classes.cardCurrentWeather, classes.defaultCard)}>
                                {currentWeather ? (
                                    <Typography variant='h2' align='center'> {Math.round(currentWeather.main.temp)}ºC</Typography>
                                ) : (
                                        <ScaleLoader
                                            color='#fff'

                                        />
                                    )}
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card className={clsx(classes.cardWeather, classes.defaultCard)}>
                                {currentWeather ? (
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <Typography>{currentWeather.weather[0].main}</Typography>

                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography>Mín: {Math.round(currentWeather.main.temp_min)}º</Typography>
                                        </Grid> <Grid item xs={10}>
                                            <Typography>Máx: {Math.round(currentWeather.main.temp_max)}º</Typography>
                                        </Grid>
                                    </Grid>
                                ) : (
                                        <ScaleLoader
                                            color='#fff'
                                        />
                                    )}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
};

export default withStyles(styles, {})(geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(App))
// export default withStyles(styles, {})(App)
