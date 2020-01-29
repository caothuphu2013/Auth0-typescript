import React, { useState } from "react";

import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
  Container,
  Icon,
  Button
} from "semantic-ui-react";

interface HeaderMobileProps {
  handleLogin: (options?: RedirectLoginOptions) => Promise<void>,
  handleLogout: () => void
}

const HeaderMobile = ({ handleLogin, handleLogout }: HeaderMobileProps) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handlePusherClick = () => {
    if (sidebarOpened) {
      setSidebarOpened(false);
    }
  };

  const handleToggle = () => setSidebarOpened(!sidebarOpened);

  return (
    <Responsive {...Responsive.onlyMobile}>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="uncover"
          inverted
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Explore</Menu.Item>
          <Menu.Item as="a">Plan Trip</Menu.Item>
          <Menu.Item as="a">Sommelier</Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>
        
        <Sidebar.Pusher
          dimmed={sidebarOpened}
          onClick={handlePusherClick}
          style={{ minHeight: "100vh" }}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted onClick={handleLogin}>
                    Log in
                </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }} onClick={handleLogout} >
                    Log out
                </Button>
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Responsive>
  );
};

export default HeaderMobile;