import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';
import "./style.css";

// 接口数据
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=837cbd58";

function App() {
    // 电影数据，初始为空数组
    const [movies, setMovies] = useState([]);
    // 加载装态，初始为true
    const [loading, setLoading] = useState(true);
    // 错误消息，初始为null
    const [errorMessage, setErrorMessage] = useState(null);

    const [keyWords, setKeyWords] = useState('');

    // 页面加载后，请求数据
    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(res => {
                // console.log('======res', res);
                return res.json(); // 返回的数据转换成JSON对象
            })
            .then(resjson => {
                // console.log('======Search', resjson.Search);
                setMovies(resjson.Search); //设置数据为获取到的Search数组
                setLoading(false); //获取到数据成功，加载设为false
            });
    }, []);

    // 搜索方法
    const handleSearch = (value) => { //value参数是从子组件Search中input获取
        console.log('onSearch', value);
        setKeyWords(value);
        setLoading(true); //搜索时设置加载状态true
        // setErrorMessage(null); //清空错误消息

        // 传参value请求数据
        fetch(`https://www.omdbapi.com/?s=${value}&apikey=837cbd58`)
            .then(res => {
                // console.log('=====搜索结果', res);
                return res.json()
            })
            .then(resJson => {
                console.log('=======搜索返回的JSON', resJson.Response); //判断有数据成功吗
                console.log('=======搜索返回的JSON错误', resJson.Error); //判断有数据成功吗
                if (resJson.Response === 'True') {
                    setMovies(resJson.Search);
                    setLoading(false);
                } else {
                    setErrorMessage('哎呀，搜不到吧~~');
                    setLoading(false);
                }
            });
    }

    return (
        <div className="App">
            <Header text="电影" />
            <Search onSearch={handleSearch} />
            <p>搜索<strong> {keyWords}</strong></p>
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