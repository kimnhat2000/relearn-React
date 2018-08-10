import React from 'react';

class DropDown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false
        }
    }

    onDropDownClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    onItemClicked = (e) => () => {
        this.setState({ clicked: false });
        this.props.clickedItem(e);
    }

    render() {
        const style = {
            'cursor': 'pointer',
        }

        const dropdownItem = this.props.items.map((item, index) =>(
            <div key={index} className = 'item-drop-down' style={ style } onClick={this.onItemClicked(item) }>
                {item.name}
            </div>
        ))
        return (
            <div>
                <button onClick={this.onDropDownClick}> {this.props.defaultTile} </button>
                {this.state.clicked &&
                    <div>
                    {dropdownItem}
                    </div>
                }
            </div>

        )
    }
}

export default DropDown;