import axios from "@/lib/axios";
import { environment } from "@/environment/environment";
import { headers } from "next/headers";

export type InvestmentCard = {
  cropNameEnglish: string;
  farmerName: string;
  approvedId: number;
  totalValue: number;
  defineShares: number;
  cropGroupImage: string;
  existShare: number;
};

export const getInvestmentCards = async (
  token: string | null,
): Promise<InvestmentCard[]> => {
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.get("/investment/get-all-investment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch investment cards");
  }
};
