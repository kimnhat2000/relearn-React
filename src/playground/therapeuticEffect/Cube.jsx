import React from 'react';

const Cube = ({ color, cubeSize }) => {
    const style = {
        width: cubeSize,
        height: cubeSize,
        backgroundColor: color,
    }
    return (
        <div className='animated-in' style={style} />
    )
}

export default Cube;