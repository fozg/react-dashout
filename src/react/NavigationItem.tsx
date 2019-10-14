import React from "react";
import Page from "../models/Page";
import NavLink from "./default/NavLink";

type IProps = {
  page: Page;
  level?: number;
};

const NavigationItem: React.FC<IProps> = ({ page, level = 0 }) => {
  const childs = page.usePages();

  return (
    <div>
      {page.navigationComponent ? (
        page.navigationComponent({page, level})
      ) : (
        <NavLink page={page} level={level}/>
      )}
      <div>
        {childs.map((page_c, idx) => (
          <NavigationItem page={page_c} level={level + 1} />
        ))}
      </div>
    </div>
  );
};

export default NavigationItem;
