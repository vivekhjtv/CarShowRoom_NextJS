"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session || !session.user) return <div>Please Sign In </div>;

  return <div>Dashboard Page</div>;
};

export default Dashboard;

// 'use client';
// import { useSession } from 'next-auth/react';
// export default function Dashboard() {
//   const { data: session } = useSession();
//   if (!session || !session.user) return <div>Please Sign In </div>;
//   return <div>Dashboard Page</div>;
// }
