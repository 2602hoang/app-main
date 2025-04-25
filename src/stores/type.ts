export interface Reputation {
  userId: string;
  avgRating: number;
  successfullTrades: number;
  disputesCount: number;
  reportCount: number;
  reputationScore: number;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
  kycStatus: "pending" | "approved" | "rejected";
  status: "active" | "inactive" | "banned";
  roles: string[];
  walletAddress: string | null;
  createdAt: string;
  updatedAt: string;
  reputation: Reputation;
}
