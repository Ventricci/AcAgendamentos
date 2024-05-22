import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { GetServerSideProps } from "next";
import NextAuth from "next-auth";

const handler = async () => {
  try {
    const post = await prisma.scheduling.findMany({});
    console.log("post");
    return NextResponse.json({ data: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export { handler as GET, handler as POST };
