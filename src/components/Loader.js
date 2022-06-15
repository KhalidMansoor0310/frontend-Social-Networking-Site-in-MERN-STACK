import React from 'react'

function Loader() {
    return (
        <div className="container">
            <div className="row">
                <div class="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div class="spinner-border m-auto" role="status" aria-hidden="true"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader
