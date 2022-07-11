import './CSS/App.css';
import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import Countries from './Components/Countries';
import Button from './Components/Button';
import Pagination from './Components/Pagination';
import countriesReducer from './Reducers/countriesReducer';
import { getFromServer, sortByNameAsc, sortByNameDesc, showAll } from './Actions/countriesActions';
import { useMemo } from 'react';

const App = () => {
    const [countries, dispachCountries] = useReducer(countriesReducer, []);
    const [AtoZ, setAtoZ] = useState(true);
    const [filter, setFilter] = useState(false);
    const [filterSmallerLTU, setFilterSmallerLTU] = useState(false);
    const [filterFromOceania, setFilterFromOceania] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(20);
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    
    useEffect(()=> {
        axios.get('https://restcountries.com/v2/all?fields=name,region,area')
        .then(res => {
            dispachCountries(getFromServer(res.data));
        });
    }, []);
    
    const countriesData = useMemo(() => {
        let computedCountries = "";
        
        if (filter === false) {
            computedCountries = countries;
        } 
        if (filter === true) {
            setCurrentPage(1);
            setMinPageNumberLimit(0);
            setMaxPageNumberLimit(5);
            if (filterSmallerLTU === true){
                computedCountries = countries.filter(c => c.area < 65300);
            } 
            else if (filterFromOceania === true) {
                computedCountries = countries.filter(c => c.region === 'Oceania');
            }
        }
        
        return computedCountries;

    }, [countries, filter, filterFromOceania, filterSmallerLTU]);
    
  
    const sort = () => {
        if (AtoZ) {
            dispachCountries(sortByNameAsc());
            setAtoZ(x => !x);
        } else {
            dispachCountries(sortByNameDesc());
            setAtoZ(x => !x);
        }      
    };
    
    const filterLTU = () => {
        pageNumbers = [];
        setFilter(true);
        setFilterFromOceania(false)
        setFilterSmallerLTU(true);
    };
    
    const filterOceania = () => {
        pageNumbers = [];
        setFilter(true);
        setFilterSmallerLTU(false);
        setFilterFromOceania(true);
    }
    
    const showAllCountries = () => {
        setCurrentPage(1);
        setFilter(false);
        dispachCountries(showAll());
    }

    let pageNumbers = [];

    for(let i=1; i<=Math.ceil(countriesData.length/countriesPerPage); i++){
       pageNumbers.push(i);
    };
    
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const totalPages = Math.ceil(countriesData.length/countriesPerPage);
    const currentcountries = countriesData.slice(indexOfFirstCountry,indexOfLastCountry);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
    return (
        <div className='container'>
            <h1 className='title' onClick={showAllCountries}>List of the countries</h1>
            <div className='navigation'>
                <Button buttonName='Smaller than Lithuania' class='btn btn-primary' do={filterLTU}></Button>
                <Button buttonName='All from Oceania' class='btn btn-primary' do={filterOceania}></Button>
                <Button class='btn btn-secondary' imgSrc={require('./img/az.png')} alt='az' do={sort}></Button>
            </div>
            <Countries countries={currentcountries}></Countries>
            <Pagination 
            pageNumbers = {pageNumbers} 
            paginate = {paginate}
            currentPage = {currentPage}
            setCurrentPage = {setCurrentPage}
            pageNumberLimit = {pageNumberLimit}
            minPageNumberLimit = {minPageNumberLimit}
            setMinPageNumberLimit = {setMinPageNumberLimit}
            maxPageNumberLimit = {maxPageNumberLimit}
            setMaxPageNumberLimit = {setMaxPageNumberLimit}
            totalPages = {totalPages}
            ></Pagination> 
        </div>
    );
};

export default App;