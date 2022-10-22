import { Box, styled } from "@mui/material";
import BodyBuilder from "./BodyBuilder";
import UrlBar from "./urlBar";

const RequestBuilderWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface IRequestContext {
  url: string;
  params: Record<string, string>;
  headers: Record<string, number | string>;
}

export default function RequestBuilder() {
  return (
    <RequestBuilderWrapper>
        <UrlBar />
        <BodyBuilder />
    </RequestBuilderWrapper>
  );
}
