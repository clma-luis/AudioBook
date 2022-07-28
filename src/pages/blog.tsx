import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const blog = () => {
  return <div>blog</div>;
};

export default blog;

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
