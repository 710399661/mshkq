import { CSSProperties } from "react";
import { PopPlacementProps } from "../../interface";

type placementProps = PopPlacementProps["placement"];

export const fixPadding = 10; // 为解决hover触发时，鼠标在触发元素和浮层内容间移动会滑出容器而设置

export function switchPosition(
  sign: placementProps,
  modalRect: DOMRect, // 气泡边界，获取气泡height、width
  triggerRect: DOMRect, // 触发器边界，获取气泡height、width、left、top
  scroll: number // body已滚动的垂直距离
): CSSProperties {
  switch (sign) {
    case "TL":
      return {
        top: triggerRect.top + scroll - modalRect.height,
        left: triggerRect.left - fixPadding,
      };
    case "TOP":
      return {
        top: triggerRect.top + scroll - modalRect.height,
        left: triggerRect.left + (triggerRect.width - modalRect.width) / 2,
      };
    case "TR":
      return {
        top: triggerRect.top + scroll - modalRect.height,
        left: triggerRect.right - modalRect.width + fixPadding,
      };

    case "LT":
      return {
        top: triggerRect.top + scroll - fixPadding,
        left: triggerRect.left - modalRect.width,
      };
    case "LEFT":
      return {
        top:
          triggerRect.top +
          scroll +
          (triggerRect.height - modalRect.height) / 2,
        left: triggerRect.left - modalRect.width,
      };
    case "LB":
      return {
        top: triggerRect.bottom + scroll - modalRect.height + fixPadding,
        left: triggerRect.left - modalRect.width,
      };

    case "BL":
      return {
        top: triggerRect.bottom + scroll,
        left: triggerRect.left - fixPadding,
      };
    case "BOTTOM":
      return {
        top: triggerRect.bottom + scroll,
        left: triggerRect.left + (triggerRect.width - modalRect.width) / 2,
      };
    case "BR":
      return {
        top: triggerRect.bottom + scroll,
        left: triggerRect.right - modalRect.width + fixPadding,
      };

    case "RT":
      return {
        top: triggerRect.top + scroll - fixPadding,
        left: triggerRect.right,
      };
    case "RIGHT":
      return {
        top:
          triggerRect.top +
          scroll +
          (triggerRect.height - modalRect.height) / 2,
        left: triggerRect.right,
      };
    case "RB":
      return {
        top: triggerRect.bottom + scroll - modalRect.height + fixPadding,
        left: triggerRect.right,
      };
    default:
      console.error("you may pass error placement" + sign);
      return {};
  }
}

export function switchTrianglePosition(
  sign: placementProps,
  triangleAtCenter: boolean,
  triggerRect: DOMRect,
  scroll: number
): CSSProperties {
  const triangle = 8; // 小三角所在的正方形按照中心点旋转，边长为8
  const triangleHalf = triangle / 2;
  const triangleTwice = triangle * 2;

  switch (sign) {
    case "TL":
      return {
        top: triggerRect.top + scroll - fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.left + triggerRect.width / 2 - triangleHalf
          : triggerRect.left + triangle,
      };
    case "TOP":
      return {
        top: triggerRect.top + scroll - fixPadding - triangleHalf,
        left: triggerRect.left + triggerRect.width / 2 - triangleHalf,
      };
    case "TR":
      return {
        top: triggerRect.top + scroll - fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.left + triggerRect.width / 2 - triangleHalf
          : triggerRect.right - triangleTwice,
      };

    case "LT":
      return {
        top: triangleAtCenter
          ? triggerRect.top + scroll + triggerRect.height / 2 - triangleHalf
          : triggerRect.top + scroll + triangle,
        left: triggerRect.left - fixPadding - triangleHalf,
      };
    case "LEFT":
      return {
        top: triggerRect.top + scroll + triggerRect.height / 2 - triangleHalf,
        left: triggerRect.left - fixPadding - triangleHalf,
      };
    case "LB":
      return {
        top: triangleAtCenter
          ? triggerRect.top + scroll + triggerRect.height / 2 - triangleHalf
          : triggerRect.bottom + scroll - triangleTwice,
        left: triggerRect.left - fixPadding - triangleHalf,
      };

    case "BL":
      return {
        top: triggerRect.bottom + scroll + fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.left + triggerRect.width / 2 - triangleHalf
          : triggerRect.left + triangle,
      };
    case "BOTTOM":
      return {
        top: triggerRect.bottom + scroll + fixPadding - triangleHalf,
        left: triggerRect.left + triggerRect.width / 2 - triangleHalf,
      };
    case "BR":
      return {
        top: triggerRect.bottom + scroll + fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.left + triggerRect.width / 2 - triangleHalf
          : triggerRect.right - triangleTwice,
      };

    case "RT":
      return {
        top: triangleAtCenter
          ? triggerRect.top + scroll + triggerRect.height / 2 - triangleHalf
          : triggerRect.top + scroll + triangle,
        left: triggerRect.right + fixPadding - triangleHalf,
      };
    case "RIGHT":
      return {
        top: triggerRect.top + scroll + triggerRect.height / 2 - triangleHalf,
        left: triggerRect.right + fixPadding - triangleHalf,
      };
    case "RB":
      return {
        top: triangleAtCenter
          ? triggerRect.top + scroll + triggerRect.height / 2 - triangleHalf
          : triggerRect.bottom + scroll - triangleTwice,
        left: triggerRect.right + fixPadding - triangleHalf,
      };
    default:
      console.error("you may pass error placement" + sign);
      return {};
  }
}

