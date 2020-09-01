import React,{Component} from 'react';
import {ScrollView,Text} from 'react-native';
import {Card} from 'react-native-elements'; 
function RenderItem(props){
  
    return(
    <Card
    title = {`Contact Information`}
    titleStyle = {{fontSize : 25}}
    ><Text style = {{margin : 10},{fontSize : 18}}>
        121, Clear Water Bay Road{"\n"}{"\n"}
Clear Water Bay, Kowloon{"\n"}{"\n"}
HONG KONG{"\n"}{"\n"}
Tel: +852 1234 5678 {"\n"}{"\n"}
Fax: +852 8765 4321{"\n"}{"\n"}
Email:confusion@food.net</Text></Card> 
    );

}
class Contactus extends Component{
    static navigationOptions = {
        title : ''
    }
    render(){
        return(
       <ScrollView>
           <RenderItem
           />
       </ScrollView>
        );
    }
}


export default Contactus;