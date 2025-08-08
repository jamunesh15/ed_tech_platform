import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
  courseContentLoading: false, // Added for better loading state management
  error: null // Added for error handling
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
      state.error = null // Clear errors on successful update
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    setCourseContentLoading: (state, action) => { // New action
      state.courseContentLoading = action.payload
    },
    setCourseError: (state, action) => { // New action
      state.error = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
      state.error = null
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  setCourseContentLoading,
  setCourseError,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer