import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ClippingRectangle,
} from "react-native";
import FilmList from "./FilmList";
import { connect } from "react-redux";
import { getFilmsNew } from "../API/TMDBApi";

class NewFilms extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
    this._loadFilms = this._loadFilms.bind(this);
  }

  _loading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  sortFilms = () => {
    const temp = this.state.films;
    temp.sort((a, b) => {
      return a.release_date < b.release_date ? 1 : -1;
    });
  };

  _loadFilms = () => {
    this.setState({ isLoading: true });

    getFilmsNew(this.page + 1).then((data) => {
      this.page = data.page;
      this.totalPages = data.total_pages;

      this.setState({
        films: [...this.state.films, ...data.results],
        isLoading: false,
      });
    });
    /* this.state.temp = this.state.films
        this.sortFilms()
        console.log(this.state.temp)  */
    //sort((a, b) => { a.release_date > b.release_date })
  };

  componentDidMount() {
    this._loadFilms();
  }

  render() {
    this.sortFilms();
    /* console.log("newFilms");
    console.log(temp); */
    //console.log(films[0].title);
    return (
      <FilmList
        films={this.state.films}
        navigation={this.props.navigation}
        loadFilms={this._loadFilms}
        page={this.page}
        totalPages={this.totalPages}
        favoriteList={false}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default NewFilms;
