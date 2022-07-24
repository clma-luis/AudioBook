import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../shared/components/icons/facebook";
import { Google as GoogleIcon } from "../shared/components/icons/google";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import React from "react";

export interface ProvidersType {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export const Login = ({ providers }: any) => {
  const { data } = useSession();
  console.log("data", data?.user);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      // router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <br />
          <br />
          <br />
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Iniciar Sesión
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Inicia sesión con:
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {Object.values(providers).map((provider: any) => (
                  <React.Fragment key={provider.name}>
                    <Button
                      color="info"
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={() => signIn(provider.id)}
                      size="large"
                      variant="contained"
                    >
                      Inicia sesión con {provider.name}
                    </Button>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                o inicia sesión con tu correo electrónico
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Correo"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Contraseña"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Iniciar sesión
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              ¿No tienes una cuenta?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Crear
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
