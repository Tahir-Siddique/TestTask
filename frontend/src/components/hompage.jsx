import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import axios from "axios";
import { API_URL } from '../config';
import AuthContext from '../context/context';

// import AuthContext from '../context/context'

export default function Homepage() {

    // let { user } = useContext(AuthContext)
    const [Cars, setCars] = useState([])
    const { authToken } = useContext(AuthContext)

    const loadCars = () => {
        axios.get(`${API_URL}/api/car`, {
            headers: {
                'Authorization': 'Bearer ' + String(authToken.access)
            }
        }).then((resp) => resp.data).then(data => {
            console.log(data['data'])
            setCars(data.data)

            // navigate('/')
            return data
        })
    }
    useEffect(() => {
        loadCars()
    }, [])


    return (
        <div>
            <Navbar></Navbar>
            <div className="container my-4">
                <div className="row">
                    {Cars.map(car => {
                        return <div className="col-md-3 m-2" key={car.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{car.model}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{car.make}</h6>
                                    <p className="card-text">{car.registration_no}</p>
                                    <Link to={"/modify/" + car.id} className="card-link">Edit</Link>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

            </div>
        </div >
    )
}
