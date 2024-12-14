exports.generatedErrors = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;

    if(err.name = "MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message = "user with this email or phone number address already exists"
    }
    res.status(statusCode).json({
        status:false,
        message:err.message,
        errName:err.name,
        stack:err.stack,
    })
};