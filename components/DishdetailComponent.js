import React,{Component} from 'react';
import {View,Text,ScrollView,FlatList,Button,Modal,StyleSheet} from 'react-native';
import{Card,Rating,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';
const mapStateToProps = state =>{
    return{
        dishes : state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}
const input = React.createRef();
const inpt = React.createRef();
const mapDispatchToProps = dispatch => (
    {
        postFavorite : (dishId) => dispatch(postFavorite(dishId))
    }
)
function RenderDish(props){
    const dish = props.dish;

    if(dish != null){
        return(
            <Card
            featuredTitle = {dish.name}
            image = {{uri: baseUrl + dish.image}}
            >
                <Text style = {{margin : 10}}>
                    {dish.description}
                </Text>
            
            <Icon 
            raised 
            reverse
            name = {props.favorite ? 'heart' : 'heart-o'}
            type = 'font-awesome'
            color = '#f50'
            onPress = {() => props.favorite ? console.log('Already favorite'): props.onPress()}
            size = {20}
            />
           
           <Icon 
            raised 
            reverse
            name = 'pencil'
            type = 'font-awesome'
            color = '##512DA8'
            onPress = {() => props.modal()}
            size = {20}
            />
            
            </Card>
        );
    }
    else{
        return(<View></View>)
    }
}
function RenderComments(props){
    const comments = props.comments;
    const comment = props.comment;
    const rating = props.rating;
    const renderCommentitem = ({item,index}) => {
        return(
       <View key = {index} style = {{margin : 10}}>
           <Text style = {{fontSize : 14}}>{item.comment}</Text>
           <Text style = {{fontSize : 12}}>{item.rating} Stars</Text>
           <Text style = {{fontSize : 12}}>{'--' + item.author + ',' + item.date}</Text>
           </View>
        );
    }
   
    const a = Object.values(comment)[0];
    const b = Object.values(rating)[0];
    return (
        <Card  title = "Comments" >
            <FlatList
            data = {comments}
            renderItem = {renderCommentitem}
            keyExtractor = {item => item.id.toString()}
            />
            <Text style = {{fontSize : 14}} > {a} </Text>
            <Text style = {{fontSize : 14}} > {b} star </Text>
           
        </Card>
        
    );
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            rating : 1,
            author : '',
            comment : 'm',
            showModal : false
        }
    }
    toggleModal(){
        this.setState({showModal : !this.state.showModal});
   }
   clear(){
       input.current.clear();
       input.current.clear();
       console.log(this.state.comment);
   }
   resetForm(){
    this.setState({
        rating : 1,
        author : '',
        comment : ''
    });
}
mk(){
    const comm = this.state.comment;
       return ({comm});
}
sk(){
    const rat = this.state.rating;
       return ({rat});
}
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    static navigationOptions = {
        title : 'Dish Details'
    }
    render(){ 
        const dishId = this.props.navigation.getParam('dishId','');
return (
      <ScrollView>
      <RenderDish dish = { this.props.dishes.dishes[+dishId]}
      favorite = {this.props.favorites.some(el => el === dishId)}
      onPress = {()=> this.markFavorite(dishId)}
      modal   = {()=> this.toggleModal()}
      />
       <Modal
              animationType = {'slide'}
              transparent = {false}
              visible = {this.state.showModal}
              onDismiss = {() => {this.toggleModal()}}
              onRequestClose = {() => {this.toggleModal()}}
              >
                  <View style = {styles.formRow}>
                     
                    <Rating 
                    type = 'star'
                    ratingCount = {5}
                    startingValue = {this.state.rating}
                    imageSize = {50}
                    showRating
                    ratingColor = 'red'
                    onFinishRating = {(rating)=>this.setState({rating : rating})}
                    />
                    </View>
                    <View style = {styles.formRow}>
                    <Input
                    ref = {input}
                    placeholder = "Author"
                    leftIcon = {{type: 'font-awesome',name : 'user'}}
                    style = {styles}
                    onChangeText = {value => this.setState({author : value})}
                    />
                    </View>
                    <View style = {styles.formRow}>
                    <Input
                    ref = {inpt}
                    placeholder = "Comment"
                    leftIcon = {{type: 'font-awesome',name : 'comment'}}
                    style = {styles}
                    onChangeText = {value => this.setState({comment : value /*+ Date.now()*/})}
                    />
                    </View>
                    <View style = {styles.formRow}>
                      <Button 
                      onPress = {() => {this.toggleModal(); this.mk() ; this.rating ; this.clear()}}
                      color = '#512DA8'
                      title = 'SUBMIT'
                      />
                  </View>
                    <View style = {styles.formRow}>
                      <Button 
                      onPress = {() => {this.toggleModal(); this.resetForm();this.clear()}}
                      color = '#808080'
                      title = 'CANCEL'
                      />
                  </View>
                      
                 </Modal>
      <RenderComments comments = {this.props.comments.comments.filter((comment)=> comment.dishId = dishId)} comment = {this.mk()} rating = {this.sk()}/>
      </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
    formRow:{
        alignItems : 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection : 'row',
        margin: 20
    },
    formLabel:{
        fontSize : 18,
        flex : 2
    },
    formItem : {
        flex : 1
    },
     modal : {
         justifyContent : 'center',
         margin : 20
     },
     modalTitle : {
         fontSize : 24,
         fontWeight : 'bold',
         backgroundColor : '#512DA8',
         textAlign : 'center',
         color : 'white',
         marginBottom : 20

     },
     modalText : {
         fontSize : 18,
         margin : 10
     }
});

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);