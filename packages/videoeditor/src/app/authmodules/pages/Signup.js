import React, {useState} from "react";
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
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

/* ========= validations ========= */
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

/* ========= redux ========= */
import { connect } from "react-redux";
import { registerAction } from "../redux/authAction";

/* ========= react-router-dom ========= */
import { useNavigate } from "react-router-dom";

/* ========= styling ========= */
// import { toast } from "react-toastify";

const Signup = ({ ...props }) => {
  const navigate = useNavigate();
  const handleSignup = (values) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    props
      .registerAction(data)
      .then(() => {
        // toast.success("LoggedIn successfully")
        navigate("/auth/login", { replace: true });
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleClick = () => {
    window.open("https://www.facebook.com");
  };

  const [showPassword, setShowPassword] = useState(false);



  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
        <VStack w="full" h="full" p={10} spacing={10} align="center">
          <VStack spacing={2} align="center">
            <Heading>Signup</Heading>
          </VStack>
          <Formik
            initialValues={{
              usernamename: "",
              email: "",
              password: "",
            }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              username: Yup.string() //Format Validation
                .max(15, "Maximum 15 characters allowed")
                // Required Field validation
                .required("Username is required"),

              email: Yup.string() //Format Validation
                .email("Invalid email address format")
                // Required Field validation
                .required("Email is required"),

              password: Yup.string()
                //Minimum Character Validation
                .min(3, "Password be 3 characters at minimum")
                .required("Password is required"),
            })}
            onSubmit={handleSignup}
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
                        placeholder="Enter Your Name"
                        onChange={handleChange}
                        values={values.username}
                        name="username"
                        type="text"
                        autoComplete="off"
                        className={`mt-2 form-control ${
                          touched.username && errors.username ? "is-valid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="username"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem rowSpan={2}>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                        values={values.email}
                        name="email"
                        type="email"
                        autoComplete="off"
                        className={`mt-2 form-control ${
                          touched.email && errors.email ? "is-valid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        style={{ color: "red" }}
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
                        className="invalid-feedback"
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
                      Signup
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
                    Already have a WhilterAi account?{" "}
                    <Link color="teal.500" href="/auth/login">
                      Login
                    </Link>
                  </Box>
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
  registerAction,
};
export default connect(mapStateToProps, mapActionsToProps)(Signup);
