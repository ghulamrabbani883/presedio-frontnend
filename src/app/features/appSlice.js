import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isInterested: false,
  user:{},
  postId:null,
  likes:[]
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loggedIn: (state) => {
      const token = JSON.parse(localStorage.getItem("token"));

      if (token) {
        state.isLoggedIn = true;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    interested:(state,action)=>{
      state.isInterested = action.payload
    },
    setPostId:(state, action)=>{
      state.postId = action.payload
    },
    setLikes:(state, action)=>{
      state.likes = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {  setUser, loggedIn, interested, setPostId, setLikes } = appSlice.actions;

export default appSlice.reducer;
