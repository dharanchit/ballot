import React from "react";
import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderTop: "1px solid #e6e6e5",
    flexShrink: 0,
    marginTop: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-between",
  },
  twitter: {
    marginRight: theme.spacing(1),
  },
}));

const Footer = ({ programID, voteAccount }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <Typography variant="caption">
            Made by{" "}
            <Link underline="always" href="">
              Anchit Dhar
            </Link>
            {" | "}
            Powered by{" "}
            <Link underline="always" href="https://solana.com/">
              Solana
            </Link>
            {" | "}
            <Link
              underline="always"
              href={`https://explorer.solana.com/address/${programID.toString()}`}
            >
              Program ID
            </Link>
            {" | "}
            <Link
              underline="always"
              href={`https://explorer.solana.com/address/${voteAccount?.publicKey.toString()}`}
            >
              Vote Account
            </Link>
            {" | "}
            <Link underline="always" href="https://www.freepik.com">
              Icon Credits
            </Link>
          </Typography>
          <Box>
            <Link className={classes.twitter}>
              <TwitterIcon />
            </Link>
            <Link href="https://github.com/bfriel/crunchy-vs-smooth">
              <GitHubIcon />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
