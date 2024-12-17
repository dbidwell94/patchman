import { Box, Button, MenuItem, Popper, Select, styled, TextField, Typography, CircularProgress } from "@mui/material";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import { HttpMethod, useRequestBody } from "@/hooks/useRequestBody";
import { useState, useEffect, useRef, ChangeEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";

const urlBarSchema = yup.object().shape({
  method: yup.string().required().oneOf(Object.values(HttpMethod)),
  url: yup
    .string()
    .matches(/^https?:\/\/(www\.)?[\w-]+(\.[\w+-]+)*?\.\w+(\/.*)?$/, "Enter a correct URL")
    .required("Please enter a URL"),
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
  const [[requestBody, setRequestBody], sendRequest] = useRequestBody();
  const [formValues, setFormValues] = useState({
    url: requestBody.url,
    method: requestBody.method,
  });
  const [formErrors, setFormErrors] = useState({
    url: "",
    method: "",
  });
  const [requestLoading, setRequestLoading] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    setRequestBody((prev) => ({
      ...prev,
      url: formValues.url,
      method: formValues.method,
    }));
  }, [formValues.method, formValues.url]);

  const submitDisabled = useMemo(() => {
    if (requestLoading) return true;

    try {
      urlBarSchema.validateSync(formValues);
      return false;
    } catch (_) {
      return true;
    }
  }, [requestLoading, formErrors]);

  const urlInputRef = useRef(null);
  const methodInputRef = useRef(null);

  async function onSubmit(evt: any) {
    evt.preventDefault();
    setRequestLoading(true);
    await sendRequest();
    setRequestLoading(false);
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    evt.preventDefault();
    const { name, value } = evt?.currentTarget || evt?.target;

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
    <UrlBarWrapper data-testid="urlBar" as="form">
      <Select
        size="small"
        sx={{ width: "7rem" }}
        value={formValues.method}
        onChange={(e: any) => handleChange(e)}
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
      <Popper open={Boolean(formErrors.method)} anchorEl={methodInputRef.current}>
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
          disabled={submitDisabled}
          sx={{ height: "100%", marginLeft: "1rem", position: "relative" }}
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
          {t("send")}
          {requestLoading && <CircularProgress size={30} sx={(theme) => ({ position: "absolute" })} />}
        </Button>
        <Button variant="outlined" sx={{ height: "100%" }} endIcon={<SaveIcon />}>
          {t("save")}
        </Button>
      </Box>
    </UrlBarWrapper>
  );
}
