const TokenInformation = () => {
  return (
    <div className="w-full lg:self-stretch">
      <h4 className="text-2xl font-semibold">Token Information</h4>
      <div className="card px-8 py-4 mt-6">
        <div className="flex justify-between py-3">
          <div className="text-body2">Token Name</div>
          <div className="text-body2 font-semibold">Bitcoin</div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Symbol</div>
          <div className="text-body2 font-semibold">BTC</div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Token Distribution</div>
          <div className="text-body2 font-semibold">
            Mar 24, 2022, 12:00:00 AM
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Blockchain</div>
          <div className="text-body2 font-semibold">Solana</div>
        </div>
      </div>
    </div>
  );
};

export default TokenInformation;
