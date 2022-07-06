import React from 'react'
import '../App.css';

function Caption() {
    return (
        <div className='captions' >
            <a href='https://www.afterdark.digital/' className='afterDarkCaption'><p>AFTER DARK DIGITAL</p></a>
            <a href='https://nabla.ooo/' className='nablaCaption'
            ><CD /><p>{`\xa0nabla ltd.`}</p></a>
        </div >
    )
}

export default Caption

function CD() {
    return (
        <svg
            viewBox="0 0 121.2 100"
            className='CD'
        >
            <g>
                <path
                    d="M60.7 50.6c12.4 0 22.1 9.7 22.2 22S73 95 60.7 95s-22.3-9.9-22.3-22.2c-.3-12.3 9.7-22.2 22.3-22.2zM27.7 49.3c-12.3 0-21.8-9.7-21.8-22.2C5.9 15 15.6 5.1 27.7 5h.6c12.1.1 22.1 10.2 21.9 22.3 0 12.4-9.9 22.1-22.5 22zM93.2 49.3c-12.5 0-22.4-9.7-22.4-22.1C70.8 15 81 4.9 93.4 5c12.2.1 22 10 21.9 22.2v.1c-.1 12.4-9.7 22-22.1 22z"
                    className="st0"
                ></path>
            </g>
        </svg>
    );
}