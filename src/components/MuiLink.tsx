import React from "react";
import { LinkProps, Link } from "react-router-dom";

const MuiLink = React.forwardRef(
  (props: Omit<LinkProps, "to"> & { href: string }, ref) => {
    const { href, ...rest } = props;
    return <Link to={href} {...rest} ref={ref as any} />;
  }
);

export default MuiLink;
