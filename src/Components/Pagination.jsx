import React from "react";

const Pagination = ({countriesPerPage, totalCountries, paginate}) => {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(totalCountries/countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul className="pagination-row">
                {pageNumbers.map(number => (
                    <li key = {number} onClick = {()=> paginate(number)}>
                        <a href="!#" className="page-number">{number}</a>
                    </li>
                ))
                }
            </ul>

        </div>
    )
}

export default Pagination;