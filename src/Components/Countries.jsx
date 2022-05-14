import React from "react";

const Countries = ({countries, loading}) => {
    if(loading) {
        return <h2>Loading...</h2>;
    }

    return (<>
      <div className='list'>
        {countries.map((country, index) => (
            <div className='item' key = { index } >
              <h3 className='country-title'>{ country.name }</h3>
              <p className='country-info'>Region:&nbsp;{ country.region }</p>
              <p className='country-info'>Area:&nbsp;{ country.area } km&#178;</p>
            </div>
        ))}
      </div>
    </>)
};

export default Countries;