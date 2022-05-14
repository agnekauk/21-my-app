import './CSS/App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Countries from './Components/Countries';
import AllCountriesButton from './Components/AllCountriesButton';
import Button from './Components/Button';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [countriesPerPage] = useState(10);
    const [AtoZ, setAtoZ] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            const res = await axios.get('https://restcountries.com/v2/all?fields=name,region,area');
            setCountries(res.data);
            setLoading(false);
        }

        fetchCountries();
    }, []);

    const sort = () => {
        let sorted = [];
        if (AtoZ) {
            sorted = [...countries].sort((a, b) => (a.name > b.name) ? 1 : -1);
            setAtoZ(false);
        } else {sorted = [...countries].sort((a, b) => (b.name > a.name) ? 1 : -1)
            setAtoZ(true)};
        setCountries(sorted);
    };
    
    const filterSmallerThanLT = () => {
        const smaller = [...countries.filter(country=> country.area < 65300)];
        setCountries(smaller);
    };

    const filterOceania = () => {
        const oceania = [...countries.filter(country=> country.region ==='Oceania')];
        setCountries(oceania);
    };

    function handlePageClick({ selected:selectedPage}) {
        setCurrentPage(selectedPage);
    }

    const offset= currentPage * countriesPerPage;

    const currentCountries = countries
        .slice(offset, offset+countriesPerPage);

    const pageCount = Math.ceil(countries.length/countriesPerPage);

    return (
        <div className='container'>
            <AllCountriesButton></AllCountriesButton>
            <div className='navigation'>
                <Button buttonName='Smaller than Lithuania' class='btn' do={filterSmallerThanLT}></Button>
                <Button buttonName='All from Oceania' class='btn' do={filterOceania}></Button>
                <Button class='btn btn-secondary' imgSrc={require('./img/az.png')} alt='az' do={sort}></Button>
            </div>
            <Countries countries={currentCountries} loading={loading}></Countries>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel = {'Next'}
                pageCount = {pageCount}
                onPageChange = {handlePageClick}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName = {'pagination__link'}
                disabledClassName = {'pagination__link--disabled'}
                activeClassName = {'pagination__link--active'}>
                </ReactPaginate>
        </div>
    );
};

export default App;
