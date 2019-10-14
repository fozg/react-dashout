import React, { ReactElement } from "react";
import { Fill, ViewPort, Top, LeftResizable } from "react-spaces";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Service } from "./Layda";
import Page from "../models/Page";

const Layout: React.FC<{ left?: ReactElement }> = ({ children, left }) => {
  const site = Service.getSite();
  const pages = site.usePages();

  return (
    <Router>
      <ViewPort>
        <Top size="40px" style={{ background: "#000" }}></Top>
        <ViewPort>
          <LeftResizable
            maximumSize={500}
            minimumSize={250}
            size="250px"
            style={{
              borderRight: "1px solid #eee",
              padding: 10,
              background: "#f5f5f5"
            }}
          >
            {left}
          </LeftResizable>
          <Fill style={{ padding: 10 }}>
            <Switch>
              {pages.map((page: Page) => (
                <Route
                  key={page.key}
                  path={page.path}
                  component={page.component}
                  exact={page.exact}
                />
              ))}
            </Switch>
          </Fill>
        </ViewPort>
      </ViewPort>
    </Router>
  );
};

export default Layout;
