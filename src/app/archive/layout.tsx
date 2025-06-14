import { ReactNode } from "react";

const ArchiveLayout = ({ archive, latest }: { archive: ReactNode, latest: ReactNode }) => {
  return (
    <div className="bg-black w-full h-screen text-white">
      <h1>archive laout</h1>
      {archive}
      {latest}
    </div>
  )
}
export default ArchiveLayout;