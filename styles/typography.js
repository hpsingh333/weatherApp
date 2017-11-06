import React from 'react';
import {StyleSheet} from 'react-native';

var baseFontSize=18;

var styles=StyleSheet.create({
    bigText:{
        fontSize:baseFontSize+8,
        color:'#FFFFFF'
    },
    mainText:{
        fontSize:baseFontSize,
        color:'white'
    }
});

styles['baseFontSize']=baseFontSize;

module.exports=styles;