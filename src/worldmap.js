export default class WorldMap {
  constructor(ctrl, mapContainer) {
    this.ctrl = ctrl;
    this.mapContainer = mapContainer;
    this.createMap();
  }

  createMap() {
    const mapCenter = window.L.latLng(this.ctrl.panel.mapCenterLatitude, this.ctrl.panel.mapCenterLongitude);
    this.map = window.L.map(this.mapContainer, {worldCopyJump: true, center: mapCenter})
      .fitWorld()
      .zoomIn(this.ctrl.panel.initialZoom);
    this.map.panTo(mapCenter);

    const selectedTileServer = this.ctrl.tileServers[this.ctrl.tileServer];
    window.L.tileLayer(selectedTileServer.url, {
      maxZoom: 18,
      subdomains: selectedTileServer.subdomains,
      reuseTiles: true,
      detectRetina: true,
      attribution: selectedTileServer.attribution
    }).addTo(this.map);
  }

  resize() {
    this.map.invalidateSize();
  }

  panToMapCenter() {
    this.map.panTo([this.ctrl.panel.mapCenterLatitude, this.ctrl.panel.mapCenterLongitude]);
    this.ctrl.mapCenterMoved = false;
  }

  addLegend(legend) {
    legend.addTo(this.map);
  }

  removeLegend(legend) {
    legend.removeFrom(this.map);
  }

  addCircles(circles) {
    return window.L.layerGroup(circles).addTo(this.map);
  }

  removeCircles(circlesLayer) {
    this.map.removeLayer(circlesLayer);
  }

  setZoom(zoomFactor) {
    this.map.setZoom(zoomFactor);
  }

  remove() {
    this.map.remove();
  }
}