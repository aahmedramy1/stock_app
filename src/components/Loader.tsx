import {BeatLoader} from "react-spinners";

const Loader = ({ isCentered }: { isCentered?: boolean }) => (
    <div className={`flex ${isCentered ? "justify-center" : ""}`}>
        <BeatLoader />
    </div>
);

export default Loader;