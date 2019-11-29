import React, { useState } from 'react';
import './App.css';

import { ApolloProvider } from '@apollo/react-hooks';


import Listings from './components/Listings'
import getClient from './API/client';

const apolloClient = getClient();


function App() {
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
      <section id="sidebar" className="has-background-black is-dark"></section>
      <section id="content">
        <div className="container">
          <Listings />
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
