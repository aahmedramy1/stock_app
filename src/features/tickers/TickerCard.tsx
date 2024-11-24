// @ts-ignore
import ReactModal from 'react-modal';
import {useNavigate} from "react-router-dom";

ReactModal.setAppElement('#root');

const TickerCard = ({ name, ticker }: { name: string; ticker: string }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/${ticker}`);
    };

    return (
        <div>
            <div
                className="bg-gray-800 p-4 rounded-md cursor-pointer h-full"
                onClick={handleCardClick}
            >
                <h1 className="text-white text-lg font-bold">{name}</h1>
                <p className="text-gray-400">{ticker}</p>
            </div>
        </div>
    );
};

export default TickerCard;
