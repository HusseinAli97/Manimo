import { PacmanLoader } from "react-spinners";
const Spinner = ({ color = "#1f3280", size = 70 }) => {

    return (
        <div className="mt-9 flex justify-center">
            <PacmanLoader
                color={color}
                size={size}
            />
        </div>
    );
};

export default Spinner;
