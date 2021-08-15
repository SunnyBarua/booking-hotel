import Room from "../models/room"
import ErrorHandler from "../utils/errorHandler"
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

const allRooms=catchAsyncErrors(async(req,res)=>{
   try{
    const rooms=await Room.find();
    res.status(200).json({
        success:true,
        rooms
    })
   }catch(error){
       res.status(400).json({
           success:false,
           error:error.message
       })
   }
})

const newRoom=catchAsyncErrors(async(req,res)=>{
    
    const room=await Room.create(req.body);
    res.status(200).json({
        success:true,
        room
    }) 
})


const getSingleRoom=catchAsyncErrors(async(req,res,next)=>{
    const room=await Room.findById(req.query.id);
    if(!room){
        return next(new ErrorHandler('Room not found with this ID',404))
    }

    res.status(200).json({
        success:true,
        room
    })
      

})

const updateRoom=catchAsyncErrors(async(req,res)=>{
    
        let room=await Room.findById(req.query.id)
        if(!room){
            return res.status(404).json({
                success:false,
                error:"Room not found with this ID"
            })
        }
        room=await Room.findByIdAndUpdate(req.query.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            room
        })
  
})

const deleteRoom=catchAsyncErrors(async(req,res)=>{
    const room=await Room.findById(req.query.id)
        if(!room){
            return res.status(404).json({
                success:false,
                error:"Room not found with this ID"
            })
        }
        await room.remove()
        res.status(200).json({
            success:true,
            message:'Room is deleted.'
        })

})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}

 // return res.status(404).json({
            //     success:false,
            //     error:"Room not found with this ID"
            // })