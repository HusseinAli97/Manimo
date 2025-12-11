const CardContainer = ({ children }) => {
    return (
        <div className="max-w-full grid   sm:grid-cols-2 sm:gap-3  lg:grid-cols-4 xl:grid-cols-5 items-start md:gap-7 justify-center bg-slate-900 p-6">
            {children}
        </div>
    );
};

export default CardContainer;
