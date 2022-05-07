const SaleInfo = () => {
  return (
    <div className="w-full">
      <div className="text-white text-lg font-semibold">IDO Info</div>
      <div className="rounded-lg bg-gray-700 px-8 py-4 mt-4 divide-y divide-slate-600">
        <div className="flex justify-between py-3">
          <div>Hardcap</div>
          <div className="text-white font-semibold">140,000 USDC</div>
        </div>
        <div className="flex justify-between py-3">
          <div>Sale Rate</div>
          <div className="text-white font-semibold">0.012 USDC</div>
        </div>
        <div className="flex justify-between py-3">
          <div>Sale type</div>
          <div className="text-white font-semibold">Vested</div>
        </div>
        <div className="flex justify-between py-3">
          <div>Open Time</div>
          <div className="text-white font-semibold">
            Mar 21, 2022, 1:00:00 AM
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div>Close Time</div>
          <div className="text-white font-semibold">
            Mar 23, 2022, 9:00:00 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInfo;
