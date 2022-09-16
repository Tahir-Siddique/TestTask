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
    const [NextPage, setNextPage] = useState('')
    const [PreviousPage, setPreviousPage] = useState('')
    const [TotalPages, setTotalPages] = useState(0)
    const loadCars = (url = `${API_URL}/api/carlist`) => {
        if (url !== null) {

            axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + String(authToken.access)
                }
            }).then((resp) => resp.data).then(data => {
                setNextPage(data.next)
                setPreviousPage(data.previous)
                setTotalPages(data.count)
                console.log(data['results'])
                setCars(data.results)

                // navigate('/')
                return data
            })
        }

    }
    useEffect(() => {
        loadCars()
    }, [])


    return (
        <div>
            <Navbar></Navbar>
            <div className="container my-4">
                <div className="row">
                    <div className="col-12 text-center" style={{ margin: "0 auto" }}>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><Link className="page-link" onClick={() => { loadCars(PreviousPage !== null ? PreviousPage : null) }}>Previous</Link></li>
                                <li className="page-item"><Link className="page-link" onClick={() => { loadCars(NextPage !== null ? NextPage : null) }}>Next</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
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
