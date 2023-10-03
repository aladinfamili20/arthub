import { useSelector } from "react-redux";
import { selectEmail } from "../../../redux/slice/authSlice";

const ProfileOnlyLink = ({ children, allowedEmails }) => {
  const userEmail = useSelector(selectEmail);

  if (allowedEmails.includes(userEmail)) {
    return children;
  }

  return null;
};

export default ProfileOnlyLink;
