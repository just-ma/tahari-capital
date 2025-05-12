import styled from "styled-components";
import { useEffect } from "react";
import { get100ViewportHeight } from "../../utils";
import { MEDIA_SIZE } from "../../constants";
import { Helmet } from "react-helmet";

const Page = styled.div`
  max-width: 650px;
  min-height: ${get100ViewportHeight()};
  margin: 150px auto;
  padding: 0 30px;
  cursor: default;

  @media ${MEDIA_SIZE.mobile} {
    margin: 100px auto;
    padding: 0 15px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  color: white;
  font-weight: 100;
  margin-bottom: 30px;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 26px;
  white-space: pre-wrap;
  text-align: justify;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 14px;
    line-height: 20px;
  }
`;

export default function JeremeyTahariPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>JEREMY TAHARI</title>
        <meta
          name="description"
          content="Jeremey Tahari is the managing partner of Tahari Capital. In early 2020, he took on the challenge of restructuring his family’s enterprises, including his father’s eponymous fashion label Elie Tahari, into a multi-industry private-equity firm. Under his leadership, this emergent investment firm, Tahari Capital, explores diverse market opportunities, and is focused on necessary core asset classes for their long-term stability."
        />
      </Helmet>
      <Page>
        <Title>Jeremey Tahari</Title>
        <Description>
          {`Jeremey Tahari is the managing partner of Tahari Capital. In early 2020, he took on the challenge of restructuring his family’s enterprises, including his father’s eponymous fashion label Elie Tahari, into a multi-industry private-equity firm. Under his leadership, this emergent investment firm, Tahari Capital, explores diverse market opportunities, and is focused on necessary core asset classes for their long-term stability.

Tahari is known for his ambitious undertakings, clear strategic thinking, driven management style, and relentless attention to detail, born of his roots in the fashion world where every stitch counts.

Jeremey’s principal role at Tahari Capital is that of the chief executive officer of the fashion conglomerate Elie Tahari – which grosses over $1B annually – where he not only leads strategic decisions but also leads the creative direction of the brand.

Separately, Jeremey founded and manages the firm’s $300M real estate portfolio, actively acquiring international properties across all asset classes. Founded in 2022, Tahari Realty is a full-service real estate brokerage that has facilitated over $250M+ in transactional volume. The brokerage offers capital advisory, residential sales and leasing, investment sales, and commercial leasing.

In addition, Jeremey manages the day-to-day operations of Tahari Logistics, a third-party logistics firm that manages more than 50 international luxury brands, and fulfills over 10 million units annually.

Tahari was born and raised in New York City, later moving to the United Kingdom to finish his high school education and A levels at Clifton College, and then returning to his hometown to attend New York University, completing a degree in Ethical Real Estate Development.`}
        </Description>
      </Page>
    </>
  );
}
