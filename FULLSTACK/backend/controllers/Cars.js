import Car  from "../models/CarModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getCars = async(req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Car.findAll({
                attributes:['uuid', 'name', 'price'],
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Car.findAll({
                attributes:['uuid', 'name', 'price'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCarsById = async(req, res) =>{
    try {
        const car = await Car.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!car) return res.status(404).json({msg: "Car not found"})
        let response;
        if(req.role === "admin"){
            response = await Car.findOne({
                attributes:['uuid', 'name', 'price'],
                where:{
                    id: car.id
                },
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Car.findOne({
                attributes:['uuid', 'name', 'price'],
                where:{
                    [Op.and]:[{id: car.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCars = async(req, res) =>{
    const {name, price} = req.body;
    try {
        await Car.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(201).json({msg:"New cars added"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateCars = async(req, res) =>{
    try {
        const car = await Car.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!car) return res.status(404).json({msg: "Car not found"})
        const {name, price} = req.body;
        if(req.role === "admin"){
            await Car.update({name, price},{
                where:{
                    id: car.id
                }
            });
        }else{
            if(req.userId !== car.userId) return res.status(403).json({msg: "Access denied"})
            await Car.update({name, price},{
                where:{
                    [Op.and]:[{id: car.id}, {userId: req.userId}]
                }
            }); 
        }
        res.status(200).json({msg:"Car profile updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteCars = async(req, res) =>{
    try {
        const car = await Car.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!car) return res.status(404).json({msg: "Car not found"})
        const {name, price} = req.body;
        if(req.role === "admin"){
            await Car.destroy({
                where:{
                    id: car.id
                }
            });
        }else{
            if(req.userId !== car.userId) return res.status(403).json({msg: "Access denied"})
            await Car.destroy({
                where:{
                    [Op.and]:[{id: car.id}, {userId: req.userId}]
                }
            }); 
        }
        res.status(200).json({msg:"Car profile has been destroyed"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

