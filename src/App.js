import React, { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';
import "./style.css";

// 请求接口数据
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=837cbd58";

// 初始化数据状态
const defaultState = {
    loading: true,
    movies: [],
    errorMessage: null
}

// reducer方法管理数据
const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_MOVIES_REQUEST':
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case 'SEARCH_MOVIES_SUCCESS':
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case 'SEARCH_MOVIES_FAILURE':
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
}

function App() {
    // 声明useReducer
    const [state, dispatch] = useReducer(reducer, defaultState);

    // 页面加载后，请求数据
    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(res => {
                return res.json();
            })
            .then(resjson => {
                dispatch({
                    type: 'SEARCH_MOVIES_SUCCESS',
                    payload: resjson.Search
                })
            });
    }, []);


    const handleSearch = (value) => {
        dispatch({
            type: 'SEARCH_MOVIES_REQUEST'
        });
        fetch(`https://www.omdbapi.com/?s=${value}&apikey=837cbd58`)
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                if (resJson.Response === 'True') {
                    dispatch({
                        type: 'SEARCH_MOVIES_SUCCESS',
                        payload: resJson.Search
                    });
                } else {
                    dispatch({
                        type: 'SEARCH_MOVIES_FAILURE',
                        error: resJson.Error
                    });
                }
            });
    }

    const { loading, movies, errorMessage } = state;

    return (
        <div className="App">
            <Header text="电影" />
            <Search onSearch={handleSearch} />
            <div className="movies">
                {
                    loading && !errorMessage && <div className="loading">Loading</div>
                }
                {errorMessage && !loading && <div className="error">{errorMessage}</div>}
                {
                    !loading && !errorMessage &&
                    movies.map((movie, index) => {
                        return <Movie key={index} {...movie} />
                    })
                }
            </div>
        </div>
    )
}

export default App;