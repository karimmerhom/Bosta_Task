import React, {useState} from "react";
import {
  Box,
  Text,
  useMediaQuery,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { lang } from "../../constants/langOptions";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/actions/languageActions";
import { useNavigate } from "react-router";
import EnglishLogo from "../logoSVG/logoSVG_english";
import ArabicLogo from "../logoSVG/logoSVG_arabic";

function NavBar() {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const [isNonMobile] = useMediaQuery("(min-width: 880px)");
  const [shippingNumber, setShippingNumber] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();
  const trackShipmentButton = () => {
    return (
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button>
            <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
              {lang[language]["trackShipment"]}
              {isOpen ? (
                language === "eng" ? (
                  <ChevronRightIcon color="icon.80" ml={5} />
                ) : (
                  <ChevronLeftIcon color="icon.80" ml={5} />
                )
              ) : (
                <ChevronDownIcon color="icon.80" ml={5} />
              )}
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w={300}
          bg="primary.100"
          borderRadius={10}
          p={10}
          borderWidth={3}
          borderStyle={"solid"}
          borderColor={"border.100"}
          display={"flex"}
        >
          <Box
            dir={"ltr"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={language === "eng" ? "flex-start" : "flex-end"}
            mb={10}
          >
            <Text cursor={"pointer"}>{lang[language]["trackShipment"]}</Text>
            <Box h={40} mt={15} display={"flex"}>
              <Input
                dir={language === "eng" ? "ltr" : "rtl"}
                h={"100%"}
                borderWidth={2}
                mr={isNonMobile ? 0 : -5}
                borderRightWidth={0}
                _focus={{ borderColor: "border.80" }}
                _focusVisible={{
                  outline: "none",
                }}
                _hover={{
                  borderColor: "border.80",
                  borderWidth: 2,
                  borderRightWidth: 0,
                }}
                borderColor={"border.100"}
                borderTopLeftRadius={5}
                borderBottomLeftRadius={5}
                textIndent={5}
                value={shippingNumber}
                onChange={(e) =>setShippingNumber(e.target.value)}
                placeholder={lang[language]["trackingNo"]}
              />
              <IconButton
                h={"100%"}
                w={40}
                borderTopRightRadius={5}
                borderBottomRightRadius={5}
                bg="button.100"
                aria-label="Search database"
                onClick={()=>navigate(`trackShipment/${shippingNumber}`)}
                icon={<SearchIcon />}
              />
            </Box>
          </Box>
        </PopoverContent>
      </Popover>
    );
  };
  return (
    <Box
      dir={language === "eng" ? "ltr" : "rtl"}
      h={62}
      display={"flex"}
      flex={1}
      flexDirection={"row"}
      alignItems={"center"}
      bg={"primary.100"}
      borderBottom={2}
      borderColor={"border.100"}
      borderStyle={"solid"}
      pl={20}
      pr={20}
    >
      <Box
        display={"flex"}
        gap={48}
        flexDirection={"row"}
        alignItems={"center"}
        flex={isNonMobile ? 0.6 : 0.4}
      >
        <Box onClick={()=>navigate(`/`)} cursor={'pointer'}>{language === "eng" ?<EnglishLogo /> : <ArabicLogo />}</Box>
        <Box
          display={isNonMobile ? "flex" : "none"}
          gap={28}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
            {lang[language]["home"]}
          </Text>
          <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
            {lang[language]["prices"]}
          </Text>
          <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
            {lang[language]["contactSales"]}
          </Text>
        </Box>
      </Box>
      <Box display={isNonMobile ? "flex" : "none"} flex={0.4}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={20}
          alignItems={"center"}
          justifyContent={"flex-end"}
          width={"100%"}
        >
          {trackShipmentButton()}
          <Box h={30} w={"2px"} bg={"border.100"} />

          <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
            {lang[language]["signIn"]}
          </Text>
          <Text
            fontWeight={"bold"}
            cursor={"pointer"}
            color={"text.80"}
            fontSize={20}
            onClick={() => {
              dispatch(setLanguage(language === "eng" ? "arb" : "eng"));
            }}
          >
            {lang[language]["lang"]}
          </Text>
        </Box>
      </Box>
      <Box
        flex={isNonMobile ? 0.4 : 0.6}
        display={isNonMobile ? "none" : "flex"}
        justifyContent={"flex-end"}
        gap={20}
      >
        {trackShipmentButton()}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon boxSize={40} color={"icon.100"} />}
          />
          <MenuList
            w={220}
            bg="primary.100"
            borderRadius={10}
            p={10}
            borderWidth={3}
            borderStyle={"solid"}
            borderColor={"border.100"}
            zIndex={2}
          >
            <MenuItem
              py={5}
              borderBottom={3}
              borderStyle={"solid"}
              borderColor={"border.100"}
            >
              <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
                {lang[language]["home"]}
              </Text>
            </MenuItem>
            <MenuItem
              py={5}
              borderBottom={3}
              borderStyle={"solid"}
              borderColor={"border.100"}
            >
              <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
                {lang[language]["prices"]}
              </Text>
            </MenuItem>
            <MenuItem
              py={5}
              borderBottom={3}
              borderStyle={"solid"}
              borderColor={"border.100"}
            >
              <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
                {lang[language]["contactSales"]}
              </Text>
            </MenuItem>

            <MenuItem
              py={5}
              borderBottom={3}
              borderStyle={"solid"}
              borderColor={"border.100"}
            >
              <Text fontWeight={"bold"} cursor={"pointer"} fontSize={20}>
                {lang[language]["signIn"]}
              </Text>
            </MenuItem>
            <MenuItem py={5} dir={language === "eng" ? "rtl" : "ltr"}>
              <Text
                fontWeight={"bold"}
                cursor={"pointer"}
                color={"text.80"}
                fontSize={20}
                onClick={() => {
                  dispatch(setLanguage(language === "eng" ? "arb" : "eng"));
                }}
              >
                {lang[language]["lang"]}
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}
export default NavBar;
