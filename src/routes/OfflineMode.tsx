import BoardSquare from "../components/common/BoardSquare";
import GameTitle from "../components/common/GameTitle";
import StartIcon from "../components/icon/StartIcon";
import XIcon from "../components/icon/XIcon";

const OfflineMode = () => {
    return (
        <div className="min-h-screen p-1 bg-[#131515] flex justify-center items-center">
            <div className="min-w-[300px] max-w-[400px] w-full space-y-5">
                <GameTitle/>
                <div className="flex gap-5  justify-center items-center">
                    <div className="text-center flex-1 text-white rounded-md py-3 border border-green-300">
                        Player One : 0
                    </div>
                    <div className="text-center flex-1 text-white rounded-md py-3 border border-orange-300">
                        Player Two : 0
                    </div>
                </div>
                <div className=" grid grid-cols-3 gap-3">
                    <BoardSquare>
                        <StartIcon />
                    </BoardSquare>
                    <BoardSquare />
                    <BoardSquare />
                    <BoardSquare />
                    <BoardSquare>
                        <XIcon />
                    </BoardSquare>
                    <BoardSquare />
                    <BoardSquare>
                        <StartIcon />
                    </BoardSquare>
                    <BoardSquare />
                    <BoardSquare />
                </div>
                <div className="flex justify-center">
                    <button className="border-red-500 flex justify-center items-center gap-3 border rounded-md text-white px-8 py-2">
                        <span>Restart</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfflineMode;
