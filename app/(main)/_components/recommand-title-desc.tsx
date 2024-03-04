import { useRouter } from "next/navigation";
import { ImageTitleDescription } from "./image-title-description";
import { ChevronRight } from "lucide-react";

interface RecommandTitleDescriptionProps {}

const data = {
  place: [
    {
      title: "조용히 공부하고 싶을 때",
      facs: [
        {
          title: "지하 1층 라운지",
          description: "SK미래관",
          imageSrc:
            "/fac-img/SK미래관/B1/[main]SK미래관_B1_지하 1층 라운지.JPG",
          route:
            "f/detail?building=SK미래관&facName=지하%201층%20라운지&type=lounge&facFloor=B1",
        },
        {
          title: "Lounge G",
          description: "하나스퀘어",
          imageSrc: "/fac-img/하나스퀘어/B1/[main] 하스_Lounge-G.jpg",
          route:
            "f/detail?building=하나스퀘어&facName=Lounge%20G&type=lounge&facFloor=B1",
        },
      ],
    },
    {
      title: "빠르게 커피 사고 싶을 때",
      facs: [
        {
          title: "지하 1층 라운지",
          description: "SK미래관",
          imageSrc:
            "/fac-img/SK미래관/B1/[main]SK미래관_B1_지하 1층 라운지.JPG",
          route:
            "f/detail?building=SK미래관&facName=지하%201층%20라운지&type=lounge&facFloor=B1",
        },
        {
          title: "Lounge G",
          description: "하나스퀘어",
          imageSrc: "/fac-img/하나스퀘어/B1/[main] 하스_Lounge-G.jpg",
          route:
            "f/detail?building=하나스퀘어&facName=Lounge%20G&type=lounge&facFloor=B1",
        },
      ],
    },
  ],
};

const RecommandTitleDescription = ({}: RecommandTitleDescriptionProps) => {
  const router = useRouter();

  return data.place.map((place, index) => (
    <div
      key={index}
      className="flex flex-col justify-start maw-w-[450px] mx-6 mt-10"
    >
      <span className="font-bold flex justify-between items-center">
        {place.title}
        <ChevronRight
          className="cursor-pointer"
          onClick={() => {
            const buildings = [
              "과학도서관",
              "백주년기념관",
              "미디어관",
              "중앙광장지하",
              "하나스퀘어",
            ];

            // buildings 배열의 길이 범위 안에서 랜덤한 정수를 생성합니다.
            const randomIndex = Math.floor(Math.random() * buildings.length);

            // 생성된 랜덤 인덱스를 이용해 building을 선택합니다.
            const building = buildings[randomIndex];

            router.push(`/b?type=${"lounge"}&building=${building}`);
          }}
        />
      </span>
      <div className="flex flex-row justify-start items-center">
        {place.facs.map((fac, facIndex) => (
          <ImageTitleDescription
            key={facIndex}
            title={fac.title}
            image={fac.imageSrc}
            description={fac.description}
            route={fac.route}
          />
        ))}
      </div>
    </div>
  ));
};

export default RecommandTitleDescription;
