import React from "react";

function CustomerList() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900">
            Müşteri Listesi
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Hepsini Gör
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Mehmet Kaya"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Mehmet Kaya
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    mehmet@example.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  $730
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Mehmet Kaya"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Mehmet Kaya
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    mehmet@example.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  $730
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Mehmet Kaya"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Mehmet Kaya
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    mehmet@example.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  $730
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
