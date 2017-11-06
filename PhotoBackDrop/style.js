import React from 'react';
import { StyleSheet, Dimensions }from 'react-native';

var {height, width} = Dimensions.get('window');
var styles=StyleSheet.create({
    backdrop:{
        width,
        height,
    },
    button:{
        flex:1,
        margin:100,
        alignItems:'center'
    }
});

module.exports=styles;