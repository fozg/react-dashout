import React, { useEffect } from "react";
import Page from "../models/Page";

import NavigationItem from "./NavigationItem";
import Layout from "./Layout";

import AppService from "../models/AppServices";

export const Service = new AppService();

type Props = { onReady?: Function };

const Layda: React.FC<Props> = ({ onReady }) => {
  Service.init(() => {
    onReady && onReady();
  });
  
  const site = Service.getSite();
  const pages = site.usePages();

  useEffect(() => {
    console.log(pages);
  }, [pages]);

  return (
    <Layout
      left={
        <>
          {pages &&
            pages.map((page: Page) => (
              <NavigationItem page={page} key={page.key} />
            ))}
        </>
      }
    >
      Test
    </Layout>
  );
};

export default Layda;
