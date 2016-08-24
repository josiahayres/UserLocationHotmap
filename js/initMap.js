// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA83xw8YXwykCAiTfEwq03PqmdB8IIB8pU&libraries=places">
var pointsArray;
var heatmap;
var map;
var center = new google.maps.LatLng(9.441688, 179.101678);

function clearText(){
    document.getElementById('pac-input').value = "";
}

function centerMap(){
	clearText();
	map.setZoom(2);
	map.setCenter({lat:9.441688, lng:179.101678});
}
function initMap() {
    pointsArray = new google.maps.MVCArray([
        new google.maps.LatLng(-36.851921, 174.762402),
        new google.maps.LatLng(-36.851921, 174.762402),
        new google.maps.LatLng(-36.851921, 174.762402),
        new google.maps.LatLng(-36.851921, 174.762402),
        new google.maps.LatLng(-36.851921, 174.762402)]
    );
    //var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    var auckland = new google.maps.LatLng(-36.851921, 174.762402);
	var center = new google.maps.LatLng(9.441688, 179.101678);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 2,
        mapTypeId: 'roadmap',
        minZoom:2, 
        maxZoom: 12
    });
    
    heatmap = new google.maps.visualization.HeatmapLayer(
    {
        data: pointsArray
    });
    heatmap.setMap(map);

    var input = /** @type {!HTMLInputElement} */(document.getElementById('pac-input'));

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    marker.setMap(map);

    infowindow.addListener('closeclick',function(){
        marker.setVisible(false); //removes the marker
        centerMap(map);
    });

    autocomplete.addListener('click',function(){

    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        var newLocation = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
        marker.setPosition(newLocation);
        marker.setVisible(true);
		
		
        pointsArray.push(newLocation);


        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    });   
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 30);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}
