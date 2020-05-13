import React from 'react'

import './ImageLinkForm.css'


//--'input' passes data with 'onChange' + 'onInputChange' function from App, 'button' uses 'onClick' + 'onButtonSubmit' function 

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div>
            <p className='f3'>
                This magic brain will detect your face!
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}></input>
                    <button className='w-20 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
               
            </div>
        </div>
    )
}
// 
export default ImageLinkForm