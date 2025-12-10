import { useEffect, useState } from "react";
import { useUser } from "../domain/UseCases/userCases/useUser";
import { useJWT } from "../services/useJWT";

export const useGetUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getUser } = useUser();
  const [userFromJwt, setUserFromJwt] = useState(null);
  const jwtService = useJWT();

 useEffect(() => {
    const fetchUser = async () => {
      const resJWT = await jwtService.getJWTAsJson();
      setUserFromJwt(resJWT);

      if (resJWT) {
        const response = await getUser(resJWT.uid);
        if (response) setCurrentUser(response);
        console.log(response);
      }
    };
    fetchUser();
  }, []);

  return currentUser;
};

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { getUsers } = useUser();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getUsers();
      if (response) setAllUsers(response);
    };
    fetchAllUsers();
  }, []);

  return allUsers;
};

export const useGetAllNewUsersThisMonth = () => {
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const { newUsersThisMonth: getNewUsersThisMonth } = useUser();

  useEffect(() => {
    const fetchNewUsersThisMonth = async () => {
      const response = await getNewUsersThisMonth();
      if (response) setNewUsersThisMonth(response);
      console.log(response);
    };
    fetchNewUsersThisMonth();
  }, []);

  return newUsersThisMonth;
};
