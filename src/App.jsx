import './CSS/App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Countries from './Components/Countries';
import AllCountriesButton from './Components/AllCountriesButton';
import Button from './Components/Button';
import Pagination from './Components/Pagination';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(40);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            const res = await axios.get('https://restcountries.com/v2/all?fields=name,region,area');
            setCountries(res.data);
            setLoading(false);
        }

        fetchCountries();
    }, []);

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <AllCountriesButton></AllCountriesButton>
            <div className='navigation'>
                <Button buttonName='Smaller than Lithuania' class='btn'></Button>
                <Button buttonName='All from Oceania' class='btn'></Button>
                <Button class='btn btn-secondary' imgSrc={require('./img/az.png')} alt='az'></Button>
            </div>
            <Countries countries={currentCountries} loading={loading}></Countries>
            <Pagination countriesPerPage={countriesPerPage} totalCountries={countries.length} paginate={paginate}></Pagination>
        </div>
    );
};

export default App;
