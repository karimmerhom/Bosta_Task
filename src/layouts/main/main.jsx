import React from "react";
import {Box } from '@chakra-ui/react';
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navBar/navbar";
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

function MainLayout() {
  const language = useSelector((state) => state.language.language);

  return (
    <Box  dir={language === "eng" ? "ltr" : "rtl"} w="100%" >
    <ToastContainer />
    <NavBar/>
    <Outlet />
    </Box>
  );
}

export default MainLayout;
