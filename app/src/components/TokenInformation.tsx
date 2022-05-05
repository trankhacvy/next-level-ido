const TokenInformation = () => {
  return (
    <div className="w-full">
      <div className="text-white text-lg font-semibold">Token Info</div>
      <div className="rounded-lg bg-gray-700 px-8 py-4 mt-6 divide-y divide-slate-600">
        <div className="flex justify-between py-3">
          <div>Token Name</div>
          <div className="text-white font-semibold">Bitcoin</div>
        </div>
        <div className="flex justify-between py-3">
          <div>Symbol</div>
          <div className="text-white font-semibold">BTC</div>
        </div>
        <div className="flex justify-between py-3">
          <div>Token Distribution</div>
          <div className="text-white font-semibold">
            Mar 24, 2022, 12:00:00 AM
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div>Blockchain</div>
          <div className="text-white font-semibold">Solana</div>
        </div>
      </div>
    </div>
  );
};

export default TokenInformation;
