const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 sm:px-8">
      {/* Top grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Company info */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Company info
          </h3>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="hover:text-gray-300 cursor-pointer">About Temu</p>
            <p className="hover:text-gray-300 cursor-pointer">
              Temu - Shop Like a Billionaire
            </p>
            <p className="hover:text-gray-300 cursor-pointer">
              Affiliate & influencer: Commission
            </p>
            <p className="hover:text-gray-300 cursor-pointer">Contact Us</p>
            <p className="hover:text-gray-300 cursor-pointer">Press</p>
            <p className="hover:text-gray-300 cursor-pointer">
              Temu's Tree Planting Program
            </p>
          </div>
        </div>

        {/* Customer service */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Customer service
          </h3>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="hover:text-gray-300 cursor-pointer">
              Return & refund policy
            </p>
            <p className="hover:text-gray-300 cursor-pointer">
              Intellectual property policy
            </p>
            <p className="hover:text-gray-300 cursor-pointer">Shipping info</p>
            <p className="hover:text-gray-300 cursor-pointer">
              Report suspicious activity
            </p>
          </div>
        </div>

        {/* Help */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Help</h3>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="hover:text-gray-300 cursor-pointer">Support</p>
            <p className="hover:text-gray-300 cursor-pointer">Safety center</p>
            <p className="hover:text-gray-300 cursor-pointer">
              Temu purchase protection
            </p>
            <p className="hover:text-gray-300 cursor-pointer">Sitemap</p>
            <p className="hover:text-gray-300 cursor-pointer">
              Partner with Temu
            </p>
          </div>
        </div>

        {/* App & Socials */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Download the Temu App
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>Price drop alert</p>
              <p>Faster & secure checkout</p>
              <p>Exclusive offers</p>
            </div>
            <div className="space-y-2">
              <p>Track order anytime</p>
              <p>Low stock alerts</p>
              <p>Coupons & deals</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-4">
              <img
                src="https://i.pinimg.com/736x/e4/c3/86/e4c38603f7ff1c04fba177f18183b104.jpg"
                alt="Temu App"
                className="w-40 sm:w-48 rounded-lg"
              />
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">
                Connect with Temu
              </h4>
              <span className="flex gap-4 text-xl sm:text-2xl">
                <ion-icon
                  name="logo-instagram"
                  class="hover:text-gray-300 cursor-pointer"
                ></ion-icon>
                <ion-icon
                  name="logo-facebook"
                  class="hover:text-gray-300 cursor-pointer"
                ></ion-icon>
                <ion-icon
                  name="logo-twitter"
                  class="hover:text-gray-300 cursor-pointer"
                ></ion-icon>
                <ion-icon
                  name="logo-tiktok"
                  class="hover:text-gray-300 cursor-pointer"
                ></ion-icon>
                <ion-icon
                  name="logo-youtube"
                  class="hover:text-gray-300 cursor-pointer"
                ></ion-icon>
                <ion-icon
                  name="logo-pinterest"
                  class="hover:text-gray-300 cursor-pointer"
                ></ion-icon>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400 border-t border-gray-700 pt-6">
        <i>© 2024 Zayn Inc.</i>
        <a href="#" className="hover:text-white">
          Terms of use
        </a>
        <p className="hover:text-white cursor-pointer">Privacy Policy</p>
        <p className="hover:text-white cursor-pointer">Your Privacy choices</p>
        <p className="hover:text-white cursor-pointer">Ad Choices</p>
      </div>
    </footer>
  );
};

export default Footer;
