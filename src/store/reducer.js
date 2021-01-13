import { v4 as uuidv4 } from "uuid";
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
  NEXT_PAGE,
  PRE_PAGE
} from "./actionTypes";
const initialstate = {
  showlist: "home", //home, movie, like, block
  moviedatabase: [],
  movielist: [],
  title_order: "ASC", //DES
  rate_order: "ASC",
  vote_order: "ASC",
  date_order: "ASC",
  newMovieList: [],
  likelist: [],
  blocklist: [],
  menuOpen: false,
  totalpage: 1,
  page: 1,
  pageURL: ""
};
const reducer = (state = initialstate, action) => {
  // const newState = JSON.parse(JSON.stringify(state));
  const newState = { ...state };
  if (action.type === INIT) {
    // for (let i = 0; i < action.getlist.length; i++) {
    //   newState.list.id = uuidv4();
    //   newState.list.title = action.getlist[i][0];
    //   newState.list.rate_count = action.getlist[i][1];
    //   newState.list.vote_avg = action.getlist[i][2];
    //   newState.list.release_date = action.getlist[i][3];
    //   newState.list.picture = action.getlist[i][4];
    //   newState.list.content = action.getlist[i][5];
    //   newState.list.like = 0;
    //   newState.movielist.push(newState.list)
    // }

    for (let i = 0; i < action.getlist.length; i++) {
      const newlist = [];
      // 0  id: uuidv4(),
      // 1  title: "", //movie name
      // 2  rate_count: "",
      // 3  vote_avg: "",
      // 4  release_date: "",
      // 5  picture: "", //url
      // 6  overview: "", //movie description
      // 7  like: "0" //-1, 0, 1
      newlist.push(uuidv4());
      newlist.push(action.getlist[i][0]);
      newlist.push(action.getlist[i][1]);
      newlist.push(action.getlist[i][2]);
      newlist.push(action.getlist[i][3]);
      newlist.push(action.getlist[i][4]);
      newlist.push(action.getlist[i][5]);
      newlist.push(0);
      newState.moviedatabase.push(newlist);
      newState.movielist.push(newlist);
    }
  }
  if (action.type === OPEN) {
    newState.menuOpen = true;
  }

  if (action.type === CLOSE) {
    newState.menuOpen = false;
  }

  if (action.type === SHOW_MOVIE) {
    newState.showlist = "movie";
    newState.newMovieList = newState.movielist.filter(item => item[7] !== -1);
  }

  if (action.type === SHOW_HOME) {
    newState.showlist = "home";
  }
  if (action.type === SHOW_LIKE) {
    newState.showlist = "like";
    newState.likelist = newState.movielist.filter(item => item[7] === 1);
    newState.blocklist = newState.movielist.filter(item => item[7] === -1);
  }
  if (action.type === SHOW_BLOCK) {
    newState.showlist = "block";
    newState.likelist = newState.movielist.filter(item => item[7] === 1);
    newState.blocklist = newState.movielist.filter(item => item[7] === -1);
  }

  if (action.type === LIKE_ONE_MOVIE) {
    newState.movielist.map(item => {
      if (item[0] === action.key) {
        item[7] = 1;
      }
      return item;
    });
    newState.likelist = newState.movielist.filter(item => item[7] === 1);
    newState.blocklist = newState.movielist.filter(item => item[7] === -1);
  }

  if (action.type === BLOCK_ONE_MOVIE) {
    newState.movielist.map(item => {
      if (item[0] === action.key) {
        item[7] = -1;
      }
      return item;
    });
    newState.likelist = newState.movielist.filter(item => item[7] === 1);
    newState.blocklist = newState.movielist.filter(item => item[7] === -1);
    newState.newMovieList = newState.movielist.filter(item => item[7] !== -1);
  }

  if (action.type === DELETE_ONE_MOVIE) {
    newState.movielist.map(item => {
      if (item[0] === action.key) {
        item[7] = 0;
      }
      return item;
    });
    newState.likelist = newState.movielist.filter(item => item[7] === 1);
    newState.blocklist = newState.movielist.filter(item => item[7] === -1);
  }

  if (action.type === TITLE_ORDER) {
    function ascend(x, y) {
      if (x[1][0] < y[1][0]) {
        return -1;
      }
      if (x[1][0] > y[1][0]) {
        return 1;
      }
      return 0;
    }

    function descend(x, y) {
      if (x[1][0] > y[1][0]) {
        return -1;
      }
      if (x[1][0] < y[1][0]) {
        return 1;
      }
      return 0;
    }
    if (newState.title_order === "ASC") {
      newState.newMovieList.sort(ascend);
      newState.title_order = "DES";
    } else {
      newState.newMovieList.sort(descend);
      newState.title_order = "ASC";
    }
  }

  if (action.type === RATE_ORDER) {
    function ascend(x, y) {
      return x[2] - y[2];
    }
    function descend(x, y) {
      return y[2] - x[2];
    }

    if (newState.rate_order === "ASC") {
      newState.newMovieList.sort(ascend);
      newState.rate_order = "DES";
    } else {
      newState.newMovieList.sort(descend);
      newState.rate_order = "ASC";
    }
  }

  if (action.type === VOTE_ORDER) {
    function ascend(x, y) {
      return x[3] - y[3];
    }
    function descend(x, y) {
      return y[3] - x[3];
    }

    if (newState.vote_order === "ASC") {
      newState.newMovieList.sort(ascend);
      newState.vote_order = "DES";
    } else {
      newState.newMovieList.sort(descend);
      newState.vote_order = "ASC";
    }
  }

  if (action.type === RELEASE_ORDER) {
    function ascend(x, y) {
      return x[4] < y[4] ? 1 : -1;
    }
    function descend(x, y) {
      return x[4] > y[4] ? 1 : -1;
    }

    if (newState.date_order === "ASC") {
      newState.newMovieList.sort(ascend);
      newState.date_order = "DES";
    } else {
      newState.newMovieList.sort(descend);
      newState.date_order = "ASC";
    }
  }

  if (action.type === FETCH_NEXT_PAGE) {
    for (let i = 0; i < action.getlist.length; i++) {
      const newlist = [];
      // 0  id: uuidv4(),
      // 1  title: "", //movie name
      // 2  rate_count: "",
      // 3  vote_avg: "",
      // 4  release_date: "",
      // 5  picture: "", //url
      // 6  overview: "", //movie description
      // 7  like: "0" //-1, 0, 1
      newlist.push(uuidv4());
      newlist.push(action.getlist[i][0]);
      newlist.push(action.getlist[i][1]);
      newlist.push(action.getlist[i][2]);
      newlist.push(action.getlist[i][3]);
      newlist.push(action.getlist[i][4]);
      newlist.push(action.getlist[i][5]);
      newlist.push(0);
      newState.moviedatabase.push(newlist);
    }

    newState.page = newState.page + 1;
    const p = (newState.page - 1) * 20;
    newState.movielist = newState.moviedatabase.slice(p, p + 20);
    newState.newMovieList = newState.movielist.filter(item => item[7] !== -1);
    newState.totalpage = newState.totalpage + 1;
    console.log(newState.movielist);
  }

  if (action.type === NEXT_PAGE) {
    newState.page = newState.page + 1;
    const p = (newState.page - 1) * 20;
    newState.movielist = newState.moviedatabase.slice(p, p + 20);
    newState.newMovieList = newState.movielist.filter(item => item[7] !== -1);
  }

  if (action.type === PRE_PAGE) {
    newState.page = newState.page - 1;
    if (newState.page === 0) {
      newState.page = 1;
    } else {
      const p = (newState.page - 1) * 20;
      newState.movielist = newState.moviedatabase.slice(p, p + 20);
      newState.newMovieList = newState.movielist.filter(item => item[7] !== -1);
    }
  }
  return newState;
};

export default reducer;
