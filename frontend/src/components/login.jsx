import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/context';
import jwt_decode from "jwt-decode";

import axios from "axios";
import { API_URL } from '../config';




function Login() {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    let { UserInfo, setAuthToken, setUser } = useContext(AuthContext)

    const navigate = useNavigate()




    function _login(username, password) {
        console.log('login');
        axios.post(`${API_URL}/api/token/`, {
            'username': username,
            'password': password
        }).then((resp) => resp.data).then(data => {
            const access = data['access']
            const refresh = data['access']

            setAuthToken({ "refresh": refresh, "access": access })
            setUser(jwt_decode(access))

            console.log("access", access);
            console.log("refresh", refresh);

            localStorage.setItem('authTokens', JSON.stringify({ "refresh": refresh, "access": access }))
            navigate('/')
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(!isLoading)
        _login(Username, Password)
        setisLoading(false)



    }

    return !UserInfo ?
        <div className='container p-4'>
            <div className='row'>

                <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded py-5" style={{ margin: '0 auto', boxShadow: '' }}>
                    <h1 className='mb-5 mt-2' style={{ textAlign: 'center' }}>TestTask</h1>
                    {/* <p>{UserInfo['name']}</p> */}
                    <Form method="post" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={Username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Enter Username" required />

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={Password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Remember me!" />
                        </Form.Group>
                        <Button variant="primary" disabled={isLoading} type="submit">
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        <p className='text-dark py-4 text-decoration-none'>New user? <Link to="/register">Register now</Link></p>
                    </Form>
                </div>
            </div>
        </div> : <Navigate to="/"></Navigate>

}

export default Login;