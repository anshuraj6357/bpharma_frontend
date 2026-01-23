import {
  Building2,
  Users,
  CreditCard,
  UtensilsCrossed,
  AlertTriangle,
  Crown,
} from "lucide-react";

export const menuIcons = {
  properties: <Building2 size={20} />,
  tenants: <Users size={20} />,
  payments: <CreditCard size={20} />,
  rooms: <UtensilsCrossed size={20} />,

  // ✅ ADD THESE (IMPORTANT)
  complaints: <AlertTriangle size={20} />,
  subscription: <Crown size={20} />,
};
