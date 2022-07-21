import React from "react";

const Pagination = ({
    pageNumbers, 
    paginate, 
    currentPage,
    setCurrentPage, 
    pageNumberLimit, 
    minPageNumberLimit,
    setMinPageNumberLimit, 
    maxPageNumberLimit,
    setMaxPageNumberLimit,
    totalPages}) => {

    const renderPageNumbers = pageNumbers.map((number) => {
        if((number<maxPageNumberLimit+1 && number> minPageNumberLimit)){
            return (
                    <li key = {number} id = {number} onClick = {()=> paginate(number)} 
                    className={currentPage === number ? "active" : null}>
                    {number}
                    </li>
            )
        } else { 
            return null};
    });

    const handleNextButton = () => {
        currentPage !==totalPages ? setCurrentPage(currentPage+1) : setCurrentPage(currentPage);

        if (currentPage+1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
        }
    };

    const handlePrevButton = () => {

        if (currentPage !==1) {
            setCurrentPage(currentPage-1);

            if ((currentPage-1) % pageNumberLimit === 0) {
                setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit);
            }
        } else {setCurrentPage(currentPage);}
    };
    
    let pageIncrementButton = null;
    if(pageNumbers.length > maxPageNumberLimit) {
        pageIncrementButton = <li onClick={handleNextButton}> &hellip;</li>
    };

    let pageDecrementButton = null;
    if(currentPage > pageNumberLimit) {
        pageDecrementButton = <li onClick={handlePrevButton}> &hellip;</li>
    };

    let previous = null;
    if(currentPage > 1){
        previous = <button className="prev-next" onClick={handlePrevButton}>Prev</button>
    };

    let next = null;
    if(currentPage < totalPages) {
        next =  <button className="prev-next" onClick = {handleNextButton}>Next</button>
    }


    return (
        <div className="pagination">
            <ul className="pagination-row">
                {previous}
                <div className="page-numbers">
                {pageDecrementButton}
                {renderPageNumbers}
                {pageIncrementButton}
                </div>
                {next}
            </ul>
        </div>
    )
}

export default Pagination;