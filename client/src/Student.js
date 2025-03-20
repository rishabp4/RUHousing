import React from 'react';
import background1 from './images/background1.jpg';

function Student() {

    return (
        <div
            style={{
                backgroundImage: `url(${background1})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <h2 style={{ textAlign: 'center'}}>
                <p className="text-white">WELCOME, RU STUDENT!</p>
                <form className="margin-top fs-6 d-flex flex-column gap-2">

                    <div className="col-auto text-white d-flex justify-content-evenly align-items-center">
                        <label for="inputEmail" className='fs-6 w-140'>Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email" />
                    </div>

                    <div className="col-auto text-white d-flex justify-content-evenly align-items-center">
                        <label for="inputRUID" className='fs-6 w-140' >RUID</label>
                        <input type="text" class="form-control" id="inputRUID" placeholder="RUID" required />
                    </div>

                    <div class="col-auto text-white d-flex justify-content-evenly align-items-center">
                        <label for="inputFirstName" className='fs-6 w-140'>First  Name</label>
                        <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" />
                    </div>

                    <div className="col-auto text-white d-flex justify-content-evenly align-items-center" >
                        <label for="inputRUID" className='fs-6 w-140'>Last Name</label>
                        <input type="text" class="form-control" id="inputRUID" placeholder="Last Name" />
                    </div>

                    <div className="col-auto text-white d-flex justify-content-evenly align-items-center">
                        <label for="inputUsername" className='fs-6 w-140'>Username</label>
                        <input type="text" class="form-control" id="inputUsername" placeholder="Username" />
                    </div>

                    <div className="col-auto text-white d-flex justify-content-evenly align-items-center">
                        <label for="inputPassword2" className='fs-6 w-140'>Password</label>
                        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" required />
                    </div>
                    <div className="col-auto d-flex justify-content-evenly align-items-center">
                        <button type="submit" class="btn btn-primary mb-3" >Create</button>
                    </div>
                </form>
            </h2>
        </div>
    );
}

export default Student;