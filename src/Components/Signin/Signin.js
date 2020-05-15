import React from 'react'


//State takes the input from 'onEmailChange' and 'onPasswordChange' functions which take the 'e.target.value' from the onChange method
//attached to the inputs. At the same time, 'onSubmitSignin' recieves teh data from this.state and uses it in the fetch() call to check if the
// inputted email and password exist in the database, if so it fires the 'onRouteChange' function in App.js to switch to the login page.
//'props' must now be passed down inside constructor and super from App.js to use the 'onRouteChange//
    
class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }
 

    
    onSubmitSignin = () => {    
        fetch('https://infinite-badlands-29250.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
            this.props.loadUser(user)
            this.props.onRouteChange('home')    
           
            }
        })
    }  
       
       
        
   


//copy and paste from 'tachyons sign in', 'article' wrapper is from 'tachyons cards' to create a box around teh form.

    render() {
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email"  
                                id="email"
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                className=" pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        
                        </fieldset>
                            <div className="">
                                <input 
                                onClick={this.onSubmitSignin} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')}  
                                href="#0" 
                                className="f6 link dim black db pointer">Register</p>
                            
                            </div>
                    </div>
                </main>
            </article>
        ) 
    }
   
}
// 
export default Signin