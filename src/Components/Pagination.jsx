import React from "react";

const Pagination = ({countriesPerPage, totalCountries, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i<=Math.ceil(totalCountries/countriesPerPage); i++) {
      pageNumbers.push(i);  
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className="page-number">
                        <a onClick={()=> paginate(number)}href="!#" className="page-link">
                        {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default Pagination;