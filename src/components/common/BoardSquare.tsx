const BoardSquare: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
    alert?:  boolean;
}> = ({ children, onClick = () => {} , alert = false}) => {
    return (
        <div
            onClick={onClick}
            className={`relative rounded-md ${alert ? 'border-white' : 'border-red-400'} border pt-[100%]`}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                {children}
            </div>
        </div>
    );
};

export default BoardSquare;
