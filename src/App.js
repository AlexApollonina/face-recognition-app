import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';


const returnClarifaiRequestOptions = (imageUrl) => {
// Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '98b16b068d5a432b94698d8e3bdaf44c';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'tkvtz8lvy9b6';       
    const APP_ID = 'face-recognition';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageUrl;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
 return requestOptions;
}

   
    
class App extends Component {
  constructor () {
    super ();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
     fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(response => {
        console.log('hi', response.outputs[0].data.regions[0].region_info.bounding_box)
        /*if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
      this.displayFaceBox(this.calculateFaceLocation(response))*/
      })
      .catch(err => console.log(err));
    }      
  
  render(){
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={230} />
        <Navigation />
        <Logo />
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
