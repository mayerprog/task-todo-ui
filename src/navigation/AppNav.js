import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { authAPI } from "../api/usersAPI";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../redux/slices/authSlice";

export default function AppNav() {
  const isAuthSelector = useSelector((state) => state.auth.isAuth);

  // useEffect(() => {
  //   console.log("auth selector in nav", isAuthSelector);
  // }, [isAuthSelector]);

  return (
    <NavigationContainer>
      {isAuthSelector ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
