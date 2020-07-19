import React from 'react';

// 电影占位图
const DEFAULT_PLACEHOLDER_IMAGE =
    "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = (props) => {
    const {
        Title,
        Poster,
        Year
    } = props;
    return (
        <div className="movie">
            <h2>{Title}</h2>
            <div>
                <img
                    width="200"
                    alt={Title}
                    src={Poster}
                />
            </div>
            <p>{Year}</p>
        </div>
    )
}

export default Movie;