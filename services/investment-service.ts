import axios from "@/lib/axios";

export type InvestmentCard = {
  cropNameEnglish: string;
  farmerName: string;
  farmerId: number;
  approvedId: number;
  totalValue: number;
  defineShares: number;
  cropGroupImage: string;
  existShare: number;
};

export type InvestmentRequestInfo = {
  farmerId: number;
  farmerDistrict: string | null;
  farmerName: string | null;
  requestId: number;
  extentha?: number | null;
  extentac?: number | null;
  extentp?: number | null;
  expectedYield?: number | null;
  startDate?: string | null;
  totValue: number | string;
  // varietyNameEnglish?: string | null;
  cropNameEnglish?: string | null;
  // srtName?: string | null;
  defineShares: number;
  minShare: number | string;
  maxShare: number | string;
  oneShare: number | string;
  fillShares: number | string | null;
  ongoingCultivations: OngoingCultivation[];
};

export type OngoingCultivation = {
  id: number;
  cropNameEnglish: string;
};

export type InvestmentRequestBundle = {
  investmentInfo: InvestmentRequestInfo | null;
  ongoingCultivations: OngoingCultivation[];
};

export type CreateInvestmentPayload = {
  reqId: number;
  investerName: string;
  nic: string;
  nicFront?: string | null;
  nicBack?: string | null;
  shares: number;
  totInvt: number;
  expextreturnInvt: number;
  internalRate: number;
  bankSlip?: string | null;
};

export interface InvestmentSubmitPayload {
  reqId: number;
  investerName: string;
  nic: string;
  shares: number;
  totInvt: number;
  expextreturnInvt: number;
  internalRate: number;
  nicFront: File;
  nicBack: File;
  bankSlip: File;
}

export const getInvestmentCards = async (
  token: string | null,
): Promise<InvestmentCard[]> => {
  // if (!token) {
  //   throw new Error("Authentication required");
  // }

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

export const getInvestmentRequestInfo = async (
  requestId: string | number,
  token: string | null,
): Promise<InvestmentRequestBundle | null> => {
  if (!token) throw new Error("Authentication required");

  const res = await axios.get<InvestmentRequestBundle>(
    `/investment/investment-request-infomation/${requestId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

const hasFiles = (
  p: Partial<InvestmentSubmitPayload>,
): p is InvestmentSubmitPayload => {
  return !!(p.nicFront && p.nicBack && p.bankSlip);
};

export async function createInvestment(
  token: string,
  p: Partial<InvestmentSubmitPayload>,
): Promise<{ id: number; message: string }> {
  if (!hasFiles(p)) {
    throw new Error("Missing required files: nicFront, nicBack, bankSlip");
  }

  const fd = new FormData();
  fd.append("reqId", String(p.reqId));
  fd.append("investerName", p.investerName!);
  fd.append("nic", p.nic!);
  fd.append("shares", String(p.shares));
  fd.append("totInvt", String(p.totInvt));
  fd.append("expextreturnInvt", String(p.expextreturnInvt));
  fd.append("internalRate", String(p.internalRate));
  fd.append("nicFront", p.nicFront);
  fd.append("nicBack", p.nicBack);
  fd.append("bankSlip", p.bankSlip);

  const res = await axios.post("/investment/post-investment", fd, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
