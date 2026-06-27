import React from "react";
import { Link, NavLink } from "react-router-dom";

// const logo = require('../../../common/style/site/images/logo.svg').default;

export default function Header() {
  return (
    <div className="tdesign-header">
      <div className="tdesign-container tdesign-header-inner">
        <h1
          className="tdesign-logo"
          style={{
            display: "flex",
            height: 40,
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            id="logo"
            className="logo"
            style={{ fontSize: 14, color: "white" }}
          >
            <img src={"https://discuz.chat/dzq-img/admin-logo-pc.png"} />
          </Link>
        </h1>
        <div className="tdesign-nav">
          <nav className="tdesign-nav__links">
            <a
              className="tdesign-link"
              href="https://discuz.com/docs/Windows%20%E4%B8%BB%E6%9C%BA.html"
            >
              部署安装
            </a>
            <NavLink
              className="tdesign-link"
              activeClassName="tdesign-link--active router-link-active"
              to="/api"
            >
              API
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/helper"
              activeClassName="tdesign-link--active router-link-active"
            >
              小助手工具
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/components"
              activeClassName="tdesign-link--active router-link-active"
            >
              组件库
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/components/theme-usage"
            >
              主题切换
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/sdk"
              activeClassName="tdesign-link--active router-link-active"
            >
              SDK
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/cli"
              activeClassName="tdesign-link--active router-link-active"
            >
              命令行工具
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/plugin"
              activeClassName="tdesign-link--active router-link-active"
            >
              插件开发
            </NavLink>
            {/* <NavLink
              className="tdesign-link"
              to="/theme"
              activeClassName="tdesign-link--active router-link-active"
            >
              主题生成
            </NavLink>
            <NavLink
              className="tdesign-link"
              to="/plugin-center"
              activeClassName="tdesign-link--active router-link-active"
            >
              插件市场
            </NavLink> */}
            <NavLink
              className="tdesign-link"
              to="/help"
              activeClassName="tdesign-link--active router-link-active"
            >
              帮助中心
            </NavLink>
            <a
              className="tdesign-link"
              href={"https://gitee.com/Discuz/discuz-fe"}
            >
              前端源码
            </a>
            <a
              className="tdesign-link"
              href={"https://gitee.com/Discuz/Discuz-Q"}
            >
              后台源码
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
