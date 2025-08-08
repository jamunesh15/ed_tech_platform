// import { toast } from "react-hot-toast"

// import { setLoading, setToken } from "../../redux/authSlice"
// import { resetCart } from "../../redux/cartSlice"
// import { setUser } from "../../redux/profileSlice"
// import { apiconnector } from "../apiconnector"
// import { endpoints } from "../apis"

// const {
//   SENDOTP_API,
//   SIGNUP_API,
//   LOGIN_API,
//   RESETPASSTOKEN_API,
//   RESETPASSWORD_API,
// } = endpoints

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       })
//       console.log("SENDOTP API RESPONSE............", response)

//       console.log(response.data.success)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("OTP Sent Successfully")
//       navigate("/verifyemail")
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error)
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function signUp(
//   firstname,
//   lastname,
//   email,
//   password,
//   confirmpassword, 
//   accountType,
//   contactNumber = "", // Make optional with default value
//   otp, 
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...");
//     dispatch(setLoading(true));
//     try {
//       const response = await apiconnector(
//         "POST", 
//         SIGNUP_API, 
//         {
//           firstname,
//           lastname,
//           email,
//           password,
//           confirmpassword, 
//           accountType,
//           contactNumber, // Will be empty string if not provided
//           otp, 
//         },
//         {
//           "Content-Type": "application/json",
//         }
//       );

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }
      
//       toast.success("Signup Successful");
//       navigate("/login");
//     } catch (error) {
//       console.error("SIGNUP ERROR:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Signup Failed");
//     } finally {
//       dispatch(setLoading(false));
//       toast.dismiss(toastId);
//     }
//   };
// } 

// // export function login(email, password, navigate) {
// //   return async (dispatch) => {
// //     const toastId = toast.loading("Loading...")
// //     dispatch(setLoading(true))
// //     try {
// //       const response = await apiconnector("POST", LOGIN_API, {
// //         email,
// //         password,
// //       })

// //       console.log("LOGIN API RESPONSE............", response)

// //       if (!response.data.success) {
// //         throw new Error(response.data.message)
// //       }

// //       toast.success("Login Successful")
// //       dispatch(setToken(response.data.token))

// //       const userImage = response.data?.user?.image
// //         ? response.data.user.image
// //         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
// //       dispatch(setUser({ ...response.data.user, image: userImage }))

// //       localStorage.setItem("token", JSON.stringify(response.data.token))

// //       navigate("/dashboard/myprofile")
      
// //     } catch (error) {
// //       console.log("LOGIN API ERROR............", error)
// //       toast.error("Login Failed")
// //     }
// //     dispatch(setLoading(false))
// //     toast.dismiss(toastId)
// //   }
// // }




// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...");
//     dispatch(setLoading(true));
    
//     try {
//       console.log("Attempting login with:", { email, password });
//       const response = await apiconnector("POST", LOGIN_API, {
//         email,
//         password,
//       });


      
//       console.log("Login response:", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       // Store token and user data
//       const { token, responseuser } = response.data;
//       console.log("Login successful, user:", responseuser);

//       dispatch(setToken(token));
      
