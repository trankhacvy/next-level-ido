const SaleInfo = () => {
  return (
    <div className="w-full lg:self-stretch">
      <h4 className="text-2xl font-semibold">IDO Info</h4>
      <div className="card px-8 py-4 mt-4">
        <div className="flex justify-between py-3">
          <div className="text-body2">Hardcap</div>
          <div className="text-body2 font-semibold">140,000 USDC</div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Sale Rate</div>
          <div className="text-body2 font-semibold">0.012 USDC</div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Sale type</div>
          <div className="text-body2 font-semibold">Vested</div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Open Time</div>
          <div className="text-body2 font-semibold">
            Mar 21, 2022, 1:00:00 AM
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Close Time</div>
          <div className="text-body2 font-semibold">
            Mar 23, 2022, 9:00:00 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInfo;
