import { Button, Card, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { render } from 'react-dom';
import Container from './Container/container';
import { createTheme } from './theme';
import useSettings from './theme/useSetting';

const App = () => {
  const { settings } = useSettings();
  return (
    <ThemeProvider theme={createTheme(settings)}>
      <Container>
        <Card style={{ height: "100%", textAlign: "center" }}>
          <Button variant="contained" color="primary">
            打开
          </Button>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
