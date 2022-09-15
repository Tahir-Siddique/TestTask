import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router';
import AuthContext from '../context/context';
import Navbar from './navbar';
import axios from "axios";
import { API_URL } from '../config';

export default function EditCar() {
    const [CarId, setCarId] = useState(1)
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

    const params = useParams();

    function _update(id, category, color, model, make, registration_no) {
        axios.put(`${API_URL}/api/editcar/${id}`, {
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
            // console.log(data);
            setMessage(data.message)
        })
    }

    function _delete(id) {
        axios.delete(`${API_URL}/api/editcar/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            // console.log(data);
            setMessage(data.message)
        })
    }
    function _get_car() {
        const url = `${API_URL}/api/editcar/${params.id}`
        // console.log("Url", url);
        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            // console.log(data);
            setCarId(data.id)
            setCategory(data.category)
            setColor(data.color)
            setModel(data.model)
            setMake(data.make)
            setRegistrationNo(data.registration_no)
            setMessage(data.message)
        })
    }


    function _get_categories() {
        axios.get(`${API_URL}/api/cat`, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            // console.log(data['data'])
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
        _get_car()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(!isLoading)
        _update(CarId, Category, Color, Model, Make, RegistrationNo)
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
                                <select className="form-control" id="cat" value={Category} onChange={(e) => { setCategory(e.target.value); }}>
                                    {Categories.map(elem => <option key={elem.id} value={elem.id}>{elem.text}</option>)}
                                </select>
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
                            <Button variant="success" disabled={isLoading} type="submit">
                                {isLoading ? "Loading..." : "Submit"}
                            </Button>
                            <Button variant="danger" className='mx-2' disabled={isLoading} onClick={() => {
                                _delete(CarId)
                            }} type="button">
                                {isLoading ? "Loading..." : "Delere"}
                            </Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div> : <Navigate to="/login"></Navigate>;
}
