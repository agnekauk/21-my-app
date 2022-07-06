import './CSS/App.css';
import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import Countries from './Components/Countries';
import Button from './Components/Button';
import Pagination from './Components/Pagination';
import countriesReducer from './Reducers/countriesReducer';
import { getFromServer, sortByNameAsc, sortByNameDesc, filterSmallerLTU, filterFromOceania, showAll } from './Actions/countriesActions';

const App = () => {
    const [countries, dispachCountries] = useReducer(countriesReducer, []);
    const [AtoZ, setAtoZ] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(20);
    
    useEffect(()=> {
        axios.get('https://restcountries.com/v2/all?fields=name,region,area')
        .then(res => {
            dispachCountries(getFromServer(res.data));
        });
    }, []);

     const sort = () => {
        if (AtoZ) {
            dispachCountries(sortByNameAsc());
            setAtoZ(x => !x);
        } else {
            dispachCountries(sortByNameDesc());
            setAtoZ(x => !x);
        }      
     }
    
     const indexOfLastCountry = currentPage * countriesPerPage;
     const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
     const currentCountries = countries.slice(indexOfFirstCountry,indexOfLastCountry);

     const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <h1 className='title' onClick={() => dispachCountries(showAll())}>List of the countries</h1>
            <div className='navigation'>
                <Button buttonName='Smaller than Lithuania' class='btn btn-primary' do={() => dispachCountries(filterSmallerLTU())}></Button>
                <Button buttonName='All from Oceania' class='btn btn-primary' do={() => dispachCountries(filterFromOceania())}></Button>
                <Button class='btn btn-secondary' imgSrc={require('./img/az.png')} alt='az' do={sort}></Button>
            </div>
            <Countries countries={currentCountries}></Countries>
            <Pagination 
            countriesPerPage = {countriesPerPage} 
            totalCountries = {countries.length} 
            paginate = {paginate}
            ></Pagination> 
        </div>
    );
};

export default App;
