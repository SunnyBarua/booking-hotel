import mongoose from "mongoose"

const roomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the room name'],
        trim:true,
        maxLength:[100,'Room name can not exceed 100 characters']
    },
    pricePerNight:{
        type:Number,
        required:[true,'Please enter the room price for night'],
        maxLength:[4,'Room name can not exceed 4 characters']
    },
    description:{
        type:String,
        required:[true,'Please enter room description'],
    },
    address:{
        type:String,
        required:[true, 'Please enter room address'],
    },

    guestCapacity:{
        type:Number,
        required:[true,'Please enter room guest capacity'],
    },
    numOfBeds:{
        type:Number,
        required:[true,'Please enter number of beds in room'],
    },
    internet:{
        type:Boolean,
        default:true
    },
    breakfast:{
        type:Boolean,
        default:false
    },
    airConditioned:{
        type:Boolean,
        default:true
    },
    petsAllowed:{
        type:Boolean,
        default:false
    },
    roomCleaning:{
        type:Boolean,
        default:true
    },
    ratings:{
        type:Number,
        default:5
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'Please enter room category'],
        enum:{
            values:[
                'King',
                'Single',
                'Twins'
            ],
            message:'Please Select correct category for room'
        }
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }


})

export default mongoose.models.Room || mongoose.model("Room",roomSchema);