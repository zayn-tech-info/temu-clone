const Footer = () => {
return (
    <div className="bg-gray-900 text-white py-12 px-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Company info</h3>
                <div className="space-y-2">
                    <p className="hover:text-gray-300 cursor-pointer">About Temu</p>
                    <p className="hover:text-gray-300 cursor-pointer">Temu - Shop Like a Billionaire</p>
                    <p className="hover:text-gray-300 cursor-pointer">Affiliate & influencer: Commisson</p>
                    <p className="hover:text-gray-300 cursor-pointer">Contact Us</p>
                    <p className="hover:text-gray-300 cursor-pointer">Press</p>
                    <p className="hover:text-gray-300 cursor-pointer">Temu's Tree Planting Program</p>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Customer service</h3>
                <div className="space-y-2">
                    <p className="hover:text-gray-300 cursor-pointer">Return & refund policy</p>
                    <p className="hover:text-gray-300 cursor-pointer">Intellctual property policy</p>
                    <p className="hover:text-gray-300 cursor-pointer">Shipping info</p>
                    <p className="hover:text-gray-300 cursor-pointer">Report suspicious activity</p>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Help</h3>
                <div className="space-y-2">
                    <p className="hover:text-gray-300 cursor-pointer">Support</p>
                    <p className="hover:text-gray-300 cursor-pointer">Safety center</p>
                    <p className="hover:text-gray-300 cursor-pointer">temu purchase protection</p>
                    <p className="hover:text-gray-300 cursor-pointer">Sitemap</p>
                    <p className="hover:text-gray-300 cursor-pointer">Partner with Temu</p>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Download the Temu App</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-sm">Price drop alert</p>
                        <p className="text-sm">Faster and more secure checkout</p>
                        <p className="text-sm">Exclusive offer</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm">Track order anytime</p>
                        <p className="text-sm">Low stock item alert</p>
                        <p className="text-sm">Coupons & offers alert</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="download-temu mb-4">
                        <img
                            src="https://i.pinimg.com/736x/e4/c3/86/e4c38603f7ff1c04fba177f18183b104.jpg"
                            alt=""
                            className="w-48 rounded-lg"
                        />
                    </div>
                    <div className="connect-with-temu">
                        <h4 className="text-lg font-semibold mb-2">Connect with Temu</h4>
                        <span className="flex gap-4 text-2xl">
                            <ion-icon name="logo-instagram" className="hover:text-gray-300 cursor-pointer"></ion-icon>
                            <ion-icon name="logo-facebook" className="hover:text-gray-300 cursor-pointer"></ion-icon>
                            <ion-icon name="logo-twitter" className="hover:text-gray-300 cursor-pointer"></ion-icon>
                            <ion-icon name="logo-tiktok" className="hover:text-gray-300 cursor-pointer"></ion-icon>
                            <ion-icon name="logo-youtube" className="hover:text-gray-300 cursor-pointer"></ion-icon>
                            <ion-icon name="logo-pinterest" className="hover:text-gray-300 cursor-pointer"></ion-icon>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex gap-6 text-sm text-gray-400 border-t border-gray-700 pt-6">
            <i>© 2024 Zayn Inc. </i>
            <a href="#" className="hover:text-white">Term of use</a>
            <p className="hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer">Your Privacy choice</p>
            <p className="hover:text-white cursor-pointer">Add Choice</p>
        </div>
    </div>
);
};

export default Footer;
