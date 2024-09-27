import { nanoid } from "nanoid";
import { FormEvent } from "react";
import { useNavigate } from "react-router";

const NewGameModal = ({
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
        window.localStorage.setItem(
            "session",
            JSON.stringify({
                name,
                sessionID: nanoid(),
                roomID: nanoid(),
                join: false,
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
                autoComplete="false"
                onSubmit={handleSubmit}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="border-[0.1rem] border-green-300 min-w-[300px] max-w-[400px] w-full px-10 py-5 rounded-lg space-y-3"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
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
                        Create Room
                    </button>
                </div>
            </form>
        </div>
    ) : null;
};

export default NewGameModal;
