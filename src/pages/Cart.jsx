import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aongaHighStreetPrintRetroImg } from "../constants";
const Cart = () => {
return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
        <div className="flex items-center gap-3">
            <Link to="/">
                <img
                    src="https://i.pinimg.com/736x/57/50/ee/5750ee196307e61f0e21a9f442c4fb25.jpg"
                    width="60px"
                    alt="Temu logo"
                />
            </Link>
            <p className="text-lg font-medium text-green-600">
                All items are safeguarded
            </p>
        </div>
        <div className="flex py-5">
            <Link to="/" className="text-gray-500">
                Home
            </Link>
            <ChevronRight />
            <Link className="font-medium">cart</Link>
        </div>
        <div className="w-4/6">
            <div className="flex justify-between rounded-md bg-green-600 font-medium text-white py-2 px-3">
                <div className="flex gap-3">
                    <Check />
                    <p>Free shipping for you</p>
                </div>
                <p>Limited-time offer</p>
            </div>
            <div>
                <div className="py-5 space-y-3">
                    <div className="flex items-center justify-between border p-4">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" />
                            <p>Select all (1)</p>
                        </div>
                        <div className="text-gray-500">
                            <p>Delete</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border p-4">
                        <input type="checkbox" />
                        <img
                            src={aongaHighStreetPrintRetroImg}
                            alt="Product"
                            className="w-24 h-24 object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-medium">Aonga High-StreetPrint Retro</p>
                            <div className="flex justify-between mt-2">
                                <p className="text-red-500">₦17,601</p>
                                
                                <select className="border px-2">
                                    Qty
                                    {[...Array(100)].map((_, index) => (
                                        <option key={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Cart;
