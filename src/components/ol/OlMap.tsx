import { Map, View } from "ol"
import { useGeographic } from "ol/proj"
import { useEffect, useMemo, useRef, useState } from "react"
import { OlMapContext } from "../../context/OlMapContext"
import { defaults as defaultControls } from "ol/control"
import styled from "styled-components"

const StyledMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  //Control styles
  .ol-overlaycontainer-stopevent {
    // Zoom control styles
    .ol-zoom {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      bottom: 3rem;
      right: 3rem;
      background-color: white;
      width: 2rem;
      height: max-content;
      padding: 1.5rem;

      button {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border: unset;

        &:last-child {
          margin-top: 0.5rem;
        }
      }
    }
  }
`

type OlMapProps = {
  children: React.ReactNode
  zoom?: number
  center?: [number, number]
}

const DEFAULT_ZOOM = 15
const DEFAULT_CENTER = [-0.189115, 51.502982]

export const OlMap: React.FunctionComponent<OlMapProps> = ({
  children,
  zoom,
  center,
}) => {
  const [olMap, setOlMap] = useState<Map>()
  const mapRef = useRef<HTMLDivElement>(null)

  // importing hook to use LAT/LON values
  useGeographic()

  const memoizedViewOptions = useMemo(
    () => ({ zoom: zoom ?? DEFAULT_ZOOM, center: center ?? DEFAULT_CENTER }),
    [center, zoom]
  )

  useEffect(() => {
    const mapOptions = {
      view: new View(memoizedViewOptions),
      layers: [],
      controls: defaultControls({ attribution: false, rotate: false }),
      overlays: [],
    }
    const olMap = new Map(mapOptions)
    mapRef.current && olMap.setTarget(mapRef.current)
    setOlMap(olMap)
    return () => olMap.setTarget(undefined)
  }, [memoizedViewOptions])

  return (
    <OlMapContext.Provider value={{ map: olMap }}>
      <StyledMapWrapper ref={mapRef} data-testid="map-container">
        {children}
      </StyledMapWrapper>
    </OlMapContext.Provider>
  )
}
