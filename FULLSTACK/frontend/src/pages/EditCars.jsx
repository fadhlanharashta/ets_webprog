import React, {useEffect} from 'react';
import Layout from './Layout';
import EditCarsFunc from '../components/EditCarsFunc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';


const EditCars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  
  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch]);

  useEffect(()=>{
    if(isError){
      navigate("/");  
    }
  }, [isError, navigate]);
  return (
    <Layout>
        <EditCarsFunc/>
    </Layout>
  )
}

export default EditCars;