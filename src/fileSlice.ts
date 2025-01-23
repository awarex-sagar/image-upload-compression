import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  compressedFile: string | null; // Store the compressed image as a base64 string
  originalFile: string | null; // Store the compressed image as a base64 string
}

const initialState: FileState = {
  compressedFile: null,
  originalFile: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setCompressedFile: (state, action: PayloadAction<string | null>) => {
      state.compressedFile = action.payload;
    },
    setOriginalFile: (state, action: PayloadAction<string | null>) => {
      state.originalFile = action.payload;
    },
    clearCompressedFile: (state) => {
      state.compressedFile = null;
    },
  },
});

export const { setCompressedFile, setOriginalFile, clearCompressedFile } =
  fileSlice.actions;
export default fileSlice.reducer;
