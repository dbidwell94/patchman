import {
  Box,
  Button,
  MenuItem,
  Popper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";

// enum of supported HTTP methods
enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
  Options = "OPTIONS",
}

const urlBarSchema = yup.object().shape({
  method: yup.string().required().oneOf(Object.values(HttpMethod)),
  url: yup
    .string()
    .required("This field is required")
    .url("This is not a valid URL"),
});

const UrlBarWrapper = styled(Box)`
  display: flex;
  padding: 1.5rem 1rem;
  border-bottom: thin solid ${({ theme }) => theme.palette.grey[900]};
`;

const ErrorText = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
`;

export default function UrlBar() {
  const [formValues, setFormValues] = useState({
    url: "",
    method: HttpMethod.Get,
  });
  const [formErrors, setFormErrors] = useState({
    url: "",
    method: "",
  });

  const submitDisabled = Object.values(formErrors).every((val) => {
    return !Boolean(val);
  });

  const urlInputRef = useRef(null);
  const methodInputRef = useRef(null);

  function handleChange(
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    evt.preventDefault();
    const { name, value } = evt.target;

    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues);

    urlBarSchema
      .validateAt(name, newFormValues)
      .then(() => {
        setFormErrors((oldValues) => {
          return { ...oldValues, [name]: "" };
        });
      })
      .catch((err: yup.ValidationError) => {
        setFormErrors((oldValues) => {
          return { ...oldValues, [name]: err.message };
        });
      });
  }

  return (
    <UrlBarWrapper component="form">
      <Select
        size="small"
        sx={{ width: "7rem" }}
        value={formValues.method}
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        name="method"
        error={Boolean(formErrors.method)}
        ref={methodInputRef}
      >
        {Object.values(HttpMethod).map((method) => (
          <MenuItem value={method} key={`http-method-${method}`}>
            {method}
          </MenuItem>
        ))}
      </Select>
      <Popper
        open={Boolean(formErrors.method)}
        anchorEl={methodInputRef.current}
      >
        <ErrorText>{formErrors.method}</ErrorText>
      </Popper>

      <TextField
        size="small"
        placeholder="https://example.com/api"
        sx={{ flex: 1 }}
        name="url"
        value={formValues.url}
        onChange={handleChange}
        error={Boolean(formErrors.url)}
        ref={urlInputRef}
      />
      <Popper open={Boolean(formErrors.url)} anchorEl={urlInputRef.current}>
        <ErrorText>{formErrors.url}</ErrorText>
      </Popper>
      <Box sx={{ height: "100%", margin: 0, padding: 0 }}>
        <Button
          variant="contained"
          disabled={!submitDisabled}
          sx={{ height: "100%", marginLeft: "1rem" }}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
        <Button
          variant="outlined"
          sx={{ height: "100%" }}
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </UrlBarWrapper>
  );
}
