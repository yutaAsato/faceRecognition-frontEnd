import React from 'react'
import './FaceRecognition.css'



//--Creates the image below the input and button--//
const FaceRecognition = ({imageUrl, box}) =>{
    return(
        <div className="center ma">
            <div className='absolute mt2'>

              <img id='inputImage' alt= '' src={imageUrl}  width='500px' height='auto'></img>  
                {/*bounding-box css + style using 'box' prop from App.js state */}
              <div className='bounding-box' 
              style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}>
              
              </div>    
             
            </div>
            
        </div>
        )
}
// 
export default FaceRecognition