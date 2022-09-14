export const AddCart = (item) =>{
    return {
        type:"Add_Cart",
        payload:item,
    }
}
// Remove Cart
export const RemoveCart = (id) =>{
    return {
        type:"Remove_Cart",
        payload:id,
    }
}
// Remove Individual Cart
export const RemoveOne = (item) =>{
    return {
        type:"Remove_One",
        payload:item,
    }
}
