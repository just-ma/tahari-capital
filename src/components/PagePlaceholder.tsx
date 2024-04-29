import styled from "styled-components";
import { get100ViewportHeight } from "../utils";

const PagePlaceholder = styled.div`
  width: 100vw;
  height: ${get100ViewportHeight()};
`;

export default PagePlaceholder;
