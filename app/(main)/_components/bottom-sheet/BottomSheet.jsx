"use client";

import { useMemo } from "react";
import useBottomSheet from "@/hooks/useBottomSheet";
import * as S from "./BottomSheet.style";
import Header from "./Header";

const BottomSheet = ({ children }) => {
  const { onDragEnd, controls } = useBottomSheet();

  const bottomSheetVariants = useMemo(
    () => ({
      expanded: { y: 0 },
      contracted: { y: "42%" }, // 최소 크기로 설정입니다 (여기서는 화면의 30% 정도로 설정했지만, 실제 크기에 따라 조정 가능)
    }),
    []
  );

  return (
    <S.Wrapper
      drag="y"
      onDragEnd={onDragEnd}
      initial="contracted"
      animate={controls}
      transition={{ type: "spring", damping: 40, stiffness: 400 }}
      variants={bottomSheetVariants}
      dragConstraints={{ top: 0, bottom: 0 }}
    >
      <Header />
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.Wrapper>
  );
};

export default BottomSheet;
