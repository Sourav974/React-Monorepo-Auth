import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  Flex,
  Box,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ReactCodeInput from "react-verification-code-input";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ForgotPassword } from "../redux/authAction";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleForgot = (values) => {
    const username = values.username;

    props
      .ForgotPassword(username)
      .then((response) => {})
      .catch((error) => {
        console.log("error");
      });
    setOpen(true);
  };

  return (
    <>
      <Modal isOpen={open} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verification Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            We've just sent a verification code to your email address.
            <div>
              {" "}
              <ReactCodeInput />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
          <VStack w="full" h="full" p={10} spacing={10} align="center">
            <VStack spacing={2} align="center">
              <Heading>Forgot Password</Heading>
            </VStack>
            <Formik
              initialValues={{ email: "" }}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({})}
              onSubmit={handleForgot}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                isSubmitting,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <SimpleGrid rows={1} rowGap={4}>
                    <GridItem rowSpan={2}>
                      <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          placeholder="Enter Your Email"
                          onChange={handleChange}
                          values={values.email}
                          name="email"
                          type="email"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem rowSpan={2}>
                      <Button
                        type="submit"
                        variant="primary"
                        width="full"
                        size="lg"
                      >
                        Send a Code
                      </Button>
                    </GridItem>
                  </SimpleGrid>
                </form>
              )}
            </Formik>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

const mapStateToProps = (state) => ({});
const mapActionsToProps = {
  ForgotPassword,
};
export default connect(mapStateToProps, mapActionsToProps)(ForgotPasswordPage);
