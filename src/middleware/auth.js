const adminAuth =(req,res,next)=> {
    token = "pughaz";
    const isAunthenticated = token === 'pughaz';
   
    if(!isAunthenticated){
        res.status(401).send('unauthorized');
    }else{
     next();
    }
  };

  module.exports = {
    adminAuth,
  }