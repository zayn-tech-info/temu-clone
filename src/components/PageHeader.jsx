import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PageHeader = ({ pagename }) => {
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
      <div className="flex py-5">
        <Link to={`/`} className="text-gray-500">
          Home
        </Link>
        <ChevronRight />
        <Link className="font-medium">{pagename}</Link>
      </div>
    </>
  );
};

export default PageHeader;
