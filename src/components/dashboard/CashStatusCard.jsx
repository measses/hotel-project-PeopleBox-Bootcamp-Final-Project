import React from "react";

function CashStatusCard() {
  return (
    <div className="max-w-2xl mx-auto w-[330px]">
      <div className="p-6 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900">
            Kasa Durumu
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Detaylar
          </a>
        </div>
        <div className="flow-root">
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Mevcut Bakiye
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  $12,345.67
                </p>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a1 1 0 011-1h8a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V3zm9 1H6v10h8V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Toplam Gelir
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  $20,000.00
                </p>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6zm1 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Toplam Gider
                </p>
                <p className="text-lg font-semibold text-gray-900">$7,654.33</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashStatusCard;
