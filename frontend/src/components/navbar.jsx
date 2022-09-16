import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/context';
import axios from "axios";
import { API_URL } from '../config';

export default function Navbar() {

    const { UserInfo, authToken, setAuthToken, setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    function _logout() {
        // console.log(authToken.refresh);
        // console.log('logout');
        // axios.post(`${API_URL}/api/token/refresh/`, {
        //     'refresh': authToken.access
        // }).then((resp) => resp.data).then(data => {

        // })
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <Link className="navbar-brand" to="/">Hello {UserInfo.name}!</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addcar">Add Car</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addcat">Add Category</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    <button className="btn btn-outline-danger my-2 my-sm-0 mx-2" type='button' onClick={() => {
                        _logout()
                    }}>Logout</button>

                </form>
            </div>
        </nav >
    )
}
