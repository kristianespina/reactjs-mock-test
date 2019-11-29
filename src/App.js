import React, { useState } from 'react';
import './App.css';

import { ApolloProvider } from '@apollo/react-hooks';


import Listings from './components/Listings'
import Sidebar from './components/Sidebar'

import getClient from './API/client';

const apolloClient = getClient();

function App() {
  const [ filter, setFilter ] = useState(new Date());
  function handleFilterChange(e) {
    var date = e.target.value;
    switch(date) {
        case 'yesterday':
            setFilter(new Date()-1);
            break;
        case 'last-week':
            setFilter(new Date()-7);
            break;
        case 'this-month':
            var today = new Date();
            setFilter(new Date(today.getYear(), today.getMonth(), 1, 0,0,0,0));
            break;
        default:
            setFilter(new Date());
            break;
    }
  }
  return (
    <ApolloProvider client={apolloClient}>
    <header className="hero is-dark">
      <div className="hero-body">
        <div className="title">
          <h1>
            Frontend Test
          </h1>
          <h2 className="subtitle">
            Hello World
          </h2>
        </div>
      </div>
    </header>
    <div className="App">
      <section id="sidebar" style={{marginTop: "2rem", marginLeft: "2rem"}}>
        <Sidebar />
      </section>
      <section id="content">
        <div className="container">
          <h1 className="title has-text-centered" style={{marginTop: "2rem"}}>Site Visitors</h1>

          <div className="select">
          <select onChange={handleFilterChange}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last-week">Last Week</option>
              <option value="this-month">This Month</option>
          </select>
          </div>
          <Listings date={filter} offset={0} limit={10} />
        </div>
      </section>
    </div>
    <footer className="has-text-centered">
    INSERT FOOTER HERE
    </footer>
    </ApolloProvider>
  );
}

export default App;
