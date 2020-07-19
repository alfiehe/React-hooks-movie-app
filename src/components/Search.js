import React, { useState } from "react";

const Search = (props) => {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClear = () => {
        setValue('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearch(value); //调用父组件方法，传递value给父组件
        handleClear();
    }

    return (
        <form className="search">
            <input
                value={value}
                onChange={handleChange}
                type="text"
            />
            <button
                onClick={handleSubmit}
                type="submit"
            >SEARCH</button>
        </form>
    )
}

export default Search;