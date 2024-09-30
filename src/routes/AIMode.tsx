import { useState } from "react";
import BoardSquare from "../components/common/BoardSquare";
import GameTitle from "../components/common/GameTitle";
import StartIcon from "../components/icon/StartIcon";
import XIcon from "../components/icon/XIcon";
import toast, { Toaster } from "react-hot-toast";

const winPatterns = [
    [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
    ],
    [
        [0, 1, 2],
        [1, 4, 7],
    ],
    [
        [0, 1, 2],
        [2, 5, 8],
        [2, 4, 6],
    ],
    [
        [3, 4, 5],
        [0, 3, 6],
    ],
    [
        [3, 4, 5],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6],
    ],
    [
        [3, 4, 5],
        [2, 5, 8],
    ],
    [
        [6, 7, 8],
        [0, 3, 6],
        [6, 4, 2],
    ],
    [
        [6, 7, 8],
        [1, 4, 7],
    ],
    [
        [6, 7, 8],
        [2, 5, 8],
        [0, 4, 8],
    ],
];

const Icon = ({ value }: { value: number | null }) => {
    switch (value) {
        case 0:
            return <StartIcon />;
        case 1:
            return <XIcon />;
        default:
            return null;
    }
};

const AIMode = () => {
    const [board, setBoard] = useState({
        squares: Array(9).fill(null),
        player: 0,
        score: { player: 0, ai: 0 },
        record: { player: [], ai: [] } as any,
        removeIndex: false as any,
        win: false,
    });

    const handleClick = (index: number) => {
        const newBoard = { ...board };
        if (newBoard.squares[index] !== null) {
            return;
        }
        newBoard.squares[index] = newBoard.player;
        newBoard.record.player.push(index);

        if (typeof newBoard.removeIndex === "number") {
            newBoard.squares[newBoard.removeIndex] = null;
            newBoard.removeIndex = false;
        }

        const isWin = win(newBoard.squares as any, newBoard.player, index);

        if (!isWin) {
            const aiChoice = minMax([...newBoard.squares], 1, null).index;
            newBoard.squares[aiChoice] = 1;
            newBoard.record.ai.push(aiChoice);

            if (newBoard.record.ai.length === 4) {
                const index = newBoard.record.ai.splice(0, 1)[0];
                newBoard.squares[index] = null;
            }

            if (newBoard.record.ai.length === 3) {
                const index = newBoard.record.player.splice(0, 1)[0];
                newBoard.removeIndex = index;
            }

            const isWin = win(newBoard.squares as any, 1, aiChoice);

            if (isWin) {
                newBoard.win = true;
                newBoard.score.ai = newBoard.score.ai + 1;
                toast("AI WIN!");
            }
        } else {
            newBoard.score.player = newBoard.score.player + 1;
            newBoard.win = true;
            toast("You WIN!");
        }

        setBoard(newBoard);
    };

    const minMax = (squares: any, player: any, index: any) => {
        const emptySquares = squares
            .map((s: any, index: number) => (s === null ? index : null))
            .filter((s: any) => s !== null);

        if (index) {
            if (win(squares, 0, index)) {
                return { score: -10 };
            } else if (win(squares, 1, index)) {
                return { score: 10 };
            } else if (!emptySquares.length) {
                return { score: 0 };
            }
        } else if (!emptySquares.length) {
            return { score: 0 };
        }
        let moves: any = [];

        for (let i = 0; i < emptySquares.length; i++) {
            const move: any = {};
            move.index = emptySquares[i];
            squares[emptySquares[i]] = player;

            const result = minMax(
                squares,
                player === 0 ? 1 : 0,
                emptySquares[i]
            );

            move.score = result.score;

            squares[emptySquares[i]] = null;
            moves.push(move);
        }
        var bestMove;

        if (player === 1) {
            let bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove as number];
    };

    const win = (squares: [number, null], player: number, index: number) => {
        return winPatterns[index].some((a: Array<any>) =>
            a.every((b: number) => squares[b] === player)
        );
    };

    const handleRestart = () => {
        setBoard((prev: any) => ({
            ...prev,
            squares: Array(9).fill(null),
            win: false,
            record: { player: [], ai: [] } as any,
            removeIndex: false as any,
        }));
    };

    return (
        <>
            <Toaster
                toastOptions={{
                    className: "bg-green-400",
                    duration: 2000,
                    style: {
                        backgroundColor:
                            "rgb(49 196 141 / var(--tw-bg-opacity))",
                        color: "white",
                    },
                    icon: "🎉",
                }}
            />
            <div className="min-h-screen  bg-[#131515] flex justify-center items-center">
                <div className="min-w-[300px] max-w-[400px] w-full space-y-5">
                    <GameTitle />
                    <div className="flex gap-5  justify-center items-center">
                        <div className="text-center flex-1 text-white rounded-md py-3 border border-green-300">
                            Player One : {board.score.player}
                        </div>
                        <div className="text-center flex-1 text-white rounded-md py-3 border border-blue-500">
                            AI Player : {board.score.ai}
                        </div>
                    </div>
                    <div
                        style={{ pointerEvents: board.win ? "none" : "auto" }}
                        className=" grid grid-cols-3 gap-3"
                    >
                        {board.squares.map((item: number | null, index) => {
                            return (
                                <BoardSquare
                                    key={index}
                                    alert={board.removeIndex === index}
                                    onClick={() => {
                                        handleClick(index);
                                    }}
                                >
                                    <Icon value={item} />
                                </BoardSquare>
                            );
                        })}
                    </div>
                    <div
                        style={{ visibility: board.win ? "visible" : "hidden" }}
                        className=" flex justify-center"
                        onClick={handleRestart}
                    >
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
        </>
    );
};

export default AIMode;
