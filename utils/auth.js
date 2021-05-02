const jwt=require("jsonwebtoken");

module.exports={
	verify:async function (req,res,next){
	try{
		if(!req.headers["auth"]){
			throw("You have to Sign up");
		}
		let token=req.headers['auth'].split('bearer ');
		console.log(token);
		token=token[1];
		console.log(token);
		let tokenData=await jwt.verify(token,'SECRET');	
		req.user=tokenData;
		next();
	}
	catch(error){
		console.log(error);
		next(error);
	}
	
},
verifyAdmin:async function(req,res,next){
	if(req.user.permissions=="admin"){
			next();
		}
	
	
	else{
		res.status(403).send("Not Allowed");
	}
}


}