// 位置取反对应关系
const placementMap = {
  TL: "BL",
  TOP: "BOTTOM",
  TR: "BR",
  RT: "LT",
  RIGHT: "LEFT",
  RB: "LB",
  BL: "TL",
  BOTTOM: "TOP",
  BR: "TR",
  LT: "RT",
  LEFT: "RIGHT",
  LB: "RB",
};

export function getVisiblePlacement(
  sign: placementProps,
  modalRect: DOMRect,
  triggerRect: DOMRect
): placementProps {
  let _sign = "";

  switch (sign) {
    case "TL":
    case "TOP":
    case "TR":
      if (modalRect.height + 8 > triggerRect.top) {
        _sign = placementMap[sign];
      }
      break;
    case "RT":
    case "RIGHT":
    case "RB":
      if (modalRect.width + 8 > window.innerWidth - triggerRect.right) {
        _sign = placementMap[sign];
      }
      break;
    case "BL":
    case "BOTTOM":
    case "BR":
      if (modalRect.height + 8 > window.innerHeight - triggerRect.bottom) {
        _sign = placementMap[sign];
      }
      break;
    case "LT":
    case "LEFT":
    case "LB":
      if (modalRect.width + 8 > triggerRect.left) {
        _sign = placementMap[sign];
      }
      break;
  }

  if (_sign === "") _sign = sign;

  return _sign as placementProps;
}

// 跟随触发器时的弹框定位
export function switchFollowPosition(
  sign: placementProps,
  modalRect: DOMRect, 
  triggerRect: DOMRect
) {
  switch (sign) {
    case "TL":
      return {
        top: -modalRect.height,
        left: -fixPadding,
      };
    case "TOP":
      return {
        top: -modalRect.height,
        left: (triggerRect.width - modalRect.width) / 2,
      };
    case "TR":
      return {
        top: -modalRect.height,
        left: triggerRect.width - modalRect.width + fixPadding,
      };

    case "LT":
      return {
        top: -fixPadding,
        left: -modalRect.width,
      };
    case "LEFT":
      return {
        top: (triggerRect.height - modalRect.height) / 2,
        left: -modalRect.width,
      };
    case "LB":
      return {
        top: triggerRect.height - modalRect.height + fixPadding,
        left: -modalRect.width,
      };

    case "BL":
      return {
        top: triggerRect.height,
        left: -fixPadding,
      };
    case "BOTTOM":
      return {
        top: triggerRect.height,
        left: (triggerRect.width - modalRect.width) / 2,
      };
    case "BR":
      return {
        top: triggerRect.height,
        left: triggerRect.width - modalRect.width + fixPadding,
      };

    case "RT":
      return {
        top: -fixPadding,
        left: triggerRect.width,
      };
    case "RIGHT":
      return {
        top: (triggerRect.height - modalRect.height) / 2,
        left: triggerRect.width,
      };
    case "RB":
      return {
        top: triggerRect.height - modalRect.height + fixPadding,
        left: triggerRect.width,
      };
    default:
      console.error("you may pass error placement" + sign);
      return {};
  }
}

export function switchFollowTrianglePosition(
  sign: placementProps,
  triangleAtCenter: boolean,
  triggerRect: DOMRect
): CSSProperties {
  const triangle = 8; // 小三角所在的正方形按照中心点旋转，边长为8
  const triangleHalf = triangle / 2;
  const triangleTwice = triangle * 2;

  switch (sign) {
    case "TL":
      return {
        top: -fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.width / 2 - triangleHalf
          : triangle,
      };
    case "TOP":
      return {
        top: -fixPadding - triangleHalf,
        left: triggerRect.width / 2 - triangleHalf,
      };
    case "TR":
      return {
        top: -fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.width / 2 - triangleHalf
          : triggerRect.width - triangleTwice,
      };

    case "LT":
      return {
        top: triangleAtCenter
          ? triggerRect.height / 2 - triangleHalf
          : triangle,
        left: -fixPadding - triangleHalf,
      };
    case "LEFT":
      return {
        top: triggerRect.height / 2 - triangleHalf,
        left: -fixPadding - triangleHalf,
      };
    case "LB":
      return {
        top: triangleAtCenter
          ? triggerRect.height / 2 - triangleHalf
          : triggerRect.height - triangleTwice,
        left: -fixPadding - triangleHalf,
      };

    case "BL":
      return {
        top: triggerRect.height + fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.width / 2 - triangleHalf
          : triangle,
      };
    case "BOTTOM":
      return {
        top: triggerRect.height + fixPadding - triangleHalf,
        left: triggerRect.width / 2 - triangleHalf,
      };
    case "BR":
      return {
        top: triggerRect.height + fixPadding - triangleHalf,
        left: triangleAtCenter
          ? triggerRect.width / 2 - triangleHalf
          : triggerRect.width - triangleTwice,
      };

    case "RT":
      return {
        top: triangleAtCenter
          ? triggerRect.height / 2 - triangleHalf
          : triangle,
        left: triggerRect.width + fixPadding - triangleHalf,
      };
    case "RIGHT":
      return {
        top: triggerRect.height / 2 - triangleHalf,
        left: triggerRect.width + fixPadding - triangleHalf,
      };
    case "RB":
      return {
        top: triangleAtCenter
          ? triggerRect.height / 2 - triangleHalf
          : triggerRect.height - triangleTwice,
        left: triggerRect.width + fixPadding - triangleHalf,
      };
    default:
      console.error("you may pass error placement" + sign);
      return {};
  }
}
