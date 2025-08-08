import { toast } from "react-hot-toast"
import { apiconnector } from '../apiconnector';
import { courseEndpoints } from '../apis';

export const getCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "GET",
      `${courseEndpoints.COURSE_DETAILS_API}/${courseId}`
    );

    console.log("COURSE DETAILS API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    
    toast.success("Course Details Fetched");
    return response.data.data;
  } catch (error) {
    console.log("GET_COURSE_DETAILS API ERROR............", error);
    toast.error(error.response?.data?.message || "Could not fetch course details");
    throw error;
  }
  finally {
    toast.dismiss(toastId);
  }
};
