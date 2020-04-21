// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import Fadein from '../animations/Fadein'

class FilmItem extends React.Component {

    _displayHeart = () => {
        if (this.props.isFilmFavorite) {
            return (
                <Image
                    source={require('../images/ic_favorite.png')}
                    style={styles.favoriteImage}
                />
            )
        }

    }
    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <Fadein>
                <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
                    <Image
                        source={{ uri: getImageFromApi(film.poster_path) }}
                        style={{ flex: 1, backgroundColor: 'gray', margin: 5 }}
                    />
                    <View style={{ flex: 2, alignContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', flex: 3 }}>
                            {this._displayHeart()}
                            <Text style={styles.title_text}>{film.title}</Text>
                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 23, color: '#666666', textAlign: 'right' }}>{film.vote_average}</Text>
                        </View>
                        <View style={{ flex: 7 }}><Text style={{ fontStyle: 'italic', color: '#666666' }} numberOfLines={6}>{film.overview}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', fontSize: 14 }}>Sortie le {film.release_date}</Text></View>
                    </View>

                </TouchableOpacity >
            </Fadein>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    title_text: {
        flex: 2,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        paddingRight: 5,
        fontSize: 20
    },
    favoriteImage: {
        marginTop: 6,
        marginRight: 3,
        width: 20,
        height: 20
    }
})

export default FilmItem