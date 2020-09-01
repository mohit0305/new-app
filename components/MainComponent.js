import React,{Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
//import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import {View,Platform , Image,StyleSheet,ScrollView, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator,DrawerItems}  from 'react-navigation-drawer';
import {SafeAreaView}  from 'react-navigation';
import {createAppContainer}  from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import Contactus from './ContactComponent';
import Aboutus from './AboutComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
const MenuNavigator = createAppContainer(createStackNavigator({
    Menu : {screen : Menu,
    defaultNavigationOptions : ({navigation}) => ({
        headerLeft : <Icon name = 'list' size = {24}
        color = 'white'
        onpress = {()=> navigation.toggleDrawer()}
        />
    })},
    Dishdetail : {screen : Dishdetail}

},{
    initialRouteName : 'Menu',
    defaultNavigationOptions : {
        headerStyle : {
            backgroundColor : "#512DA8"
        },
        headerTintColor : "#fff",
        headerTitleStyle : {
            color : "#fff"
        }
    }
}));
const HomeNavigator = createAppContainer(createStackNavigator({
    Home : {screen : Home},
    Dishdetail : {screen : Dishdetail}
},{
    defaultNavigationOptions : ({navigation}) => ( {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        headerLeft : <Icon name = 'home' size = {24}
        color = 'white'
        onpress = {()=> navigation.toggleDrawer()}
        />
    })
}));
const ContactUsNavigator = createAppContainer(createStackNavigator({
    ContactUs : {screen : Contactus },
    Dishdetail : {screen : Dishdetail}
},{
    defaultNavigationOptions : ({navigation}) => ( {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        headerLeft : <Icon name = 'list' size = {24}
        color = 'white'
        onpress = {()=> navigation.toggleDrawer()}
        />
    })
}));
const AboutUsNavigator = createAppContainer(createStackNavigator({
    ContactUs : {screen : Aboutus },
    Dishdetail : {screen : Dishdetail}
},{
    defaultNavigationOptions : ({navigation}) => ( {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        headerLeft : <Icon name = 'info-circle' size = {24}
        color = 'white'
        onpress = {()=> navigation.toggleDrawer()}
        />
    })
}));
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
      <SafeAreaView style = {styles.container}
      forceInset = {{top : 'always',horizontal : 'never'}}>
          <View style = {styles.drawerHeader}>
              <View style = {{flex : 1}} >
                  <Image source = {require('./images/logo.png')}
                  style = {styles.drawerImage} />
              </View>
              <View style= {{flex : 2}}>
                  <Text style = {styles.drawerHeaderText} >Resturant</Text>
              </View>
          </View>
          <DrawerItems {...props} />
      </SafeAreaView>
  </ScrollView>
);
const MainNavigator = createAppContainer(createDrawerNavigator({
    Home : {
      screen : HomeNavigator,
    navigationOptions : {
          title : 'Home',
          drawerLabel : 'Home',
          drawerIcon : ({tintColor}) => (
              <Icon
              name = 'home'        
              size = {18}
              color = {tintColor}
              />
          )
      }
    },
    Menu : {

        screen : MenuNavigator,
        navigationOptions : {
            title : 'Menu',
            drawLabel : 'Menu',
            drawerIcon : ({tintColor}) => (
                <Icon 
                name = 'list'
                type = 'font-awesome'
                size = {24}
                color = {tintColor}
                />
            )
        }
    },
    ContactUs : {

    screen : ContactUsNavigator,
       navigationOptions : {
        title : 'Contact Us',
        drawLabel : 'Contact Us',
        drawerIcon : ({tintColor}) => (
            <Icon 
            name = 'address-card'
            type = 'font-awesome'
            size = {22}
            color = {tintColor}
            />
        ) 
    }
},
     AboutUs : {

    screen : AboutUsNavigator,
    navigationOptions : {
        title : 'About Us',
        drawLabel : 'About Us' ,
        drawerIcon : ({tintColor}) => (
            <Icon 
            name = 'info-circle'
            type = 'font-awesome'
            size = {24}
            color = {tintColor}
            />
        )
    }
}
},
{
    drawerBackgroundColor : '#D1C4E9',
    contentComponent : CustomDrawerContentComponent
}));
class Main extends Component{ 
/*constructor(props) {
    super(props);
    this.state = {
        dishes : DISHES,
        selectedDish : null
    }
}
onDishSelect(dishId){
    this.setState({selectedDish : dishId});
}*/
render(){
    return(
        <View style = {{flex : 1/*, paddingTop : Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight*/}}>
        <MainNavigator />    
       {/* <Menu dishes = {this.state.dishes}
        onPress={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
    */ }
        </View>
    );
}
}
const styles = StyleSheet.create({
     container : {
         flex : 1
     },
     drawerHeader : {
         backgroundColor : '#512DA8',
         height : 140,
         alignItems : 'center',
         justifyContent : 'center',
         flex : 1,
         flexDirection : 'row'
     },
     drawerHeaderText : {
         color : 'white',
         fontSize : 24,
         fontWeight : 'bold'
     },
     drawerImage : {
         margin : 10,
         width : 80,
         height : 60
     }
 })

export default Main;