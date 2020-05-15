import React, {Component} from 'react';
import Particles from 'react-particles-js'; //Praticles.js npm//
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
// import Clarifai from 'clarifai';

import './App.css';

//--------------variables-----------------




const particleOption = {
  particles: {
    number: {
      value: 200,
      density:{
        enable: true,
        value_area: 800,
        
      }
    }
  }
}  
          
        

//---------------state-------------------------------

const initialState = {

  input: '',

  imageUrl:'',

  box: {},

  route: 'signin',

  isSignedIn : false,

  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }


}


class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }


  //--------functions--------------------------------------------------------------


  //recieves data from 'register.js', when new users submits details this function fires and updates the newly
  //created 'user' state above.
  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
 }
 

  //receives 'response' from 'onButtonSubmit(), then return an object used to set box state
    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage')
      const width = Number(image.width);
      const height = Number(image.height);
      return{ 
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }

    //receives the return of 'calculateFaceLocation(), wrapped as parameter in 'onButtonSubmit()'
    displayFaceBox = (box) => {
      console.log(this.state.box)
        this.setState({box: box})
    }


   //recieves URL from imagelinkfrom input, then sets state//
  onInputChange = (e) => {
      this.setState({input:e.target.value})
  }

 
  //changes the state of 'imageUrl' to 'input' which recieves data from 'onInputChange' from ImageLinkform.js,
  // and handles main API call. Sends the inputed url to CLARIFAI which return object with face box detection numbers.
  //This is then passed to the 'displayFaceBox()' with the recalculated box dimensions from 'calculateFaceLocation()'
  //as an argument, which takes ITS argument from the the current json 'response'.
  //The fetch() to '/image' is call to the 'image' server to update the number of entries (submission) the user has made.
  //'Object.assign' is used to update only the state for 'user entries' otherwise the name reutrn user name returns
  //'undefined' as the whole user object in state is being updated. This way only 'entries' will get updated in the
  //user object.
     onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
        fetch('https://infinite-badlands-29250.herokuapp.com/imageurl',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input,
            })
        })
        .then(response => response.json())
        .then(response => {
          if(response) {    
              fetch('https://infinite-badlands-29250.herokuapp.com/image',{
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                  id: this.state.user.id,
                  })
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))     
              })
              .catch(console.log)
          }
         
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
         
        .catch(err => console.log(err))
    }
    
      


     //function used to set 'route' state and 'isSignedin' state ,it takes parameters from Signin,navigation,Registerjs//
    onRouteChange = (route) => {
      if(route === 'signout'){
        this.setState(initialState)
        
      }else if(route === 'home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route: route})
       console.log(initialState)
       console.log(this.state)
    }
 
  


  
  //---------------------------------

    render(){
        return (
          <div className="App">
            
            <Particles className="particles"params={particleOption} />           
            <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
            
            {/*Depending what state 'route' is currently set at, it will render different components, 
            home screen and login screen.The second conditional checks if 'route' is set as 'signin' then it shows
            the default sign in page, if not then it shows the register page.('route: 'register' is not stated explicitly but
            result at the register page by default?)*/ }

            {this.state.route === 'home'   
                  ?  <div>
                      <Logo/>
                      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>  
                     </div>
                  : (this.state.route === 'signin'
                  ?   <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                  :   <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    )
                
                
            }
          </div>
        );
    }
}



export default App;



//--newfeature--