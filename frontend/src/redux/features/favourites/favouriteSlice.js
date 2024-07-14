import { createSlice } from "@reduxjs/toolkit"


const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: [],
    reducers: {
        addToFavourites: (state, action) => {
            // check if the product is not already favourites
            if (!state.some((product) => product.id == action.payload._id)){
                state.push(action.payload)
            }
        },
        removeFromFavourites: (state, action) => {
            // Remove the product with the matching ID
            return state.filter((product) => product.id !== action.payload)
        },
        setFavourites: (state, action) => {
            // set the favourites from local storage
            return action.payload
        }
    }
})

export const { addToFavourites, removeFromFavourites, setFavourites} = favouriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favourites
export default favouriteSlice.reducer;