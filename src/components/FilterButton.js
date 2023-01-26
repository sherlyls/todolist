import React from 'react'

const FilterButton = (props) => {
    return (
        <button 
            type="button" 
            className="btn toggle-btn" 
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter}
            >
            <span className="visually-hidden">{props.name} </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> {props.name}</span>
        </button>
    )
}

export default FilterButton