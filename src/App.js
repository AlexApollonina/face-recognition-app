import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';

class App extends Component {
  render(){
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={230}/>
        <Navigation />
        <Logo />
        <Rank/>
        <ImageLinkForm />
        {/*
        
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
