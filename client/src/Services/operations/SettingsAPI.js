import { toast } from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../redux/profileSlice"
import { logout } from "./authAPI"
import { setLoading } from "../../redux/profileSlice"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}




export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...")
    
    try {
      console.log("Sending profile update request with data:", formData)
      
      dispatch(setLoading(true))
      
      const response = await apiconnector("PUT", UPDATE_PROFILE_API, formData, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })
      
      console.log("UPDATE_PROFILE_API RESPONSE:", response)

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update profile")
      }

      const updatedUserDetails = response.data.updatedUserDetails
      
      // Generate profile image if not present
      const userImage = updatedUserDetails.image 
        ? updatedUserDetails.image 
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstname} ${updatedUserDetails.lastname}`

      // Update user in Redux store
      dispatch(setUser({ 
        ...updatedUserDetails, 
        image: userImage 
      }))

      toast.success("Profile updated successfully!")
      
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR:", error)
      
      // Handle different types of errors
      let errorMessage = "Could not update profile"
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "Network error. Please check your connection."
      } else if (error.message) {
        // Something else happened
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}