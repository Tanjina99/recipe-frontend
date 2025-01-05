import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthProvider = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserToke = () => {
      try {
        const token = Cookies.get("accessToken");
        console.log(token);
        if (token) {
          const decode = jwtDecode(token);
          console.log("Decoded user", decode);
          setUser(decode);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    getUserToke();
  }, []);
  return { user, setUser };
};

export default AuthProvider;
