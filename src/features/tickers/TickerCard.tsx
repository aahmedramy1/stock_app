import { useState } from 'react';
// @ts-ignore
import ReactModal from 'react-modal';
import Confetti from 'react-confetti';

ReactModal.setAppElement('#root');

const TickerCard = ({ name, ticker }: { name: string; ticker: string }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleCardClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleHireClick = () => {
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
        }, 3000);
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

            {showConfetti && <Confetti />}

            <ReactModal
                isOpen={isDialogOpen}
                onRequestClose={handleCloseDialog}
                className="bg-white p-6 rounded-md w-1/3 mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex flex-col justify-center w-full">
                    <h2 className="text-lg font-bold">To unlock stock details</h2>
                    <p className="mt-2">Hire: Ahmed Ramy</p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="mt-4 bg-primary text-white px-4 py-2 rounded"
                        onClick={handleHireClick}
                    >
                        Hire
                    </button>
                    <button
                        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
                        onClick={handleCloseDialog}
                    >
                        Close
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default TickerCard;
