import { useState } from "react";
import "../customcss/CustomCardCss.css";

const SettingsSecurity = ({ user, setUser, setSaveData }) => {
  const [something, setSomething] = useState();

  return (
    <div className="flex justify-center w-full h-full p-4 text-xl">
      <div className="inner-settings-security grid grid-cols-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] w-full gap-4">
        <div className="flex flex-col bg-white bg-opacity-70 border-b-2 overflow-y-auto rounded-lg w-full h-full text-lg p-4 whitespace-pre divide-y divide-gray-200">
          <div className="flex drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] grid-cols-6 mb-3">
            <div className="flex flex-col pr-1 text-right">Otherizes</div>
          </div>
        </div>
        <div className="flex flex-col bg-white bg-opacity-70 border-b-2 overflow-y-auto rounded-lg w-full h-full text-lg p-4 whitespace-pre divide-y divide-gray-200">
          <div className="flex drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] grid-cols-6 mb-3">
            <div className="flex flex-col pr-1 text-right">
              Micro-aggressions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSecurity;
