// navigation.js
import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToDashboard = (dashboardId) => {
    navigate(`/dashboard/${dashboardId}`);
  };

  const goToHome = () => {
    navigate('/');
  };

  // Add more navigation functions as needed

  return { goToDashboard, goToHome };
};
