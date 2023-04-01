import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Carlist = () => {
    const {cars, setCars} = useState([]);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        const response = await axios.get('http://localhost:5000/cars');
        setCars(response.data);
    }

    const deleteCar = async (carId) => {
        await axios.delete(`http://localhost:5000/cars/${carId}`);
        getCars();
    }
  return (
    <div>
        <h1 className='title'>Cars</h1>
        <h2 className='subtitle'>Cars List</h2>
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Car Name</th>
                    <th>Price</th>
                    <th>Listed by</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cars.map((car, index) => (
                <tr key={car.uuid}>
                    <td>{index + 1}</td>
                    <td>{car.name}</td>
                    <td>{car.price}</td>
                    <td>{car.user.name}</td>
                    <td>
                        <Link to ={`/cars/edit/${car.uuid}`} className="button is-small is-info">Edit</Link>
                        <button onClick={()=>deleteCar(car.uuid)} className="button is-small is-danger">Delete</button>
                    </td>
                </tr>
                ))};
            </tbody>
        </table>
    </div>
  )
}

export default Carlist