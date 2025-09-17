import React from 'react'

function search() {
    return (
        <div className="searchs">
            <div className="search-box">
                <div className="search">
                    <div className="sea">
                        <input type="search" placeholder='Where are you going?' />
                    </div>
                    <div className="select-date">
                        <input type="date" />
                        <input type="date" />
                    </div>
                    <div className="select-room">
                        <div className="select-room">
                            <select>
                                <option>Rooms 2 People</option>
                                <option>Rooms 4 People</option>
                                <option>Rooms 6 People</option>
                                <option>Rooms 8 People</option>
                            </select>
                        </div>
                    </div>
                    <div className="btn-sea">
                        <button className='btn-search'>Search</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default search