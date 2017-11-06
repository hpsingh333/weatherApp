import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import styles from '../styles/typography.js';

export default class Forecast extends Component{
 
    render(){
        return (
            <View style={forecastStyles.forecast}>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {((this.props.temp-32)*(5/9)).toFixed(2)} °C
                </Text>
            </View>
        );
    }
};

var forecastStyles=StyleSheet.create({
    forecast:{
        alignItems:'center'
    }
});