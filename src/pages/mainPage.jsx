import React  from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { lang } from "../constants/langOptions";
import { useSelector } from "react-redux";
import HomeImage from "../assets/homeImage.jpg";

function MainPage() {
  const [isNonMobile] = useMediaQuery("(min-width: 900px)");
  const language = useSelector((state) => state.language.language);
  return (
    <Box  w={"100%"}  h={isNonMobile ? 540 : 'fit-content'} flex={1}  mt={20} display={"flex"}   flexDirection={isNonMobile ? "row" : "column"} alignItems={'center'}>
      <Box
        px={50}
        flex={0.5}
        h={"100%"}
        display={"flex"}
        gap={30}
        justifyContent="center"
        flexDirection="column"
      >
        <Text fontWeight={"bold"} fontSize={50}>
          {lang[language]['homeTxt1']}
        </Text>
        <Text fontWeight={"bold"} color={"text.60"} fontSize={25}>
        {lang[language]['homeTxt2']}
        </Text>
      </Box>
      <Box
        flex={0.5}
        display={"flex"}
        justifyContent="center"
        alignItems={isNonMobile ? "flex-end" : "center"}
        flexDirection="column"
        px={isNonMobile ? 0 : 40}
        my={isNonMobile ? 0 : 40}

        h={'100%'}
        
      >
        <Image
          h={isNonMobile ? 450 : 300}
          borderBottomLeftRadius={language === "eng" ? 100 : 0}
          borderBottomRightRadius={language === "eng" ? 0 : 100}
          boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"}
          src={HomeImage}
        />
      </Box>
    </Box>
  );
}
export default MainPage;
