import { motion } from "framer-motion";
import styled from "styled-components";

import { BOTTOM_SHEET_HEIGHT } from "./constants";

const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 20vh;
  width: 100%;
  max-width: 450px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: white;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.3);
  height: ${BOTTOM_SHEET_HEIGHT}px;

  margin: 0 auto;

  overflow: auto;
`;

const HeaderWrapper = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const ContentWrapper = styled.div`
  height: 80vh;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
`;

export { Wrapper, HeaderWrapper, HandleBar, ContentWrapper };
