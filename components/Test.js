import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
//import Hello from './Hello'

class Test extends React.Component {
    render() {
        return (
            <View style={styles.main}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        alignItems: "center"
    },
    subview_container: {
        ...Platform.select({
            ios: {
                backgroundColor: 'red',
                height: 30,
                width: 30
            },
            android: {
                backgroundColor: 'blue',
                height: 30,
                width: 30
            }
        })
    }
})

export default Test