import axios from 'axios';
import { get } from './api';
import { useState, useEffect } from 'react';

export const Apitest = () => {

    const [CategoryData, setCategoryData] = useState([]);

    useEffect(() => { 
        get.Category().then((data) => setCategoryData(data));
    }, []);

    console.log(CategoryData);

    return (
        <h1 className='text-5xl text-center mt-10'> Api teszt: </h1>


    )
};