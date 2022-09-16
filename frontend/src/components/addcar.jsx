import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';
import AuthContext from '../context/context';
import Navbar from './navbar';
import axios from "axios";
import { API_URL } from '../config';
import { Link, useParams } from "react-router-dom";


export default function AddCar() {

    const [Category, setCategory] = useState(1)
    const [Categories, setCategories] = useState([])
    const [Color, setColor] = useState('')
    const [Model, setModel] = useState('')
    const [Make, setMake] = useState('')
    const [RegistrationNo, setRegistrationNo] = useState('')
    const [Message, setMessage] = useState('')
    const [isLoading, setisLoading] = useState(false)
    let { UserInfo, setAuthToken, setUser, authToken } = useContext(AuthContext)
    const navigate = useNavigate()

    function _add_car(category, color, model, make, registration_no) {
        axios.post(`${API_URL}/api/car`, {
            'category': category,
            'color': color,
            'model': model,
            'make': make,
            'registration_no': registration_no,
        }, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            console.log(data);
            setMessage(data.message)
        })
    }


    function _get_categories() {
        axios.get(`${API_URL}/api/cat`, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            console.log(data['data'])
            setCategories(data.data)
            if (Categories.length > 0) {
                setCategory(Categories[0].id)
            }
            // navigate('/')
            return data
        })
    }

    useEffect(() => {
        if (Categories.length <= 0)
            _get_categories()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(!isLoading)
        _add_car(Category, Color, Model, Make, RegistrationNo)
        setisLoading(false)
    }
    return UserInfo ?
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">

                    <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded py-5 mt-4  " style={{ margin: '0 auto', boxShadow: '' }}>

                        {/* <h1 className='mb-3' style={{ textAlign: 'center' }}>TestTask</h1> */}
                        <Form method='post' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="cat">Category</label>
                                <select className="form-control" id="cat" onChange={(e) => { setCategory(e.target.value); }}>
                                    {Categories.map(elem => <option key={elem.id} value={elem.id}>{elem.text}</option>)}
                                </select>

                                <Link className='btn btn-danger mt-2' to={"/modifycat/" + Category}>Edit</Link>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="text" value={Color} onChange={(e) => { setColor(e.target.value) }} placeholder="Color" required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" value={Model} onChange={(e) => { setModel(e.target.value) }} placeholder="Model" required />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Make</Form.Label>
                                <Form.Control type="text" value={Make} onChange={(e) => { setMake(e.target.value) }} placeholder="Make" required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Registration No.</Form.Label>
                                <Form.Control type="text" value={RegistrationNo} onChange={(e) => { setRegistrationNo(e.target.value) }} placeholder="Make" required />
                            </Form.Group>
                            <p>{Message}</p>
                            <Button variant="primary" disabled={isLoading} type="submit">
                                {isLoading ? "Loading..." : "Submit"}
                            </Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div> : <Navigate to="/login"></Navigate>;
}
