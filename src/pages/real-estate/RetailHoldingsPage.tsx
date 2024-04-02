import OneMainEastHamptonSrc from "../../assets/images/1-main-east-hampton.jpg";
import FortySixMainEastHamptonSrc from "../../assets/images/46-main-east-hampton.jpg";
import FortyEightMainEastHamptonSrc from "../../assets/images/48-main-east-hampton.jpg";
import FiftyFourMainEastHamptonSrc from "../../assets/images/54-main-east-hampton.jpg";
import FiftyThreeCircleEastHamptonSrc from "../../assets/images/53-circle-east-hampton.jpg";
import HoldingsDetailsPage from "./HoldingsDetailsPage";

const HOLDINGS = [
  {
    label: "1 Main St, East Hampton",
    src: OneMainEastHamptonSrc,
  },
  {
    label: "46 Main St, East Hampton",
    src: FortySixMainEastHamptonSrc,
  },
  {
    label: "48 Main St, East Hampton",
    src: FortyEightMainEastHamptonSrc,
  },
  {
    label: "54 Main St, East Hampton",
    src: FiftyFourMainEastHamptonSrc,
  },
  {
    label: "53 The Circle, East Hampton",
    src: FiftyThreeCircleEastHamptonSrc,
  },
];

export default function RetailHoldingsPage() {
  return <HoldingsDetailsPage title="Retail" holdings={HOLDINGS} />;
}
