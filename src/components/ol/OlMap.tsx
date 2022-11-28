import { Map, View } from "ol";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

type OlMapProps = {
  children: React.ReactNode;
  zoom?: number;
  center?: [number, number];
};

type OlMapContextT = {
  map: Map | undefined;
};

export const OlMapContext = createContext<OlMapContextT | null>(null);

export const OlMap: React.FunctionComponent<OlMapProps> = ({
  children,
  zoom,
  center,
}) => {
  const [olMap, setOlMap] = useState<Map>();
  const mapRef = useRef<HTMLDivElement>(null);
  const memoizedViewOptions = useMemo(
    () => ({ zoom: 5, center: [53.388504070398064, -2.9805909170326585] }),
    [zoom]
  );

  useEffect(() => {
    const mapOptions = {
      view: new View(memoizedViewOptions),
      layers: [],
      controls: [],
      overlays: [],
    };
    const olMap = new Map(mapOptions);
    mapRef.current && olMap.setTarget(mapRef.current);
    setOlMap(olMap);
    return () => olMap.setTarget(undefined);
  }, [memoizedViewOptions]);

  return (
    <OlMapContext.Provider value={{ map: olMap }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </OlMapContext.Provider>
  );
};
