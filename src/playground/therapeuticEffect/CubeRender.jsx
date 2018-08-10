import React from 'react';
import Cube from './Cube';

const CubeRender = ({ cubeArray, cubeSize }) => {
    const cubes = cubeArray.length >= 1 && cubeArray.map((c,i) => (
        <Cube key={i} color={c} cubeSize={cubeSize}/>
    ))
    return(
        <div className='cubes '>
            <div className='cubes-inside'>
                {cubes}
            </div>
        </div>
    )
}

export default CubeRender;