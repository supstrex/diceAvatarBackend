export function errorHandler(err, req, res, next){
    if(err.status == 500){
        res.status(400).send({message: "Oops! Something went wrong."})
    }
    next()
}