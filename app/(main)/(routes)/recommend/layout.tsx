import TabBar from "../../_components/tab-bar/tab-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}
