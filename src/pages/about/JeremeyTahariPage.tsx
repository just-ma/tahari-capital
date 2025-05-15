import styled from "styled-components";
import { useEffect } from "react";
import { get100ViewportHeight } from "../../utils";
import { MEDIA_SIZE } from "../../constants";
import { Helmet } from "react-helmet";
import useGetDocument from "../../sanity/useGetDocument";
import { AboutJeremeyDefinition } from "../../sanity";
import { PortableText } from "@portabletext/react";

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

  > p {
    margin: 26px 0;
  }

  @media ${MEDIA_SIZE.mobile} {
    font-size: 14px;
    line-height: 20px;

    > p {
      margin: 20px 0;
    }
  }
`;

export default function JeremeyTahariPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { data } = useGetDocument<AboutJeremeyDefinition>("aboutJeremey");

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
        <Title>{data?.title}</Title>
        <Description>
          {data && <PortableText value={data.description} />}
        </Description>
      </Page>
    </>
  );
}
