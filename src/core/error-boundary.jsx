import { Component } from "react";
import propTypes from "prop-types";
import { Box, Button, Container, Typography } from "@mui/material";
import { ErrorOutlined } from "@mui/icons-material";

export class ErrorBoundary extends Component {
  static propTypes = {
    children: propTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      intents: 0,
    };

    this.handleTryAgainClick = this.handleTryAgainClick.bind(this);
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(/* error, errorInfo */) {
    // ... log to backend error
  }

  handleTryAgainClick() {
    this.setState((state) => ({
      ...state,
      hasError: false,
      intents: state.intents + 1,
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box display="flex" my={5}>
            <ErrorOutlined
              sx={{ marginTop: 1, marginRight: 2, fontSize: "50pt" }}
            />
            <Box>
              <Typography variant="h3" display="block">
                Oops! Something gone wrong!
              </Typography>
              <Typography variant="caption" display="block">
                Please contact with support
              </Typography>
              {this.state.intents < 1 && (
                <Button onClick={this.handleTryAgainClick}>Try again</Button>
              )}
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
