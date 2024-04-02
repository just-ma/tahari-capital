import Src1 from "../../assets/images/294-east-houston.jpg";
import Src2 from "../../assets/images/515-west-47th.jpg";
import Src3 from "../../assets/images/347-east-105th.jpg";
import Src4 from "../../assets/images/ferrari-second.jpg";
import Src5 from "../../assets/images/1886-1888-park.jpg";
import HoldingsDetailsPage from "./HoldingsDetailsPage";

const HOLDINGS = [
  {
    label: "294 East Houston",
    src: Src1,
  },
  {
    label: "515 West 47th Street",
    src: Src2,
  },
  {
    label: "347 East 105th Street",
    src: Src3,
  },
  {
    label: "Ferrari Second Ave",
    src: Src4,
  },
  {
    label: "1886 & 1888 Park Ave",
    src: Src5,
  },
];

export default function ResidentialHoldingsPage() {
  return <HoldingsDetailsPage title="Residential" holdings={HOLDINGS} />;
}
