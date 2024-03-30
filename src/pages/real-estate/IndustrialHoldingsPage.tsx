import SixteenBleekerNJ from "../../assets/images/16-bleeker-nj.jpg";
import HoldingsDetailsPage from "./HoldingsDetailsPage";

const HOLDINGS = [
  {
    label: "16 Bleeker St, NJ",
    src: SixteenBleekerNJ,
  },
];

export default function IndustrialHoldingsPage() {
  return <HoldingsDetailsPage holdings={HOLDINGS} />;
}
