import React from "react";

const Pagination = ({
    countriesPerPage, 
    totalCountries, 
    paginate, 
    currentPage,
    setCurrentPage, 
    pageNoLimit, 
    minPageNoLimit,
    setMinPageNoLimit, 
    maxPageNoLimit,
    setMaxPageNoLimit,
    totalPages}) => {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(totalCountries/countriesPerPage); i++){
        pageNumbers.push(i);
    };

    const renderPageNumbers = pageNumbers.map((number) => {
        if(number<maxPageNoLimit+1 && number> minPageNoLimit){
            return (
                    <li key = {number} id = {number} onClick = {()=> paginate(number)} 
                    className={currentPage === number ? "active" : null}>
                    {number}
                    </li>
            )
        } else { return null};
    });

    const handleNextButton = () => {
        currentPage !==totalPages ? setCurrentPage(currentPage+1) : setCurrentPage(currentPage);

        if (currentPage+1 > maxPageNoLimit) {
            setMaxPageNoLimit(maxPageNoLimit+pageNoLimit);
            setMinPageNoLimit(minPageNoLimit+pageNoLimit);
        }
    };

    const handlePrevButton = () => {

        if (currentPage !==1) {
            setCurrentPage(currentPage-1);

            if ((currentPage-1) % pageNoLimit === 0) {
                setMaxPageNoLimit(maxPageNoLimit-pageNoLimit);
                setMinPageNoLimit(minPageNoLimit-pageNoLimit);
            }
        } else {setCurrentPage(currentPage);}
    };
    
    let pageIncrementButton = null;
    if(pageNumbers.length > maxPageNoLimit) {
        pageIncrementButton = <li onClick={handleNextButton}> &hellip;</li>
    };

    let pageDecrementButton = null;
    if(currentPage > pageNoLimit) {
        pageDecrementButton = <li onClick={handlePrevButton}> &hellip;</li>
    };

    return (
        <div className="pagination">
            <ul className="pagination-row">
                <button className="prev-next" onClick={handlePrevButton}>Prev</button>
                <div className="page-numbers">
                {pageDecrementButton}
                {renderPageNumbers}
                {pageIncrementButton}
                </div>
                <button className="prev-next" onClick = {handleNextButton}>Next</button>
            </ul>
        </div>
    )
}

export default Pagination;