import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  Spinner,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons'
import { useParams } from "react-router-dom";
import { getShimpment } from "../api/api";
import NotFound from "../assets/notFound.jpg";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { lang } from "../constants/langOptions";
import SupportImage from "../assets/support-img.png";
import "react-toastify/dist/ReactToastify.css";

function TrackingPage() {
  const { shipmentNo } = useParams();
  const [isNonMobile] = useMediaQuery("(min-width: 1200px)");
  const [shipment, setShimpent] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const language = useSelector((state) => state.language.language);


  const getShipmentCall = () => {
    getShimpment(shipmentNo)
      .then((res) => {
        console.log("res: ", res);
        setIsLoading(false);
        if (res.status !== 200) {
          console.log("in");
          toast.error(res.messasge, {
            position: "bottom-center",
          });
        } else {
          setShimpent(res.data);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e.message, {
          position: "bottom-center",
        });
      });
  };

  useEffect(() => {
    getShipmentCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentNo]);


  function TimeSeries() {
    const complete = shipment.TransitEvents[shipment.TransitEvents.length - 1].state === "DELIVERED" || shipment.TransitEvents[shipment.TransitEvents.length - 1].state === "DELIVERED_TO_SENDER" ? true : false
    const { activeStep } = useSteps({
      index: complete ? shipment.TransitEvents.length : 1,
      count: shipment.TransitEvents.length,
    })
      
    return (
      <Stepper flexDir={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'} index={activeStep}>
        {shipment.TransitEvents.map((event, index) => (
          <Step display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'} key={index}>
            <StepIndicator boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"} display={'flex'} alignItems={'center'} justifyContent={'center'} w={50} h={50} borderRadius={50} color={"white"} bg={complete ? "icon.60" : "icon.80"} >
              <StepStatus
                complete={<StepIcon w={30} h={30} />}
                incomplete={<Box bg='white' w={40} h={40} borderRadius={40} />}
                active={<TimeIcon w={30} h={30} />}
              />
            </StepIndicator>

            <Box my={20} display={'flex'} flexDir={'column'} alignItems={'center'}>
            <StepTitle>{new Date(event.timestamp.slice(0, -1)).toLocaleDateString("en-US")+"  "+new Date(event.timestamp.slice(0, -1)).toLocaleTimeString()}</StepTitle>
              <StepTitle>{lang[language][event.state.split("_").join(" ").toLowerCase()]}</StepTitle>
              <StepDescription color={'text.80'}>  {event.reason && lang[language][event.reason]} </StepDescription>
            </Box>

            <StepSeparator w={5} h={100} bg={complete ? "icon.60" : "icon.80"} mb={30} />
          </Step>
        ))}
      </Stepper>
    )
  }



  return (
    <Box
      w={"100%"}
      h={isNonMobile ? "fit-content" : "fit-content"}
      mt={60}
      mb={60}
      display={"flex"}
      flexDirection={isNonMobile ? "row" : "column"}
      alignItems={"center"}
    >
      {isLoading ? (
        <Box
          display={"flex"}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          h={540}
        >
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="border.100"
            color="icon.80"
            w={50}
            h={50}
          />
        </Box>
      ) : (
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {shipment ? (
            <Box
              w={"100%"}
              px={50}
              display={"flex"}
              flexDirection={"column"}
              gap={50}
            >

              <Box><TimeSeries /></Box>

              <Box justifyContent={'space-evenly'} gap={isNonMobile ? 0 : 50} w={"100%"} display={'flex'}  flexWrap={isNonMobile ? 'wrap' : 'unset'} flexDir={isNonMobile ? "row" : "column"}>
                <Box>
                  <Text fontWeight={"bold"} fontSize={25} pl={5} mb={20}>
                    {lang[language]["Shipment Details"]}
                  </Text>
                  <TableContainer
                    w={ "fit-content" }
                    borderWidth={3}
                    borderColor={"border.100"}
                    borderStyle={"solid"}
                    borderRadius={10}
                  >
                    <Table>
                      <Thead>
                        <Tr>
                          <Th
                            bg={"border.100"}
                            minW={150}
                            h={60}
                            alignItems={"center"}
                            textAlign={"start"}
                            px={20}
                          >
                            {" "}
                            {lang[language]["Hub"]}
                          </Th>
                          <Th
                            bg={"border.100"}
                            minW={150}
                            h={60}
                            alignItems={"center"}
                            textAlign={"start"}
                            px={20}
                          >
                            {" "}
                            {lang[language]["Date"]}
                          </Th>
                          <Th
                            bg={"border.100"}
                            minW={150}
                            h={60}
                            alignItems={"center"}
                            textAlign={"start"}
                            px={20}
                          >
                            {" "}
                            {lang[language]["Time"]}
                          </Th>
                          <Th
                            bg={"border.100"}
                            minW={150}
                            h={60}
                            alignItems={"center"}
                            textAlign={"start"}
                            px={20}
                          >
                            {lang[language]["Details"]}
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {shipment.TransitEvents.map((event) => {
                          let dateTime = new Date(event.timestamp.slice(0, -1));
                          let parts = event.state.split("_");
                          let lowerCaseParts = parts.map((part) =>
                            part.toLowerCase()
                          );
                          let concatenatedString = lowerCaseParts.join(" ");

                          return (
                            <Tr>
                              <Td
                                minW={150}
                                h={60}
                                alignItems={"center"}
                                textAlign={"start"}
                                px={20}
                              >
                                {event.hub ? lang[language][event.hub] : "---"}
                              </Td>
                              <Td
                                minW={150}
                                h={60}
                                alignItems={"center"}
                                textAlign={"start"}
                                px={20}
                              >
                                {dateTime.toLocaleDateString("en-US")}
                              </Td>
                              <Td
                                minW={150}
                                h={60}
                                alignItems={"center"}
                                textAlign={"start"}
                                px={20}
                              >
                                {dateTime.toLocaleTimeString()}
                              </Td>
                              <Td
                                minW={150}
                                h={60}
                                alignItems={"center"}
                                textAlign={"start"}
                                px={20}
                              >
                                <Box display={"flex"} flexDir={"column"}>
                                  {lang[language][concatenatedString]}
                                </Box>
                                <Text color={"text.80"} fontSize={12}>
                                  {event.reason && lang[language][event.reason]}
                                </Text>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box display={"flex"} flexDir={"column"}>
                  <Text fontWeight={"bold"} fontSize={25} pl={5} mb={20}>
                    {lang[language]["Shipment Address"]}
                  </Text>
                  <Box
                    mb={30}
                    borderWidth={3}
                    borderColor={"border.100"}
                    borderStyle={"solid"}
                    borderRadius={10}
                    py={20}
                    px={20}
                    h={100}
                    w={isNonMobile ? 400 : "100%"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Text dir={"rtl"}>
                      امبابه شارع طلعت حرب بجوار البرنس منزل 17 بلوك 20 القاهره
                    </Text>
                  </Box>

                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    borderWidth={3}
                    borderColor={"border.100"}
                    borderStyle={"solid"}
                    borderRadius={10}
                    py={20}
                    px={20}
                    gap={20}
                    justifyContent={"space-between"}
                    w={isNonMobile ? 400 : "100%"}
                  >
                    <Text>{lang[language]["Contact support"]}</Text>
                    <Image
                      h={100}
                      borderBottomLeftRadius={language === "eng" ? 100 : 0}
                      borderBottomRightRadius={language === "eng" ? 0 : 100}
                      src={SupportImage}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box h={540}>
              <Image h={isNonMobile ? 450 : 300} src={NotFound} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TrackingPage;
