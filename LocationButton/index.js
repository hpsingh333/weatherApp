import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './style';
import Button from '../Button/index';
// var styles=require('./style.js');
// var Button=require('./../Button');

export default class LocationButton extends Component{
    _onPress = () => {
        navigator.geolocation.getCurrentPosition(
            (initialPosition)=>{
                this.props.onGetCoords(initialPosition.coords.latitude, initialPosition.coords.longitude);
            },
            (error)=>{alert(error.message)},
            {enableHighAccuracy: true, timeout:20000, maximumAge: 1000}
        );
    }

    render(){
        return (
            <Button label="Use Current Location" style={styles.locationButton} onPress={this._onPress}/>
        )
    }
}

LocationButton.propTypes= {
    onGetCoords: PropTypes.func.isRequired
}