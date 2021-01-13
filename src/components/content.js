import React from "react";

const Content = (props) => {
  const { movielist, showlist, likelist, blocklist, page, totalpage } = props;
  return showlist === "home" ? (
    <p id="homePage-text">Our Top Rated Movies List<br/>This is the home page</p>
  ) : showlist === "movie" ? (
    <div className="toolbar">
      <div className="toolbar-button">
        <button onClick={props.handleTitleOrder}>title</button>
        <button onClick={props.handleRateOrder}>rate_count</button>
        <button onClick={props.handleVoteOrder}>vote_average</button>
        <button onClick={props.handleDateOrder}>release_date</button>
        <hr />
      </div>

      <div className="pre-next">
        <button className="pre-next-pre" onClick={props.handlePrePage}>
          pre
        </button>
        {page}/500
        <button
          className="pre-next-next"
          onClick={() => props.handleNextPage(page, totalpage)}
        >
          next
        </button>
      </div>
      <div className="movielist_container">
        {movielist.map((movies, index) => {
          return (
            <div className="movielist" key={movies[0]}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies[5]}`}
                alt="movie_picture"
                className="movielist_img"
              />
              <p className="movielist-name">{movies[1]}</p>
              {movies[7] === 1 ? (
                <button className="movielist-like">liked</button>
              ) : (
                <button
                  className="movielist-like"
                  onClick={() => props.handleLike(movies[0])}
                >
                  like
                </button>
              )}
              <button
                className="movielist-block"
                onClick={() => props.handleBlock(movies[0])}
              >
                Block
              </button>
              <p>Release_date: {movies[4]}</p>
              <p>Vote Count: {movies[2]}</p>
              <p>Average Score:{movies[3]}</p>
              <p className="movielist-describe">{movies[6]}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : showlist === "like" ? (
    <div className="likeList">
      {likelist.map((movies, index) => {
        return (
          <div className="likeMovies" key={movies[0]}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies[5]}`}
              alt="movie_picture"
            />
            <div className="transform">
              Move<img
                className="trashIcon"
                src={"https://img.icons8.com/ios/30/000000/delete-trash.png"}
                onClick={() => props.handleDelete(movies[0])}
                alt="trashIcon"
              />
              Block<img
                className="blockIcon"
                id="block"
                src={
                  "https://img.icons8.com/emoji/30/000000/prohibited-emoji.png"
                }
                onClick={() => props.handleBlock(movies[0])}
                alt="blockIcon"
              />
      
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="blockList">
      {blocklist.map((movies, index) => {
        return (
          <div className="blockMovies" key={movies[0]}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies[5]}`}
              alt="movie_picture"
            />
            <div className="transform">
              Move<img
                className="trashIcon"
                src={"https://img.icons8.com/ios/30/000000/delete-trash.png"}
                onClick={() => props.handleDelete(movies[0])}
                alt="trashIcon"
              />

              Like<img
                className="likeIcon"
                src={
                  "https://img.icons8.com/plasticine/30/000000/filled-like.png"
                }
                onClick={() => props.handleLike(movies[0])}
                alt="likeIcon"
              />

              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
