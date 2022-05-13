import './CSS/App.css';
import AllCountriesButton from './Components/AllCountriesButton';
import Button from './Components/Button';
import React from 'react';
class App extends React.Component {
  
constructor(props) {
  super(props);
   
  this.state = {
    items: [],
    DataisLoaded: false
    };
}

componentDidMount() {
  fetch("https://restcountries.com/v2/all?fields=name,region,area")
    .then((res) => res.json())
    .then((json) => {
    this.setState({
      items: json,
      DataisLoaded: true
    });
  })
}

render() {
  const { DataisLoaded, items } = this.state;
  if (!DataisLoaded) return
    <div>
    <h1> Pleses wait some time.... </h1> 
    </div> ;
   
  return (
    <div className='App'>
      <header className='App-header'></header>
      <main className='App-main'>
        <div className='container'>
          <AllCountriesButton className='bt'></AllCountriesButton>
          <div className='navigation'>
            <Button buttonName='Smaller than Lithuania' class='btn bt'></Button>
            <Button buttonName='All from Oceania'class='btn bt'></Button>
            <Button class='btn btn-secondary bt' imgSrc= {require('./img/az.png')} alt = 'az'></Button>
          </div>
          <div className='list'>
              {items.map((item) => ( 
                <div className='row' key = { item.id }>
                  <div className='item'>
                    <h3 className='country-title'>{ item.name }</h3>
                    <p className='country-info'>Region:&nbsp;{ item.region }</p>
                    <p className='country-info'>Area:&nbsp;{ item.area } km&#178;</p>
                  </div>
                </div>
                ))
              }
          </div>
        </div>
      </main>
    </div>
  );
}
}

export default App;
