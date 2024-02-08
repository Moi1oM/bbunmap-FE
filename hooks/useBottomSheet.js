import { useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const useBottomSheet = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  const onDragEnd = (_, info) => {
    const shouldExpand = info.offset.y < 0;
    const shouldContract = info.offset.y > 0;

    if (shouldExpand) {
      setIsExpanded(true);
    } else if (shouldContract) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      controls.start("expanded");
    } else {
      controls.start("contracted");
    }
  }, [controls, isExpanded]);

  return { onDragEnd, controls, setIsExpanded, isExpanded };
};

export default useBottomSheet;
