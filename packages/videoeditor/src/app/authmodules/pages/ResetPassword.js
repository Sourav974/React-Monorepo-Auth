import React from "react";
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ResetPassword } from "../redux/authAction";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = ({ ...props }) => {
  const navigate = useNavigate();
  const handleLogin = (values) => {
    const username = values.username;
    const password = values.password;

    props
      .ResetPassword(username, password)

      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
        <VStack w="full" h="full" p={10} spacing={10} align="center">
          <VStack spacing={2} align="center">
            <Heading>Reset Password</Heading>
          </VStack>
          <Formik
            initialValues={{ username: "", password: "" }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({})}
            onSubmit={handleLogin}
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
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder="Enter user name"
                        onChange={handleChange}
                        values={values.username}
                        name="username"
                        type="email"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem rowSpan={2}>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <Input
                        placeholder="Enter new password"
                        onChange={handleChange}
                        values={values.password}
                        name="password"
                        type="password"
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
                      Done
                    </Button>
                  </GridItem>
                </SimpleGrid>
              </form>
            )}
          </Formik>
        </VStack>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => ({});
const mapActionsToProps = {
  ResetPassword,
};
export default connect(mapStateToProps, mapActionsToProps)(ResetPasswordPage);
