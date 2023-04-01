import React, {useEffect} from "react";
import Layout from "./Layout";
import Carlist from "../components/Carlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";


const Cars = () => {
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
        <Carlist />
    </Layout>
  );
};

export default Cars