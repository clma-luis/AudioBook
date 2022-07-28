import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const donaciones = ({ session }: any) => {
  console.log("session session", session);
  return <div>donaciones</div>;
};

export default donaciones;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session === null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
