//@ts-ignore
import isServer from "./is-server";
import browser from "./browser";
import React from "react";

const reportTaskList = () => {
  if (
    process.env.DISCUZ_ENV === "web" &&
    process.env.NODE_ENV !== "development" &&
    !isServer()
  ) {
    const beaconTaskListArray = Object.values(window.beaconUITaskList);
    if (beaconTaskListArray && beaconTaskListArray.length > 0) {
      for (let i = 0; i < beaconTaskListArray.length; i++) {
        window.beaconUI.onUserAction("componentInit", {
          ...beaconTaskListArray[i],
        });
      }
      window.beaconUITaskList = {};
    }
  }
};

const registerTask = (reportData) => {
  const { name: componentName } = reportData;
  if (!window.beaconUITaskList) {
    window.beaconUITaskList = {
      [componentName]: reportData,
    };
  } else {
    if (window.beaconUITaskList[componentName]) {
      window.beaconUITaskList[componentName].ct += 1;
    } else {
      window.beaconUITaskList[componentName] = reportData;
    }
  }
};

function initTj() {
  if (
    process.env.DISCUZ_ENV === "web" &&
    process.env.NODE_ENV !== "development" &&
    !isServer() &&
    !window.BeaconAction
  ) {
    window.beaconIsLoading = true;
    const tj = document.createElement("script");
    tj.src = "https://beaconcdn.qq.com/sdk/4.3.4/beacon_web.min.js";
    tj.onload = function () {
      window.beaconUI = new BeaconAction({
        appkey: "0WEB0U4I4M4V73SR", // 系统或项目id, 必填
        delay: 3000,
      });
      window.beaconUI.addAdditionalParams({
        host: window.location.host,
        path: window.location.pathname,
        pfm: browser.env("mobile") ? "h5" : "pc",
      });
      reportTaskList();
    };
    document.body.appendChild(tj);
  }
}

const report = ({ componentName, pa = "", pn = "" }) => {
  if (process.env.DISCUZ_ENV === "web") {
    const reportData = {
      name: componentName,
      pa,
      pn,
      ct: 1,
    };
    // server ssr 不上报
    if (!isServer()) {
      if (!window.beaconUI) {
        if (!window.beaconIsLoading) {
          initTj();
        }

        registerTask(reportData);
      } else {
        registerTask(reportData);

        setTimeout(() => {
          reportTaskList();
        }, 1000);
      }
    }
  }
};

export const useReport = (config) => {
  return React.useEffect(() => {
    report(config);
  }, []);
};

export default report;
