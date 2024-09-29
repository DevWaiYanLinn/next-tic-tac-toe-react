import { useEffect, useState } from "react";
import NewGameModal from "./components/modal/NewGameModal";
import JoinGameModal from "./components/modal/JoinGameModal";
import BoardSquare from "./components/common/BoardSquare";
import StartIcon from "./components/icon/StartIcon";
import XIcon from "./components/icon/XIcon";
import { useNavigate } from "react-router";
import GameTitle from "./components/common/GameTitle";

const App = () => {
    const [openNewGameModal, setOpenNewGameModal] = useState(false);
    const handleCloseNewGameModal = () => {
        setOpenNewGameModal(false);
    };

    const [openJoinGameModal, setJoinGameModal] = useState(false);
    const handeCloseJoinModal = () => {
        setJoinGameModal(false);
    };

    useEffect(() => {
        window.localStorage.removeItem("session");
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <JoinGameModal
                open={openJoinGameModal}
                handleClose={handeCloseJoinModal}
            />
            <NewGameModal
                open={openNewGameModal}
                handleClose={handleCloseNewGameModal}
            />
            <div className="min-h-screen p-1 bg-[#131515] flex justify-center items-center">
                <div className="min-w-[300px] max-w-[400px] w-full space-y-5">
                    <GameTitle/>
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
                    <div className="flex gap-4 justify-center pt-3">
                        <button
                            onClick={() => {
                                setOpenNewGameModal(true);
                            }}
                            className="rounded-md border-green-300 border px-10 py-3 text-white"
                        >
                            New Game
                        </button>
                        <button
                            onClick={() => {
                                setJoinGameModal(true);
                            }}
                            className="rounded-md border border-yellow-300 px-10 py-3 text-white"
                        >
                            Join Online
                        </button>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <button onClick={()=>{
                            navigate('/offline-mode')
                        }} className="rounded-md border-red-400 border px-10 py-2 text-md text-white">
                            Offline
                        </button>
                        <button onClick={()=>{
                            navigate('/ai-mode')
                        }} className="rounded-md border-blue-400 border px-10 py-2 text-md text-white">
                            AI Player
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
