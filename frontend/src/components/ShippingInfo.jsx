import { Bus, Mail, Phone, User } from "lucide-react";
import { useOrderStore } from "../stores/orderStore";

const ShippingInfo = () => {
  const { shippingAddress, setShippingAddress, setBilling, reset } = useOrderStore();

  const handleChange = (e) => {
    setShippingAddress({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="text-lg font-medium">Shipping Information</div>
      <div>
        <div>
          <div className="flex items-center gap-3 my-2 py-2 justify-center border-orange-500 border w-40 rounded-md">
            <Bus />
            <p>Delivery</p>
          </div>

          <form className="space-y-6 my-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full name <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={shippingAddress.fullName}
                  type="name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                  placeholder="Enter fulll name"
                />
              </div>
              {/*               {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
              $
              {errors.email
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300"} */}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={shippingAddress.email}
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={shippingAddress.phoneNumber}
                  type="number"
                  id="number"
                  name="number"
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Country <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={shippingAddress.country}
                  type="text"
                  id="country"
                  name="country"
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                  placeholder="Choose state"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={shippingAddress.city}
                    type="text"
                    id="city"
                    name="city"
                    onChange={handleChange}
                    className={`w-full pl-3 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={shippingAddress.state}
                    type="text"
                    id="state"
                    name="state"
                    onChange={handleChange}
                    className={`w-full pl-3 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ZIP Code <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={shippingAddress.zipCode}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    onChange={handleChange}
                    className={`w-full pl-3 pr-4 border-gray-400 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                    placeholder="Enter ZIP Code"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
