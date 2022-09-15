import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/context';
import axios from "axios";
import { API_URL } from '../config';
import jwt_decode from "jwt-decode";


function Register() {

    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Username, setUsername] = useState('')
    const [Message, setMessage] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const { setAuthToken, setUser, UserInfo } = useContext(AuthContext)

    const navigate = useNavigate()

    function _register(first_name, last_name, email, username) {
        console.log('register');
        axios.post(`${API_URL}/api/register`, {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'username': username,
        }).then((resp) => resp.data).then(data => {
            setMessage(data.message)
            // navigate('/')
        }).catch((reason) => {
            setMessage("An error occured while processing your request.")
            console.log(reason.response.data)
        })
    }





    const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(!isLoading)
        _register(FirstName, LastName, Email, Username)

        setisLoading(false)
    }
    return !UserInfo ?
        <div className='container'>
            <div className='row'>
                <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded py-5 mt-4  " style={{ margin: '0 auto', boxShadow: '' }}>

                    <h1 className='mb-3' style={{ textAlign: 'center' }}>TestTask</h1>
                    <Form method='post' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={FirstName} onChange={(e) => { setFirstName(e.target.value) }} placeholder="First name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={LastName} onChange={(e) => { setLastName(e.target.value) }} placeholder="Last name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={Email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={Username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Enter username" required />
                        </Form.Group>
                        <p>{Message}</p>
                        <Button variant="primary" disabled={isLoading} type="submit">
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        <p className='text-dark py-4'>Already have an account? <Link to="/login">Login</Link></p>
                    </Form>
                </div>
            </div>
        </div> : <Navigate to="/"></Navigate>

}

export default Register;