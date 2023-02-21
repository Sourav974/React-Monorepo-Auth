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
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

/* ========= validations ========= */
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/* ========= react-router-dom ========= */
import { useNavigate } from "react-router-dom";

/* ========= redux ========= */
import { loginAction } from "../redux/authAction";
import { connect } from "react-redux";

/* ========= styling ========= */
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Login = ({ ...props }) => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    props
      .loginAction(data)
      .then((response) => {
        // toast.success("LoggedIn successfully", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 1000,
        // });
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        // toast.error("Something went wrong", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 1000,
        // });
      });
    Formik.resetForm();
  };
  const handleClick = () => {
    window.open("https://www.facebook.com");
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
        <VStack w="full" h="full" p={10} spacing={10} align="center">
          <VStack align="center">
            <Heading>Login</Heading>
          </VStack>
          <Formik
            initialValues={{ username: "", password: "" }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              username: Yup.string() // Format Validation
                .email("Invalid email address format")
                // Required Field Validation
                .required("Email is required"),
              password: Yup.string()
                //Minimum Character Validation
                .min(3, "Password must be 8 characters at minimum")
                .required("Password is required"),
            })}
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
                      <FormLabel>Email Account</FormLabel>
                      <Input
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                        values={values.username}
                        name="username"
                        type="email"
                        autoComplete="off"
                        className={`mt-2 form-control ${
                          touched.username && errors.username
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="username"
                        className="invalid-feedback"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem rowSpan={2}>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          placeholder="Enter Your Password"
                          onChange={handleChange}
                          values={values.password}
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className={`mt-2 form-control ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>

                      <ErrorMessage
                        component="div"
                        name="password"
                        style={{ color: "red" }}
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
                      Login
                    </Button>
                  </GridItem>

                  <div align="center">OR</div>
                  <Flex align="baseline">
                    <FacebookLoginButton onClick={handleClick} />
                  </Flex>
                  <Flex>
                    <GoogleLoginButton onClick={handleClick} />
                  </Flex>
                  <Box>
                    Don't have a WhilterAi account?{" "}
                    <Link color="teal.500" href="/auth/signup">
                      Sign Up
                    </Link>
                  </Box>
                </SimpleGrid>
                <Box flexDirection>
                  Don't Remeber Password?{" "}
                  <Link color="teal.500" href="/auth/forgot">
                    Forgot Password
                  </Link>
                </Box>
              </form>
            )}
          </Formik>
        </VStack>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = () => ({});
const mapActionsToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
