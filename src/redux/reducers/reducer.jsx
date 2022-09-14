const init_state = {
    carts:[]
}

const CartReducer = (state=init_state,action) =>{
    switch(action.type){
       case "Add_Cart":
        const ItemIndex = state.carts.findIndex((item)=> item.id ===action.payload.id);
        if(ItemIndex>=0){
            state.carts[ItemIndex].qnty+=1;
        }else{
            const temp = {...action.payload,qnty:1};
            return {
                ...state,
                carts:[...state.carts,temp]
            }
        }
        // return {
        //     ...state,
        //     carts: [...state.carts, action.payload]
        // }
        case "Remove_Cart":
            const data = state.carts.filter((e)=> e.id !==action.payload)
            return{
                ...state,
                carts:data
            }

        case "Remove_One":
            const Item_Index_dec = state.carts.findIndex((item)=>item.id ===action.payload.id);
            if(state.carts[Item_Index_dec].qnty>=1){
                const dltItem = state.carts[Item_Index_dec].qnty -=1;
                console.log(...state.carts,dltItem);
                return {
                    ...state,
                    carts:[...state.carts]
                }
            }else if(state.carts[Item_Index_dec].qnty===1){
                const data = state.carts.filter((e)=> e.id !==action.payload)
                return{
                   ...state,
                   carts:data
            }
            }

        default:
            return state;
    }

}
export default CartReducer;