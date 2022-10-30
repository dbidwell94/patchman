import { Box, styled } from "@mui/material";

export default styled(Box)`
  border-bottom: thin solid ${({ theme }) => theme.palette.grey[900]};
  padding: 0 1rem;
  width: 100%;
`;
