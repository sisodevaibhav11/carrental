import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/user.js";
import fs from 'fs';

// API to change role from user to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    // Find and Update with { new: true } to get the updated document back if needed
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { role: "owner" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Now you can list cars" });
  }
  catch (error) {
    console.error("ROLE CHANGE ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}



export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // 1️⃣ Upload image to ImageKit (NEW METHOD)
    const uploadResponse = await imagekit.files.upload({
      file: fs.createReadStream(imageFile.path),
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // 2️⃣ Generate optimized URL (NEW METHOD)
    const optimizedImageUrl = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: uploadResponse.filePath,
      transformation: [
        { width: 1280 },
        { quality: 80 },
        { format: "webp" },
      ],
    });

    // 3️⃣ Save car
    await Car.create({
      ...car,
      owner: _id,
      image: optimizedImageUrl,
    });

    // 4️⃣ Remove temp file
    fs.unlinkSync(imageFile.path);

    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



//api to list owner cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  }
  catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

//api to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const {carId}=req.body
    const car = await Car.findById( carId );

    //checking is car belong to the user
    if(car.owner.toString()!==_id.toString())
    {
      return   res.json({ success: false,message:"Unauthorized" });
    }
    
    car.isAvailable=!car.isAvailable;
    await car.save();
    res.json({success:true ,message:"Availability Toggled"})
  }
  catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}


//api to delete car 
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const {carId}=req.body
    const car = await Car.findById( carId );

    //checking is car belong to the user
    if(car.owner.toString()!==_id.toString())
    {
      return   res.json({ success: false,message:"Unauthorized" });
    }
    
    car.owner=null;
    car.isAvailable=false;
    await car.save();
    res.json({success:true ,message:"Car Removed"})
  }
  catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
//api to get Dashboard data 
export const getDashboardData = async (req, res) => {
  try {
    const { _id,role } = req.user;
    const {carId}=req.body
    const car = await Car.findById( carId );

    //checking is car belong to the user
    if(role!=='owner')
    {
      return   res.json({ success: false,message:"Unauthorized" });
    }
    
    const cars=await Car.find({owner:_id})
  }
  catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}