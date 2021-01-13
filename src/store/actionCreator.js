import axios from "axios";
import {
  INIT,
  SHOW_MOVIE,
  SHOW_HOME,
  SHOW_LIKE,
  SHOW_BLOCK,
  LIKE_ONE_MOVIE,
  BLOCK_ONE_MOVIE,
  DELETE_ONE_MOVIE,
  TITLE_ORDER,
  RATE_ORDER,
  VOTE_ORDER,
  RELEASE_ORDER,
  OPEN,
  CLOSE,
  FETCH_NEXT_PAGE,
  PRE_PAGE,
  NEXT_PAGE
} from "./actionTypes";

export const init = getlist => ({
  type: INIT,
  getlist
});

export const showmovie = () => ({
  type: SHOW_MOVIE
});
export const showhome = () => ({
  type: SHOW_HOME
});

export const likeonemovie = key => ({
  type: LIKE_ONE_MOVIE,
  key
});

export const blockonemovie = key => ({
  type: BLOCK_ONE_MOVIE,
  key
});

export const deleteonemovie = key => ({
  type: DELETE_ONE_MOVIE,
  key
});

export const showlikelist = () => ({
  type: SHOW_LIKE
});

export const showblocklist = () => ({
  type: SHOW_BLOCK
});

export const titleorder = () => ({
  type: TITLE_ORDER
});

export const rateorder = () => ({
  type: RATE_ORDER
});
export const voteorder = () => ({
  type: VOTE_ORDER
});

export const releaseorder = () => ({
  type: RELEASE_ORDER
});

export const close = () => ({
  type: CLOSE
});

export const open = () => ({
  type: OPEN
});

export const getlist = () => {
  const getlist = [];
  return dispatch => {
    axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=a1d1ff94c90b6204d361915f05abf298&language=en-US&page=1`
    ).then(res => {
      const data = res.data.results;
      //0:title, 1:rate-count, 2:vote-avg, 3:release_date, 4:picture, 5:content,
      for (let i = 0; i < data.length; i++) {
        const newlist = [];
        newlist.push(data[i].original_title);
        newlist.push(data[i].vote_count);
        newlist.push(data[i].vote_average);
        newlist.push(data[i].release_date);
        newlist.push(data[i].backdrop_path);
        newlist.push(data[i].overview);
        getlist.push(newlist);
      }
      // console.log(movielist);
      const action = init(getlist);
      dispatch(action);
    });
  };
};

export const getpage = newpage => {
  const getlist = [];
  return dispatch => {
    axios(
      "https://api.themoviedb.org/3/movie/popular?api_key=2d08b6e8ded8ca105d434db0e2535dd8&language=en-US&page=" +
        newpage
    ).then(res => {
      const data = res.data.results;
      //0:title, 1:rate-count, 2:vote-avg, 3:release_date, 4:picture, 5:content,
      for (let i = 0; i < data.length; i++) {
        const newlist = [];
        newlist.push(data[i].original_title);
        newlist.push(data[i].vote_count);
        newlist.push(data[i].vote_average);
        newlist.push(data[i].release_date);
        newlist.push(data[i].backdrop_path);
        newlist.push(data[i].overview);
        getlist.push(newlist);
      }
      // console.log(movielist);
      const action = fetchnextpage(getlist);
      dispatch(action);
    });
  };
};

export const fetchnextpage = getlist => ({
  type: FETCH_NEXT_PAGE,
  getlist
});
export const nextpage = () => ({
  type: NEXT_PAGE
});

export const prepage = () => ({
  type: PRE_PAGE
});
