import './CSS/App.css';
import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
// import ReactPaginate from 'react-paginate';
import Countries from './Components/Countries';
import Button from './Components/Button';
import countriesReducer from './Reducers/countriesReducer';
import { getFromServer, sortByNameAsc, sortByNameDesc, filterSmallerLTU, filterFromOceania, showAll } from './Actions/countriesActions';

const App = () => {
    const [countries, dispachCountries] = useReducer(countriesReducer, []);
    const [AtoZ, setAtoZ] = useState(true);

    
    // const [currentPage, setCurrentPage] = useState(0);
    // const [countriesPerPage] = useState(10);

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

    // function handlePageClick({ selected:selectedPage}) {
    //     setCurrentPage(selectedPage);
    // }

    // const offset= currentPage * countriesPerPage;

    // const currentCountries = countries
    //     .slice(offset, offset+countriesPerPage);

    // const pageCount = Math.ceil(countries.length/countriesPerPage);

    return (
        <div className='container'>
            <h1 className='title' onClick={() => dispachCountries(showAll())}>List of the countries</h1>
            <div className='navigation'>
                <Button buttonName='Smaller than Lithuania' class='btn btn-primary' do={() => dispachCountries(filterSmallerLTU())}></Button>
                <Button buttonName='All from Oceania' class='btn btn-primary' do={() => dispachCountries(filterFromOceania())}></Button>
                <Button class='btn btn-secondary' imgSrc={require('./img/az.png')} alt='az' do={sort}></Button>
            </div>
            <Countries countries={countries}></Countries> 
            {/* buvo currentCountries */}
            {/* <ReactPaginate
                previousLabel={'Previous'}
                nextLabel = {'Next'}
                pageCount = {pageCount}
                onPageChange = {handlePageClick}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName = {'pagination__link'}
                disabledClassName = {'pagination__link--disabled'}
                activeClassName = {'pagination__link--active'}>
                </ReactPaginate> */}
        </div>
    );
};

export default App;
