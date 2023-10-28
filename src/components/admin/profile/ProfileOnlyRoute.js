import { useSelector } from "react-redux";
import { selectUserID } from "../../../redux/slice/authSlice";

const ProfileOnlyLink = ({ children, allowIds }) => {
  const userIndentification = useSelector(selectUserID);
   if (allowIds.includes(userIndentification)) 
   {
    return children;
  }

  return null;
};

export default ProfileOnlyLink;
