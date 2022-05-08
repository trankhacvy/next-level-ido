const StakeForm = () => {
  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 border flex items-center p-4 space-x-4">
        <div className="w-10 h-10">
          <img
            src="/assets/images/pancake-swap-token.png"
            width={40}
            height={40}
          />
        </div>
        <span className="text-h6 font-bold">$LOTO</span>
        <input className="flex-1 px-3 py-2 text-2xl bg-transparent font-semibold text-right focus:outline-none" />
        <button className="btn btn-secondary">Max</button>
      </div>
      <div className="text-right mt-8">
        <button className="btn-large btn-primary">Stake</button>
      </div>
    </div>
  );
};

export default StakeForm;
