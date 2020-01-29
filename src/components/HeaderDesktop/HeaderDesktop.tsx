import React, { useState } from 'react';

import { Responsive, Visibility, Segment, Menu, Button, Container } from 'semantic-ui-react';

import { useAuth0 } from "../Auth/Auth0Wrapper";

interface HeaderDesktopProps {
  handleLogin: (options?: RedirectLoginOptions) => Promise<void>;
  handleLogout: () => void;
}

const HeaderDesktop = ({ handleLogin, handleLogout }: HeaderDesktopProps) => {
  const [fixed, setFixed] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  return (
    <Responsive {...Responsive.onlyComputer}>
      <Visibility
        once={false}
        onBottomPassed={() => setFixed(true)}
        onBottomPassedReverse={() => setFixed(false)}
      >
        <Segment inverted textAlign="center" vertical style={{ minHeight: 700, padding: "1em 0em" }}>
          <Menu
            fixed={fixed ? "top" : undefined}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Item as='a' active>
                Home
                </Menu.Item>
              <Menu.Item as='a'>Explore</Menu.Item>
              <Menu.Item as='a'>Plan Trip</Menu.Item>
              <Menu.Item as='a'>Sommelier</Menu.Item>
              <Menu.Item position='right'>
                {!isAuthenticated && <Button as='a' inverted={!fixed} onClick={handleLogin}>
                  Log in
                  </Button>
                }
                { user && <span>{user.name}</span> }
                {isAuthenticated && <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: "0.5em" }} onClick={handleLogout} >
                  Log out
                </Button>}
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      </Visibility>
    </Responsive>
  )
}

export default HeaderDesktop;