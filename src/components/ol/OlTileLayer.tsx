import { FunctionComponent, useEffect } from "react"
import TileLayer from "ol/layer/Tile"
import TileSource from "ol/source/Tile"
import { useOlMapContext } from "../../hooks/useOlMapContext"

type OlTileLayerProps = {
  source: TileSource
  zIndex?: number
}

export const OlTileLayer: FunctionComponent<OlTileLayerProps> = ({
  source,
  zIndex = 0,
}) => {
  const { map } = useOlMapContext()
  useEffect(() => {
    if (!map) return
    const olTileLayer = new TileLayer({
      source,
      zIndex: 10,
    })
    map.addLayer(olTileLayer)

    return () => {
      map.removeLayer(olTileLayer)
    }
  }, [map, source])

  return null
}
