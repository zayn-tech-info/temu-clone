import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function usePreviousLocation() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(null);
  const lastLocationRef = useRef(location);

  useEffect(() => {
    setPrevLocation(lastLocationRef.current);
    lastLocationRef.current = location;
  }, [location]);

  return prevLocation;
}
