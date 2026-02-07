import User from "../models/user.js";

//api to change role from user
export const changeRoleToOwner=async(req,res)=>{
    try{
        const {_id}=req.user;
        await User.findByIdAndUpdate(_id,{role:"owner"})
        res.json({success:true,message:"Now you can list cars"})
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//api to list car

export const addCar=async(req,res)=>
{
    try{
        const{_id}=req.user;
        let car=JSON.parse(req.body.carData);
        const imageFile=req.file;
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}