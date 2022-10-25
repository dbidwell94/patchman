import { styled, Box } from "@mui/material";

interface IRequestResponseProps {
  height: number;
}

const RequestResponseWrapper = styled(Box)``;

export default function RequestResponse(props: IRequestResponseProps) {
  return (
    <RequestResponseWrapper
      height={`${props.height}%`}
    ></RequestResponseWrapper>
  );
}
