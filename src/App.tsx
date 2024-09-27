import { useEffect, useState } from "react";
import NewGameModal from "./components/modal/NewGameModal";
import JoinGameModal from "./components/modal/JoinGameModal";
import BoardSquare from "./components/common/BoardSquare";
import StartIcon from "./components/icon/StartIcon";
import XIcon from "./components/icon/XIcon";
import { useNavigate } from "react-router";

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
                    <h1 className="sriracha-regular text-white text-[5rem] text-center">
                        <span className="text-green-300">Tic</span>{" "}
                        <span className="text-yellow-300">Tac</span>{" "}
                        <span className="text-red-500">Toe</span>
                    </h1>
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
                            Join Game
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={()=>{
                            navigate('/offline-mode')
                        }} className="rounded-md border-red-400 border px-10 py-3 text-white">
                            Offline
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
