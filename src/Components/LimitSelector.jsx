const LimitSelector = ({ limit, setLimit }) => {
    return (
        <>
            <label
                htmlFor="limit"
                className="font-semibold text-white mr-1 text-sm">
                Show:
            </label>
            <select
                id="limit"
                className="w-full bg-slate-400 py-2 px-4 rounded-lg font-semibold text-white focus:outline-0"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </>
    );
};

export default LimitSelector;
