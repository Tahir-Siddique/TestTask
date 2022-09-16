import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router';
import AuthContext from '../context/context';
import Navbar from './navbar';
import axios from "axios";
import { API_URL } from '../config';

export default function AddCat() {
    const [CatId, setCatId] = useState('')
    const [Category, setCategory] = useState('')

    const [Message, setMessage] = useState('')
    const [isLoading, setisLoading] = useState(false)
    let { UserInfo, setAuthToken, setUser, authToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const params = useParams();

    function _addcat(category,) {
        axios.post(`${API_URL}/api/cat`, {
            // 'id': CatId,
            'text': Category,

        }, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            // console.log(data);
            setMessage(data.message)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(!isLoading)
        _addcat(CatId, Category,)
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
                                <input className="form-control" id="cat" value={Category} onChange={(e) => { setCategory(e.target.value); }} />

                            </div>
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
