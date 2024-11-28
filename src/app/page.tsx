import ImageAnalyzer from "@/modules/ImageAnalyzer";
import RecentActivity from "@/modules/RecentActivity";
// import Report from "@/modules/Report";

export default function Home() {
  return (
    <div className="bg-[#F9FAFE] ">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-8">
        <ImageAnalyzer />
        <RecentActivity />
        {/* <Report /> */}
        {/* <LineChart /> */}
      </div>
    </div>
  );
}
