import { createAsyncThunk } from "@reduxjs/toolkit";
import errorHandler from "../../errorHandler/errorHandler";

const uploadProfileImage = createAsyncThunk('/user/image', async (file: File, { dispatch , getState }) => {
  try {
    console.log(dispatch,getState)
  } catch (error) {
    return errorHandler(error)
  }
})


export {
  uploadProfileImage
}