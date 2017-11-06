import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
    Image,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import Forecast from './Forecast/index';
import LocationButton from './LocationButton/index';
import textStyles from './styles/typography.js';
import PhotoBackdrop from './PhotoBackDrop/index';
var STORAGE_KEY='@SmarterWeather:zip';
var WEATHER_API_KEY='bbeb34ebf60ad50f7893e7440a1e2b0b';

var API_STEM='http://api.openweathermap.org/data/2.5/weather?';
var {height, width} = Dimensions.get('window');

export default class WeatherProject extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          forecast: null,
          zip:''
        };
      }
    componentDidMount(){
        AsyncStorage.getItem(STORAGE_KEY).then((value)=>{
            if (value!==null){
                this._getForecastForZip(value);
            }
        }).catch((error)=> console.log('AsyncStorage error: '+error.message)).done();
    }
    
    _getForecastForZip = (zip) => {
        AsyncStorage.setItem(STORAGE_KEY,zip).then(()=> console.log('Saved selection to disk: '+zip)).catch((error)=> console.log('AsyncStorage error: '+error.message)).done();
        var url = `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
        this._getForecast(url);
    }

    _getForecastForCoords(lat,lon){
        this._getForecast(`${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`);
    }
    _getForecast(url,cb){
        this.toggleLoader(true);
        fetch(url)
        .then((response)=>response.json())
        .then((responseJSON)=>{
            console.log(responseJSON);
            this.toggleLoader(false);
            this.setState({
                forecast:{
                    main:responseJSON.weather[0].main,
                    description:responseJSON.weather[0].description,
                    temp:responseJSON.main.temp
                }
            });
        }).catch((error)=>{
            this.toggleLoader(false);
            console.warn(error);
        });
    }
    _handleTextChange = () => {
        const {zip} = this.state;
        this._getForecastForZip(zip);
    }


    toggleLoader = (isLoading) => {
        this.setState({
            isLoading
        })
    }

    renderLoader = () => {
        return !this.state.isLoading ? null : (
            <View style={styles.loader}>
                <ActivityIndicator color='gray' />
            </View>
        )
    }


    render(){
        var content= null;
        if(this.state.forecast!==null){
            content=(
                <View style={styles.row}>
                <Forecast
                main={this.state.forecast.main}
                description={this.state.forecast.description}
                temp={this.state.forecast.temp}/>
                </View>
            );
        }

        const {zip} = this.state;

        return (
            <PhotoBackdrop>
                <View style={styles.overlay}>
                    <View style={styles.row}>
                        <TextInput 
                            placeholder='Current weather for'
                            underlineColorAndroid='transparent'
                            style={styles.zipCode}
                            returnKeyType='go'
                            value={zip}
                            onChangeText = {(zip) => {this.setState({zip})}}
                            onSubmitEditing={this._handleTextChange}/>
                    </View>
                    <LocationButton onGetCoords={this._getForecastForCoords}/>
                    {content}
                </View>
                {this.renderLoader()}
            </PhotoBackdrop>
        );
    }
};

var styles=StyleSheet.create({
    overlay: {
        flex:1,
        paddingTop: 5,
        backgroundColor: 'rgba(0,0,0,0.65)',
        alignItems:'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
        },
    zipCode: {
        flex:1,
        height:50,
        backgroundColor:'white',
        borderRadius:4,
        fontSize:16,
        padding:10,
        color:'#808080'
    },
    loader: {
        backgroundColor:'rgb(255,255,255)',
        position:'absolute',
        left:(width-40)/2,
        top:(height-40)/2,
        width:40,
        height:40,
        alignItems:'center',
        justifyContent: 'center'
    }
});