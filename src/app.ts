const form = document.querySelector("form")!;
const inputElm = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(ev: Event) {
  ev.preventDefault();
  const valInput = inputElm.value;

  console.log(valInput);
  fetch<GoogleGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      valInput
    )}&key=${GOOGLE_API_KEY}`
  )
    .then(rsp => {
      if (rsp.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = rsp.data.results[0].geometry.location;

      //   console.log(rsp);
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(error => {
      window.alert(error.message);
      console.log(error);
    });
}

form.addEventListener("submit", searchAddressHandler);