//       const userImage = responseuser?.image 
//         ? responseuser.image 
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${responseuser.firstname} ${responseuser.lastname}`;
      
//       const userData = { 
//         ...responseuser, 
//         image: userImage 
//       };
      
//       dispatch(setUser(userData));

//       localStorage.setItem("token", JSON.stringify(token));
//       localStorage.setItem("user", JSON.stringify(userData));

//       console.log("Navigating to dashboard...");
//       navigate("/dashboard/my-profile");
//       toast.success("Login Successful");

//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error(error.response?.data?.message || error.message || "Login Failed");
//     } finally {
//       dispatch(setLoading(false));
//       toast.dismiss(toastId);
//     }
//   };
// }

// // export function getPasswordResetToken(email, setEmailSent) {
// //   return async (dispatch) => {
// //     const toastId = toast.loading("Loading...")
// //     dispatch(setLoading(true))
// //     try {
// //       const response = await apiconnector("POST", RESETPASSTOKEN_API, {
// //         email,
// //       })

// //       console.log("RESETPASSTOKEN RESPONSE............", response)

// //       if (!response.data.success) {
// //         throw new Error(response.data.message)
// //       }

// //       toast.success("Reset Email Sent")
// //       setEmailSent(true)
// //     } catch (error) {
// //       console.log("RESETPASSTOKEN ERROR............", error)
// //       toast.error("Failed To Send Reset Email")
// //     }
// //     toast.dismiss(toastId)
// //     dispatch(setLoading(false))
// //   }
// // }

// // export function resetPassword(password, confirmPassword, token, navigate) {
// //   return async (dispatch) => {
// //     const toastId = toast.loading("Loading...")
// //     dispatch(setLoading(true))
// //     try {
// //       const response = await apiconnector("POST", RESETPASSWORD_API, {
// //         password,
// //         confirmPassword,
// //         token,
// //       })

// //       console.log("RESETPASSWORD RESPONSE............", response)

// //       if (!response.data.success) {
// //         throw new Error(response.data.message)
// //       }

// //       toast.success("Password Reset Successfully")
// //       navigate("/login")
// //     } catch (error) {
// //       console.log("RESETPASSWORD ERROR............", error)
// //       toast.error("Failed To Reset Password")
// //     }
// //     toast.dismiss(toastId)
// //     dispatch(setLoading(false))
// //   }
// // }

// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }
// }


// export function getResetpasswordToken(email , setemailsent){
   
//    return async(dispatch) =>{
//     const toastId = toast.loading("Sending reset email...")
//     dispatch(setLoading(true))
//    try {
      
//     const response = await apiconnector( "POST" , RESETPASSTOKEN_API , {email}  )

//     console.log("Reset password TOKEN DATA: ", response);

//     if(!response.data.success){
//       throw new Error(response.data.message)
//     }

//     toast.success("Reset email sent successfully")
//     setemailsent(true)
    

//    } catch (error) {
       
//    console.log("Error while getting reset password token: ", error.message);
//    toast.error(error.response?.data?.message || error.message || "Failed to send reset email")

//    }
//    dispatch(setLoading(false))
//    toast.dismiss(toastId)

//    }

// }


// export function resetpassword(password , confirmpassword , token){
  
//   return async(dispatch) =>{

//     const toastId = toast.loading("Updating password...")
//     dispatch(setLoading(true))

//    try {

//     const response  = await apiconnector("POST" , RESETPASSWORD_API , {password , confirmpassword , token} )
    
//     console.log("API RESPONSE UPDATE PASSWORD: " , response);

//     if(!response.data.success){
//       throw new Error (response.data.message)
//     }

//     toast.success("Password updated successfully")

    
//    } catch (error) {
//      console.log("Error while updating password: " , error.message);
//      toast.error(error.response?.data?.message || error.message || "Failed to update password")
//    }

//    dispatch(setLoading(false))
//    toast.dismiss(toastId)

//   }

// }

// // Google Authentication function
// export function googleAuth(navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Redirecting to Google...")
//     dispatch(setLoading(true))
    
//     try {
//       const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
      
//       if (!googleClientId || googleClientId === 'your-google-client-id-here') {
//         toast.dismiss(toastId)
//         toast.error("Google authentication is not configured. Please contact the administrator.")
//         dispatch(setLoading(false))
//         return
//       }
      
//       // Construct Google OAuth URL
//       const redirectUri = `${window.location.origin}/auth/google/callback`
//       const scope = 'openid email profile'
//       const responseType = 'code'
      
//       const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}&access_type=offline&prompt=consent`
      
//       toast.dismiss(toastId)
//       toast.success("Redirecting to Google...")
      
//       // For demo purposes, we'll just show a success message
//       // In production, you would actually redirect to Google
//       setTimeout(() => {
//         toast.success("Google authentication feature coming soon!")
//         dispatch(setLoading(false))
//       }, 1500)
      
//       // Uncomment this line for actual Google OAuth redirect:
//       // window.location.href = googleAuthUrl
      
//     } catch (error) {
//       console.log("GOOGLE AUTH ERROR............", error)
//       toast.error("Failed to connect with Google")
//       dispatch(setLoading(false))
//       toast.dismiss(toastId)
//     }
//   }
// }

// // Handle Google OAuth callback (would be used in a callback component)
// export function handleGoogleCallback(code, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Verifying Google account...")
//     dispatch(setLoading(true))
    
//     try {
//       // Here you would send the authorization code to your backend
//       // const response = await apiconnector("POST", GOOGLE_AUTH_API, { code })
      
//       // For demonstration, we'll show a success message
//       toast.dismiss(toastId)
//       toast.success("Google authentication successful!")
//       navigate("/dashboard/my-profile")
      
//     } catch (error) {
//       console.log("GOOGLE CALLBACK ERROR............", error)
//       toast.error("Failed to authenticate with Google")
//       dispatch(setLoading(false))
//       toast.dismiss(toastId)
//     }
//   }
// }


