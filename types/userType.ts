import { User,Transaction } from "@prisma/client";

export type RegisterUserType = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type DashboardUserType = {
  sentTransaction: Transaction[];
  receivedTransaction: Transaction[];
};

export type DashboardType = User & DashboardUserType;
