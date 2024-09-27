import { useEffect, useState } from "react";
import { socket } from "../socket";

const GameRoom = () => {
    const [session, setSession] = useState(() =>
        JSON.parse(window.localStorage.getItem("session") as string)
    );

    const [board, setBoard] = useState(null);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.auth = session;

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onPlay(game: any) {
            setBoard(game);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("play", onPlay);

        return () => {
            socket.disconnect();
            socket.off("play", onPlay);
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return isConnected || true ? (
        <div className="min-h-screen p-1 bg-[#131515] flex justify-center items-center">
            <div className="min-w-[300px] max-w-[400px] w-full space-y-5">
                <h1 className="sriracha-regular text-white text-[5rem] text-center">
                    <span className="text-green-300">Tic</span>{" "}
                    <span className="text-yellow-300">Tac</span>{" "}
                    <span className="text-red-500">Toe</span>
                </h1>
                <div className="flex gap-5  justify-center items-center">
                    <div className="text-center flex-1 text-white rounded-md py-3 border border-green-300">
                        Player One : 0
                    </div>
                    <div className="text-center flex-1 text-white rounded-md py-3 border border-orange-300">
                        Player Two : 0
                    </div>
                </div>
                <div className=" grid grid-cols-3 gap-3">
                    <div className="relative rounded-md border-red-400 border pt-[100%]">
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-16 text-green-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className=" rounded-md border-red-400 border pt-[100%]"></div>
                    <div className=" rounded-md border-red-400 border pt-[100%]"></div>
                    <div className=" rounded-md border-red-400 border pt-[100%]"></div>
                    <div className="relative rounded-md border-red-400 border pt-[100%]">
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-16 text-orange-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className=" rounded-md border-red-400 border pt-[100%]"></div>
                    <div className="relative rounded-md border-red-400 border pt-[100%]">
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-16 text-green-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className=" rounded-md border-red-400 border pt-[100%]"></div>
                    <div className=" rounded-md border-red-400 border pt-[100%]"></div>
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
    ) : null;
};

export default GameRoom;