import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../redux/authSlice"
import { resetCart } from "../../redux/cartSlice"
import { setUser } from "../../redux/profileSlice"
import { apiconnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiconnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verifyemail")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  firstname,
  lastname,
  email,
  password,
  confirmpassword, 
  accountType,
  contactNumber = "", // Make optional with default value
  otp, 
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiconnector(
        "POST", 
        SIGNUP_API, 
        {
          firstname,
          lastname,
          email,
          password,
          confirmpassword, 
          accountType,
          contactNumber, // Will be empty string if not provided
          otp, 
        },
        {
          "Content-Type": "application/json",
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
} 

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))

//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))

//       localStorage.setItem("token", JSON.stringify(response.data.token))

//       navigate("/dashboard/myprofile")
      
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }




export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    
    try {
      console.log("Attempting login with:", { email, password });
      const response = await apiconnector("POST", LOGIN_API, {
        email,
        password,
      });


      
      console.log("Login response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Store token and user data
      const { token, responseuser } = response.data;
      console.log("Login successful, user:", responseuser);

      dispatch(setToken(token));
      
      const userImage = responseuser?.image 
        ? responseuser.image 
        : `https://api.dicebear.com/5.x/initials/svg?seed=${responseuser.firstname} ${responseuser.lastname}`;
      
      const userData = { 
        ...responseuser, 
        image: userImage 
      };
      
      dispatch(setUser(userData));

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Navigating to dashboard...");
      navigate("/dashboard/my-profile");
      toast.success("Login Successful");

    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || error.message || "Login Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}



export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function getResetpasswordToken(email , setemailsent){
   
   return async(dispatch) =>{
    const toastId = toast.loading("Sending reset email...")
    dispatch(setLoading(true))
   try {
      
    const response = await apiconnector( "POST" , RESETPASSTOKEN_API , {email}  )

    console.log("Reset password TOKEN DATA: ", response);

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    toast.success("Reset email sent successfully")
    setemailsent(true)
    

   } catch (error) {
       
   console.log("Error while getting reset password token: ", error.message);
   toast.error(error.response?.data?.message || error.message || "Failed to send reset email")

   }
   dispatch(setLoading(false))
   toast.dismiss(toastId)

   }

}


export function resetpassword(password , confirmpassword , token){
  
  return async(dispatch) =>{

    const toastId = toast.loading("Updating password...")
    dispatch(setLoading(true))

   try {

    const response  = await apiconnector("POST" , RESETPASSWORD_API , {password , confirmpassword , token} )
    
    console.log("API RESPONSE UPDATE PASSWORD: " , response);

    if(!response.data.success){
      throw new Error (response.data.message)
    }

    toast.success("Password updated successfully")

    
   } catch (error) {
     console.log("Error while updating password: " , error.message);
     toast.error(error.response?.data?.message || error.message || "Failed to update password")
   }

   dispatch(setLoading(false))
   toast.dismiss(toastId)

  }

}

// Google Authentication function
export function googleAuth(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Redirecting to Google...")
    dispatch(setLoading(true))
    
    try {
      const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
      
      if (!googleClientId || googleClientId === 'your-google-client-id-here') {
        toast.dismiss(toastId)
        toast.error("Google authentication is not configured. Please contact the administrator.")
        dispatch(setLoading(false))
        return
      }
      
      // Construct Google OAuth URL
      const redirectUri = `${window.location.origin}/auth/google/callback`
      const scope = 'openid email profile'
      const responseType = 'code'
      
      const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}&access_type=offline&prompt=consent`
      
      toast.dismiss(toastId)
      toast.success("Redirecting to Google...")
      
      // For demo purposes, we'll just show a success message
      // In production, you would actually redirect to Google
      setTimeout(() => {
        toast.success("Google authentication feature coming soon!")
        dispatch(setLoading(false))
      }, 1500)
      
      // Uncomment this line for actual Google OAuth redirect:
      // window.location.href = googleAuthUrl
      
    } catch (error) {
      console.log("GOOGLE AUTH ERROR............", error)
      toast.error("Failed to connect with Google")
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// Handle Google OAuth callback (would be used in a callback component)
export function handleGoogleCallback(code, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying Google account...")
    dispatch(setLoading(true))
    
    try {
      // Here you would send the authorization code to your backend
      // const response = await apiconnector("POST", GOOGLE_AUTH_API, { code })
      
      // For demonstration, we'll show a success message
      toast.dismiss(toastId)
      toast.success("Google authentication successful!")
      navigate("/dashboard/my-profile")
      
    } catch (error) {
      console.log("GOOGLE CALLBACK ERROR............", error)
      toast.error("Failed to authenticate with Google")
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}





