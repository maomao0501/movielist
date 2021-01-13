import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../components/header";
import Menu from "../components/menu";
import Content from "../components/content";

import store from "../store";
import {
  getlist,
  likeonemovie,
  blockonemovie,
  deleteonemovie,
  //menu
  showhome,
  showmovie,
  showlikelist,
  showblocklist,
  //navbar
  titleorder,
  rateorder,
  voteorder,
  releaseorder,
  open,
  close,
  getpage,
  nextpage,
  prepage
} from "../store/actionCreator";

class Movie extends Component {
  componentDidMount = () => {
    const action = getlist();
    store.dispatch(action);
  };

  render() {
    const { movielist, showlist, likelist, blocklist } = this.props;
    return (
      <div>
        <Header handleOpen={this.props.handleOpen} />
        <hr />
        <Menu
          menuOpen={this.props.menuOpen}
          handleClose={this.props.handleClose}
          handledrop={this.props.handledrop}
          handleHome={this.props.handleHome}
          handleMovie={this.props.handleMovie}
          handleLikelist={this.props.handleLikelist}
          handleBlocklist={this.props.handleBlocklist}
        />
        <hr />
        <Content
          handleTitleOrder={this.props.handleTitleOrder}
          handleRateOrder={this.props.handleRateOrder}
          handleVoteOrder={this.props.handleVoteOrder}
          handleDateOrder={this.props.handleDateOrder}
          movielist={movielist}
          showlist={showlist}
          likelist={likelist}
          blocklist={blocklist}
          handleLike={this.props.handleLike}
          handleBlock={this.props.handleBlock}
          handleDelete={this.props.handleDelete}
          handleNextPage={this.props.handleNextPage}
          handlePrePage={this.props.handlePrePage}
          page={this.props.page}
          totalpage={this.props.totalpage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moviedatabase: state.moviedatabase,
    movielist: state.newMovieList,
    showlist: state.showlist,
    likelist: state.likelist,
    blocklist: state.blocklist,
    title_order: state.title_order,
    rate_order: state.rate_order,
    vote_order: state.vote_order,
    date_order: state.date_order,
    page: state.page,
    totalpage: state.totalpage,
    pageURL: state.pageURL,
    menuOpen: state.menuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //content

    handleLike(key) {
      const action = likeonemovie(key);
      dispatch(action);
    },

    handleBlock(key) {
      const action = blockonemovie(key);
      dispatch(action);
    },

    handleDelete(key) {
      const action = deleteonemovie(key);
      dispatch(action);
    },

    //menu

    handleOpen() {
      const action = open();
      dispatch(action);
    },

    handleClose() {
      const action = close();
      dispatch(action);
    },

    handleHome() {
      const action = showhome();
      dispatch(action);
    },

    handleMovie() {
      const action = showmovie();
      dispatch(action);
    },

    handleLikelist() {
      const action = showlikelist();
      dispatch(action);
    },

    handleBlocklist() {
      const action = showblocklist();
      dispatch(action);
    },

    //NavBar
    handleTitleOrder() {
      const action = titleorder();
      dispatch(action);
    },

    handleRateOrder() {
      const action = rateorder();
      dispatch(action);
    },

    handleVoteOrder() {
      const action = voteorder();
      dispatch(action);
    },

    handleDateOrder() {
      const action = releaseorder();
      dispatch(action);
    },
    handleNextPage(page, totalpage) {
      const newpage = page + 1;
      if (newpage > totalpage) {
        const action = getpage(newpage);
        dispatch(action);
      } else {
        const action = nextpage();
        dispatch(action);
      }
    },

    handlePrePage() {
      const action = prepage();
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie);
