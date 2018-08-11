import React from 'react';
import { Link } from 'react-router-dom';

import CubeRender from './CubeRender';
import DropDown from './DropDown';

class TherapeuticEffect extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            cubeChange: {},
            cubeArray: [],
            cubeNumber: 0,
            notice: '',
            blinkingSpeed: 1000,
            blinkingCube: 0,
            blinkingType: '<strong>random blinking</strong>/order blinking',
            cubeSize: 50,
            testNumber: 2,
            dropdown: [
                {name: 'no blinking', code: 0},
                {name: 'random blinking', code: 1}, 
                {name: 'ordered blinking', code: 2},
                {name: 'no color cubes then fill', code: 3},
                {name: 'no color cubes no fill', code: 4},
                {name: 'no color cubes fill in order', code: 5},
            ],
            dropdownTitle: 'blinking type',
            dropdownChosenItem:''
        }
        this.blinking = null;
    }

    componentWillUnmount = () => {
        clearInterval(this.blinking);
    }

    //input manager

    onNumberChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onDropdownItemSelected = (event) => {
        this.setState({ dropdownChosenItem: event.code, dropdownTitle: event.name })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const { cubeNumber, cubeSize } = this.state
        if(!cubeNumber || !cubeSize){
            this.setState({ notice:'you must enter numbers of cube and cube size'})
            return;
        }
        clearInterval(this.blinking);
        this.cubeArrayRender();
        this.cubeSizeControl();
    }

    //controller

    cubeArrayRender = () => {
        let { cubeNumber, dropdownChosenItem } = this.state;

        let cubes = parseInt(cubeNumber, 10);
        if (cubes < 1) {
            this.setState({ notice: 'the number must be between 1 and 105' });
            return;
        } else if (cubes > 500) {
            this.setState({ notice: 'the number must be between 1 and 105' });
            return; 
        } else {
            this.setState({ notice:'' })
            let array = cubes ? Array(cubes).fill() : []; //create an array with a number empty items in it.
            this.setState({ array })
            if (dropdownChosenItem === 0) {
                let cubeArray = array.length === 0 ? [] : array.map((c) => (this.randomColor()))
                this.setState({ cubeArray })
                return;
            } else if (dropdownChosenItem === 1) {
                this.randomBlinking(array.length);
                return;
            } else if (dropdownChosenItem === 2) {
                this.orderBlinking(array.length);
                return;
            } else if (dropdownChosenItem === 3) {
                this.startWithGreyCubesAndFillRandomly(array.length);
                return;
            } else if (dropdownChosenItem === 4) {
                this.startWithGreyCubesNoFill(array.length)
                return;
            } else if (dropdownChosenItem === 5) {
                this.startWithGreyCubesAndFillOrderly(array.length)
                return;
            }
        }          
    }

    cubeSizeControl = () => {
        let cubeSize = parseInt(this.state.cubeSize, 10);
        if (cubeSize < 0) {
            this.setState({ notice: 'cube size cannot be smaller than 0' })
            return;
        } else {
            this.setState({ cubeSize })
        }
    }

    randomBlinking = (number) => {
        const { blinkingSpeed } = this.state;
        let cubeArray = Array(number).fill().map((c) => (this.randomColor()));
        this.blinking = setInterval(() => {
            // cubeArray = [...this.state.cubeArray]; //this is to avoid mutilating state
            for (let i = 1; i <= this.state.blinkingCube; i++) {
                const randIndex = Math.floor(Math.random() * cubeArray.length);
                cubeArray[randIndex] = this.randomColor();
                this.setState({ cubeArray })
            }
        }, blinkingSpeed);
    }

    orderBlinking = (number) => {
        const { blinkingSpeed } = this.state;
        let cubeArray = Array(number).fill().map((c) => (this.randomColor()));
        let count = 0;
        this.blinking = setInterval(() => {
            // const cubeArray = this.state.cubeArray.slice(); //this is another to avoid mutilating state, do not confuse with splice
            if (count <= this.state.cubeNumber - 1) {
                cubeArray[count] = this.randomColor();
                this.setState({ cubeArray });
                count ++;
            }
            if (count > this.state.cubeNumber - 1) {
                count = 0;
            }
        }, blinkingSpeed)
    }

    startWithGreyCubesAndFillRandomly = (number) => {
        const { blinkingSpeed } = this.state;
        let cubeArray = Array(number).fill('rgb(150,150,150)');
        this.blinking = setInterval(() => {
            const randIndex = Math.floor(Math.random()*cubeArray.length)
            cubeArray[randIndex] = this.randomColor();
            this.setState({ cubeArray });
        }, blinkingSpeed)
    }

    startWithGreyCubesAndFillOrderly = (number) => {
        const { blinkingSpeed } = this.state;
        let cubeArray = Array(number).fill('rgb(150,150,150)');
        let i = 0;
        this.blinking = setInterval(() => {
            if (i <= cubeArray.length-1) {
                cubeArray[i]=this.randomColor();
                this.setState({ cubeArray });
                i++;
            }else if (i > cubeArray.length-1) {
                cubeArray.fill('rgb(150,150,150)')
                i=0;
            }
            this.setState({ cubeArray });
        }, blinkingSpeed)
    }

    startWithGreyCubesNoFill = (number) => {
        const { blinkingSpeed } = this.state;
        this.blinking = setInterval(() => {
            let cubeArray = Array(number).fill('rgb(150,150,150)');
            const randIndex = Math.floor(Math.random() * cubeArray.length)
            cubeArray[randIndex] = this.randomColor();
            this.setState({ cubeArray });
        }, blinkingSpeed)
    }

    randomColor = () => {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = `rgb(${r}, ${g}, ${b})`
        return color;
    }

    render() {
        const { cubeArray, cubeNumber, blinkingSpeed, blinkingCube, notice, cubeSize, dropdown, dropdownChosenItem } = this.state
        return (
            <div>
            <form className = 'menu-bar' onSubmit = {this.onFormSubmit}>   
                <div>
                    <label>cube number </label>
                    <input type='number' name='cubeNumber' value={cubeNumber} onChange={this.onNumberChange} />
                </div>

                <div>
                    <label> blinking speed</label>
                    <input type='number' name='blinkingSpeed' value={blinkingSpeed} onChange={this.onNumberChange} />
                </div>
                    
                <div>
                    {dropdownChosenItem !== 2 &&
                        <span>
                            <label> Blinking Cube</label>
                            <input type='number' name='blinkingCube' value={blinkingCube} onChange={this.onNumberChange} />
                        </span>
                    }
                </div>
                   
                <div>
                    <label>cube size </label>
                    <input type='number' name='cubeSize' value={cubeSize} onChange={this.onNumberChange} />
                </div>

                <div>
                    <DropDown
                        defaultTile={this.state.dropdownTitle}
                        items={dropdown}
                        clickedItem={this.onDropdownItemSelected}
                    />
                </div>   

                <div>
                    <button>ok</button>
                    <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                </div>  
           

            </form>

            {notice &&
                <h4>{notice}</h4>
            }

            <CubeRender
                cubeArray = {cubeArray}
                cubeSize = {cubeSize}
            />
            </div>
        )
    }

}

export default TherapeuticEffect;