import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableHighlight
}from 'react-native';
import styles from './style.js';

export default class Button extends React.Component{

    render(){
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={[styles.button,this.props.style]}>
                    <Text style={{fontSize:14, color:'white'}}>
                        {this.props.label}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
};

Button.PropTypes ={
    onPress:PropTypes.func,
    label: PropTypes.string
}