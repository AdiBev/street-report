import { render, screen } from "@testing-library/react"
import OSM from "ol/source/OSM"
import { OlLayers } from "./OlLayers"
import { OlMap } from "./OlMap"
import { OlTileLayer } from "./OlTileLayer"

describe("OlMap", () => {
  it("renders map", () => {
    render(
      <OlMap>
        <OlLayers>
          <OlTileLayer source={new OSM()} />
        </OlLayers>
      </OlMap>
    )
    expect(screen.getByTestId("map-container")).toBeInTheDocument()
  })
})
