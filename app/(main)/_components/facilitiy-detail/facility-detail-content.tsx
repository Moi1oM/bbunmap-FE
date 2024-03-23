import { ResponseFacilityDetail } from "../../(routes)/f/detail/page";

interface FacilityDetailContentProps {
  facilityData: ResponseFacilityDetail;
}

const FacilityDetailSkeleton = () => {
  const renderSkeletonText = () => (
    <div className="animate-pulse bg-gray-200 rounded-full h-4 w-1/2"></div>
  );

  return (
    <div className="flex flex-row justify-start ml-6 mt-6">
      <div className="flex flex-col justify-start items-start flex-shrink-0">
        {renderSkeletonText()}
        {renderSkeletonText()}
        {renderSkeletonText()}
        {renderSkeletonText()}
      </div>
    </div>
  );
};

const FacilityDetailContent = ({
  facilityData,
}: FacilityDetailContentProps) => {
  if (facilityData?.type === "라운지") {
    return (
      <div className="flex flex-row justify-start ml-6 mt-6">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <span className="text-sm text-[#74787D]">분위기</span>
          <span className="text-sm text-[#74787D]">대화</span>
          <span className="text-sm text-[#74787D]">콘센트</span>
        </div>
        <div className="flex flex-col justify-start items-start ml-4 flex-shrink-0">
          <span className="text-sm text-[#333333]">
            {facilityData?.mood ?? "수집된 정보 없음."}
          </span>
          <span className="text-sm text-[#333333]">
            {facilityData?.conversation ?? "수집된 정보 없음."}
          </span>
          <span className="text-sm text-[#333333]">
            {facilityData?.socket ?? "수집된 정보 없음."}
          </span>
        </div>
      </div>
    );
  } else if (
    facilityData?.type === "그룹스터디룸" ||
    facilityData?.type === "캐럴" ||
    facilityData?.type === "스터디룸" ||
    facilityData?.type === "열람실" ||
    facilityData?.type === "수면실"
  ) {
    return (
      <div className="flex flex-row justify-start ml-6 mt-6">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <span className="text-sm text-[#74787D]">예약여부</span>
          <span className="text-sm text-[#74787D]">예약앱</span>
          <span className="text-sm text-[#74787D]">학생증태깅</span>
        </div>
        <div className="flex flex-col justify-start items-start ml-4 flex-shrink-0">
          <span className="text-sm text-[#333333]">
            {facilityData?.reservation ?? "수집된 정보 없음."}
          </span>
          <span className="text-sm text-[#333333]">
            {facilityData?.reservationSite ?? "수집된 정보 없음."}
          </span>
          <span className="text-sm text-[#333333]">
            {facilityData?.studentIdCardTagging ?? "수집된 정보 없음."}
          </span>
        </div>
      </div>
    );
  } else if (facilityData?.type === "카페" || facilityData?.type === "식당") {
    return (
      <div className="flex flex-row justify-start ml-6 mt-6">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <span className="text-sm text-[#74787D]">주중시간</span>
          <span className="text-sm text-[#74787D]">주말시간</span>
        </div>
        <div className="flex flex-col justify-start items-start ml-4 flex-shrink-0">
          <span className="text-sm text-[#333333]">
            {facilityData?.weekDayAvailableTime ?? "수집된 정보 없음."}
          </span>
          <span className="text-sm text-[#333333]">
            {facilityData?.weekendAvailableTime ?? "수집된 정보 없음."}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-start ml-6 mt-6">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <span className="text-sm text-[#74787D]">특징</span>
        </div>
        <div className="flex flex-col justify-start items-start ml-4 flex-shrink-0">
          <span className="text-sm text-[#333333]">
            {facilityData?.feature ?? "수집된 정보 없음."}
          </span>
        </div>
      </div>
    );
  }
};

export default FacilityDetailContent;
