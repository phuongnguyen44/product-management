module.exports=(query)=>{
    let object={
        keyword:"",
        regex:""
    }
    if(query){
        object.keyword=query
        const regex=new RegExp(object.keyword,"i")
        object.regex=regex
    }
    return object
}