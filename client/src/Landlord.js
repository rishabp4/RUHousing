import React from 'react';
import background1 from './images/background.webp';

function Landlord() {

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
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '90px', marginLeft: '50px'}}>
                <p className="text-black">WELCOME, LANDLORD!</p>
                <form className="margin-top fs-6 d-flex flex-column gap-1"p>

                    <div className="col-auto text-black d-flex justify-content-evenly align-items-center">
                        <label for="inputEmail" className='fs-6 w-140'>Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email" />
                    </div>

                    <div class="col-auto text-black d-flex justify-content-evenly align-items-center">
                        <label for="inputFirstName" className='fs-6 w-140'>First  Name</label>
                        <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" />
                    </div>

                    <div className="col-auto text-black d-flex justify-content-evenly align-items-center" >
                        <label for="inputRUID" className='fs-6 w-140'>Last Name</label>
                        <input type="text" class="form-control" id="inputRUID" placeholder="Last Name" />
                    </div>

                    <div className="col-auto text-black d-flex justify-content-evenly align-items-center">
                        <label for="inputUsername" className='fs-6 w-140'>Username</label>
                        <input type="text" class="form-control" id="inputUsername" placeholder="Username" />
                    </div>

                    <div className="col-auto text-black d-flex justify-content-evenly align-items-center">
                        <label for="inputPassword2" className='fs-6 w-140'>Password</label>
                        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" required />
                    </div>
                    <div className="col-auto d-flex justify-content-evenly align-items-center mt-4">
                        <button type="submit" class="btn btn-secondary mb-3" >CREATE ACCOUNT</button>
                    </div>
                </form>
            </h2>
        </div>
    );
}

export default Landlord;