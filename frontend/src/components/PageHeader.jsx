import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PageHeader = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <>
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

      <div className="flex items-center gap-2 py-5">
        <Link to="/" className="text-gray-500">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <div key={to} className="flex items-center gap-2">
              <ChevronRight className="inline w-4 h-4" />
              {isLast ? (
                <span className="font-medium capitalize">{value}</span>
              ) : (
                <Link to={to} className="text-gray-500 capitalize">
                  {value}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PageHeader;
