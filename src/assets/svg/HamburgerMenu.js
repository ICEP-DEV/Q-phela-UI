import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HamburgerMenu = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      fill="#0B0B0B"
      stroke="#000"
      d="M.964 23.643h25.072a.464.464 0 0 1 .464.464v1.929a.464.464 0 0 1-.464.464H.964a.464.464 0 0 1-.464-.464v-1.929a.464.464 0 0 1 .464-.464ZM.636 8.35l-.353-.352.353.352a.464.464 0 0 1 .328-.136h25.072a.464.464 0 0 1 .464.465v1.928a.464.464 0 0 1-.464.464H.964a.464.464 0 0 1-.464-.464V8.68c0-.124.049-.242.136-.329Zm.328 7.579h25.072a.464.464 0 0 1 .464.464v1.928a.464.464 0 0 1-.464.465H.964A.464.464 0 0 1 .5 18.32v-1.928a.464.464 0 0 1 .464-.464ZM.964.5h25.072a.464.464 0 0 1 .464.464v1.929a.464.464 0 0 1-.464.464H.964A.464.464 0 0 1 .5 2.893V.964A.464.464 0 0 1 .964.5Z"
    />
  </Svg>
);
export default HamburgerMenu;
