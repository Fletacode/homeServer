
import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState:{
   
  },
  reducers: {
    updateUser: (state, action) => {
      
      state.user = action.payload;
    }
  }
});

export let {updateUser} = userSlice.actions;

export default configureStore({
  reducer: { 
    userSlice: userSlice.reducer
  },
  
}) 