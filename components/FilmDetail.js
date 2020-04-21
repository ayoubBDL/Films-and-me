import React from 'react'
import { Share, StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity, Platform, Button } from 'react-native'
import { getFilmDetails, getImageFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Inout from '../animations/Inout'

class FilmDetail extends React.Component {
    // static navigationOptions = ({ route }) => {
    //     const { params } = route.params
    //     // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
    //     if (params.film != undefined && Platform.OS === 'ios') {
    //         return {
    //             // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
    //             headerRight: <TouchableOpacity
    //                 style={styles.share_touchable_headerrightbutton}
    //                 onPress={() => params.shareFilm()}>
    //                 <Image
    //                     style={styles.share_image}
    //                     source={require('../Images/ic_share.ios.png')} />
    //             </TouchableOpacity>
    //         }
    //     }
    // }

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
        this._shareFilm = this._shareFilm.bind(this)
    }

    // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
    // _updateNavigationParams() {
    //     this.props.navigation.setParams({
    //         shareFilm: this._shareFilm,
    //         film: this.state.film
    //     })
    // }


    componentDidMount() {
        // const { navigation, route } = this.props;
        // const { idFilm } = route.params.idFilm;
        getFilmDetails(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
        this.props.navigation.setOptions({
            shareFilm: this._shareFilm,
            film: this.state.film
        })

        // const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.idFilm)
        // if (favoriteFilmIndex !== -1) {
        //     this.setState({
        //         film: this.props.favoritesFilm[favoriteFilmIndex]
        //     }, () => { this._updateNavigationParams() })
        //     return
        // }

        // this.setState({ isLoading: true })
        // getFilmDetails(this.props.route.params.idFilm).then(data => {
        //     this.setState({
        //         film: data,
        //         isLoading: false
        //     }, () => { this._updateNavigationParams() })
        // })

    }

    _toggleFavorite = () => {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }
    componentDidUpdate = () => {
        //console.log('filmdetailllllll')
        //console.log(this.props.favoritesFilm)
        //this.displayFavoriteImage()
    }

    displayFavoriteImage = () => {
        var sourceImage = require('../images/ic_favorite_border.png')
        var enlarge = false
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../images/ic_favorite.png');
            enlarge = true

        }
        //console.log("llllll  ", enlarge)
        return (
            <Inout shouldEnlarge={enlarge}>
                <Image
                    source={sourceImage}
                    style={styles.favoriteImage}
                />
            </Inout>
        )
    }

    _displayFilm = () => {
        const film = this.state.film
        //console.log(film)
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>

                    <TouchableOpacity
                        style={styles.favoriteContainer}
                        onPress={() => { this._toggleFavorite() }}>
                        {this.displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Released in {moment(new Date(film.release_date)).format('MM/DD/YYYY')}</Text>
                    <Text style={styles.default_text}>Vote average : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Vote count : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }
    _loading = () => {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }

    _dsiplayFloatingActionButton() {
        this.props.navigation.setOptions({
            headerRight: () => {
                if (Platform.OS === 'android') {
                    return (
                        <TouchableOpacity
                            style={styles.share_touchable}
                            onPress={() => this._shareFilm()}
                        >
                            <Text style={{ color: '#10ECE7' }}>Share</Text>
                        </TouchableOpacity>
                    )
                }
                else if (Platform.OS === 'ios') {
                    return (
                        <TouchableOpacity
                            style={styles.share_touchable}
                            onPress={() => this._shareFilm()}
                        >
                            <Image
                                style={styles.share_image}
                                source={require("../images/ic_share.ios.png")}
                            />
                        </TouchableOpacity>
                    )
                }
            },
        });


    }

    render() {
        //const { navigation, route } = this.props;
        //const { idFilm } = route.params;
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                {this._loading()}
                {this._displayFilm()}
                {this._dsiplayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favoriteContainer: {
        alignItems: "center"
    },
    favoriteImage: {
        flex: 1,
        width: null,
        height: null
    },
    share_touchable: {
        position: 'absolute',
        top: 8,
        width: 40,
        height: 40,
        right: 10,
        bottom: 15,
        borderRadius: 30,

        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 20,
        height: 20
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
})
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail)