import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";
const JoinGameModal = ({
    open = false,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) => {
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const roomID = formData.get("roomID") as string;
        window.localStorage.set(
            "session",
            JSON.stringify({
                name,
                sessionID: nanoid(),
                roomID: roomID,
                join: true,
            })
        );
        navigate("/game-room");
    };
    return open ? (
        <div
            onClick={() => {
                handleClose();
            }}
            className="fixed p-1  flex justify-center items-center z-50 min-h-screen top-0 left-0 right-0 bottom-0 bg-[#181717e3]"
        >
            <form
                onSubmit={handleSubmit}
                autoComplete="false"
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="border-[0.1rem] border-yellow-300min-w-[300px] max-w-[400px] w-full px-10 py-5 rounded-lg space-y-3"
            >
                <div>
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        className=" bg-inherit focus:border-transparent text-white focus:ring-white border border-white text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                        Room Code
                    </label>
                    <input
                        type="text"
                        id="name"
                        className=" bg-inherit focus:border-transparent text-white focus:ring-white border border-white text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="rounded-md border-white border px-8 py-2 text-sm text-white"
                    >
                        Join Room
                    </button>
                </div>
            </form>
        </div>
    ) : null;
};

export default JoinGameModal;
