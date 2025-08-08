import Sidebar from "../dashboardcompo/Sidebar";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";


export default function Settings() {
  return (


  
    <div className=" bg-richblack-900 flex gap-5   " >
        <div>
   
        </div>
        <div className=" w-[80%] mx-auto " >
      <h1 className=" mt-[20px] mb-8 text-3xl bg-richblack-900 font-medium text-richblack-5">
        Edit Profile
      </h1>

      <div className="  " >
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      </div>


<div className=" mb-[30px] " >
      {/* Profile */}
      <EditProfile />
      </div>

<div className=" mb-[30px] " >
      {/* Password */}
      <UpdatePassword />
</div>
      <div className=" mb-[30px] " >
      {/* Delete Account */}
      <DeleteAccount />
      </div>
      </div>
      </div>
    
  )
}