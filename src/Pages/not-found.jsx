import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <>
            <div className="min-h-screen flex justify-evenly items-center flex-col text-center">
                <span className=" mb-5 text-7xl text-pink-400">{"🪭(,,>﹏<,,)🥢"}</span>
                <h1 className="text-red-400 text-5xl font-bold my-7">
                    👉Not Found Page👈
                </h1>
                <p className="text-gray-400 ">
                    Oops! This Page Not Exist{" "}
                    <Link to="/" className="text-sky-600 block mt-3">
                    ⬅ Back To Home
                    </Link>
                </p>
            </div>
        </>
    );
};

export default NotFoundPage;
