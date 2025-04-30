import React from 'react';
import { Link } from 'react-router-dom';
import background1 from './images/background.webp';

function NewUser() {
    return (
        <div
            style={{
                backgroundImage: `url(${background1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
            <h2 style={{ textAlign: 'center', marginBottom: '100px', marginLeft: '50px' }}>
                <p className="margin-top text-black">WELCOME, NEW USER!</p>
                <div className="mt-5">
                    <Link to="/student">
                        <button className="btn btn-danger">RU STUDENT</button>
                    </Link>
                    <br />
                    <Link to="/landlord">
                        <button className="btn btn-danger mt-2">RU LANDLORD</button>
                    </Link>
                </div>
            </h2>
        </div>
    );
}

export default NewUser;