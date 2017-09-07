    var blue_micbill_free = new L.LayerGroup();
    var green_conv_store = new L.LayerGroup();
    var yellow_micbill_paid = new L.LayerGroup();
    var red_carpark = new L.LayerGroup();

    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/bigdata01/{id}/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlnZGF0YTAxIiwiYSI6ImNpdDJnand6dzB0NmgyeWtoaXo3cnBtMHoifQ.da-eM-IDQOlkmfO4mN63zQ';

    var light   = L.tileLayer(mbUrl, {id: 'cit2j2opr00082xo5rj0k2o13', 
                      maxZoom: 18,
                      minZoom: 11,
                      attribution: mbAttr});


    var map = L.map('map', {
        center: [22.337533, 114.17475],
        zoom: 13,
        maxBounds: ([[22.176455, 113.817209],[22.560632, 114.451706]]),
        layers: [light, blue_micbill_free, green_conv_store, red_carpark, yellow_micbill_paid]
    });

    var baseMaps = {
      "light":light
    };

    var overlayMaps = {
        "不收費路旁泊車位": blue_micbill_free,
        "收費路旁泊車位": yellow_micbill_paid,
        "停車場": red_carpark,
        "便利店": green_conv_store
    };

    L.control.layers({}, overlayMaps, {
      collapsed: false,
      position: 'bottomright'
    }).addTo(map);

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML =   (props ? '<h4>' + props.type + '</h4>' +
            '<b>' + props.name_chi + '</b><br />' + props.address + '<br />' + props.paid +  '<br />' + props.free
            : '請選擇');
    };

    info.addTo(map);

    function onEachFeature(feature, layer) {
          layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            })
        }


    function highlightFeature(e) {
        var layer = e.target;
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            // layer.bringToFront();
        }
    //     info.update(layer.feature.properties);
    }


    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e) {
      var layer = e.target;
      var latLngs  = [e.target.getLatLng()];
      var markerBounds = L.latLngBounds(latLngs);
      map.fitBounds(markerBounds, {maxZoom: 18});
      info.update(layer.feature.properties);
    }

    var blue_micbill_free_style = {
        radius: 30,
        color: "#3498db",
        fillColor: "#3498db",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };

    var green_conv_store_style = {
        radius: 15,
        color: "#2ecc71",
        fillColor: "#2ecc71",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };

    var red_carpark_style = {
        radius: 30,
        color: "#e74c3c",
        fillColor: "#e74c3c",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };

    var yellow_micbill_paid_style = {
        radius: 30,
        color: "#f1c40f",
        fillColor: "#f1c40f",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };

    geojson = L.geoJson(blue_micbill_free_list, {
      onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, blue_micbill_free_style);
        }
    }).addTo(blue_micbill_free);

    L.geoJson(green_conv_store_list, {
      onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, green_conv_store_style);
        }
    }).addTo(green_conv_store);

    L.geoJson(red_carpark_list, {
      onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, red_carpark_style);
        }
    }).addTo(red_carpark);


    L.geoJson(yellow_micbill_paid_list, {
      onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, yellow_micbill_paid_style);
        }
    }).addTo(yellow_micbill_paid);  



    map.locate({setView: true, maxZoom: 16});

    function onLocationFound(e) {
    var radius = e.accuracy / 2;
    }

    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
    alert(e.message);
    }

    map.on('locationerror', onLocationError);