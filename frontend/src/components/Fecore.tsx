import React from 'react'
import { Link } from 'react-router-dom';

const Fecore = () => {
    return (
        <>
            <div>Fecore</div>
            <nav>
                <ul>
                    <li><Link to="notes">Notes</Link></li>
                    <li><Link to="jobs">Jobs</Link></li>
                </ul>
            </nav>
        </>

    )
}

export default Fecore