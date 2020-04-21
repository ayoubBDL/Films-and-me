import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Search from '../components/Search';
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites';
import Test from '../components/Test'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
    },
};

function StackNav() {
    return (

        <Stack.Navigator>

            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title: 'Search',
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#c759f7'
                    },
                    HeaderBackground: {
                        source: require('../images/backgrd.jpg')
                    }
                }}
            />
            <Stack.Screen
                name="FilmDetail"
                component={FilmDetail}
                options={{
                    title: 'Film\'s Detail',
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#574bdd'
                    }
                }}
            />

        </Stack.Navigator>
    )
}

function Fav() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: 'Favorites',
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#812DFF'
                    }
                }}
            />
            <Stack.Screen
                name="FilmDetail"
                component={FilmDetail}
                options={{
                    title: 'Film\'s Detail',
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#574bdd'
                    }
                }}
            />
        </Stack.Navigator>
    )
}

function test() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Test"
                component={Test}

            />
        </Stack.Navigator>
    )
}

function MainStackNavigator() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Search') {
                            iconName = require('../images/ic_search.png')
                        } else if (route.name === 'Favorites') {
                            iconName = require('../images/ic_favorite.png')
                        }

                        // You can return any component that you like here!
                        return <Image
                            source={iconName}
                            style={styles.icon}
                        />;
                    },
                })}
                tabBarOptions={{
                    activeBackgroundColor: '#cea9fe', // Couleur d'arrière-plan de l'onglet sélectionné
                    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
                    showLabel: false, // On masque les titres
                    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
                }}
            >
                <Tab.Screen
                    name="Search"
                    component={StackNav}
                />
                <Tab.Screen
                    name="Favorites"
                    component={Fav}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    },
    share_touchable_headerrightbutton: {
        marginRight: 8,

    }
})

export default MainStackNavigator    