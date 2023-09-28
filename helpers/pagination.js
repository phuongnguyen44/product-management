module.exports=(objectPagination,query,countProduct) =>{
    
    if(query){
        objectPagination.currentPage=parseInt(query)
    }
    objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItem

    
    
    objectPagination.totalPage=Math.ceil(countProduct/objectPagination.limitItem)
    return objectPagination
}