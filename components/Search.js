import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
//import films from '../helpers/filmData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmList from '../components/FilmList'
class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.searchedText = ""
        this.state = {
            films: [],
            isLoading: false,
        }
        this._loadFilms = this._loadFilms.bind(this)
    }
    _loadFilms = () => {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
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
    _searchTextInputChanged(text) {
        this.searchedText = text
    }
    _searchFilms = () => {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()

        })

    }

    render() {
        console.log(this.props)
        console.log(this.state.films)
        return (
            <View style={styles.main_container}>

                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Title of the film" />
                <View style={styles.butt}>
                    <Button title='Search' onPress={() => this._searchFilms()} color='#be34f9' />
                </View>

                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                />

                {this._loading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginTop: -19,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#c759f7',
        borderWidth: 1,
        paddingLeft: 5,
    },
    butt: {
        marginLeft: 5,
        marginRight: 5,
        color: '#cea9fe'
    },
    loading_container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Search