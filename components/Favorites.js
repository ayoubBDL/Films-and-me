import React from 'react'
import { StyleSheet } from 'react-native'
import FilmList from '../components/FilmList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

    render() {
        //console.log("props nta3 filmlist")
        //console.log(this.props)
        return (
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={true}
            />
        )
    }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)
