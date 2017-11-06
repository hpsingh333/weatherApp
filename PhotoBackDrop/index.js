import React from 'react';
import {
    Image,
    ImagePickerIOS
} from 'react-native';
import styles from './style';
import Button from '../Button/index';
const flImage=require('../src/images/flowers.jpeg');

export default class PhotoBackDrop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            photoSource:flImage
        }
    }
    _pickImage(){
        ImagePickerIOS.openCameraDialog({},
        (data)=>{
            this.setState({photoSource:{uri:data}});
        },
        ()=>{console.log('User cancelled the action')}
        )
    }
    render(){
        return(
            <Image 
                style={styles.backdrop}
                source={flImage}
                resizeMode='cover'>
                {this.props.children}
                <Button 
                    style={styles.button}
                    label="Load Image"
                    onPress={this._pickImage}/>
                </Image>
        )
    }
};