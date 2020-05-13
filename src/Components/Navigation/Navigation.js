import React from 'react'

//copy and paste from 'tachyons sign in', 'article' wrapper is from 'tachyons cards' to create a box around teh form.

const Navigation = ({onRouteChange, isSignedIn} ) => {

    //If state is true for 'isSignedIn' it willshow the 'Sign Out' navigation only, if set to false (as default) it shows 'Sign in' and 'Register' nav

        if(isSignedIn){
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                 </nav>
            );
            
        }else{
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            );
           
        }
        
    
}

export default Navigation