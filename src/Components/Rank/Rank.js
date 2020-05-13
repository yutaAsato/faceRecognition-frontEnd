import React from 'react'


const Rank = ({name, entries}) =>{
    return(
        <div>
            <div className='white f3'>
                {`Hey ${name}!, your current entry count is...`}
            </div>
            <div className='f1'>
                {entries}
            </div>
        </div>
    )
}
// 
export default Rank