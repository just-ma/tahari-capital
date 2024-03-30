import EightyEightUniverityNYSrc from "../../assets/images/88-university-ny.jpg";
import ZOAHouseTelAvivSrc from "../../assets/images/zoa-house-tel-aviv.jpg";
import HoldingsDetailsPage from "./HoldingsDetailsPage";

const HOLDINGS = [
  {
    label: "294 East Houston",
    src: EightyEightUniverityNYSrc,
  },
  {
    label: "515 West 47th Street",
    src: ZOAHouseTelAvivSrc,
  },
];

export default function CommercialHoldingsPage() {
  return <HoldingsDetailsPage holdings={HOLDINGS} />;
}
