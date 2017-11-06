var React=require('react-native');
var { Image, CameraRoll }= React;
var styles=require('./style.js')

var PhotoBackDrop=React.createClass({
    getInitialState(){
        return { photoSource:null}
    },
    componentDidMount(){
        CameraRoll.getPhotos(
            {first:5},
            (data)=>{
                this.setState({
                    photoSource:{uri:data.edges[3].nod.image.uri}
                })
            },
            (error)=>{
                console.warn(error);
            }
        );
    },
    render(){
        return(
            <Image 
            style={styles.backdrop}
            source={this.state.photoSource}
            resizeMode='cover'>
            {this.props.children}
            </Image>
        )
    }
});

module.exports=PhotoBackDrop;