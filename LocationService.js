const LOCATION_API_KEY = "GX9GhQOZHQTGeAwHLtl08c8EHklTTANW"

const getLocation = async (address) => {
    const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${LOCATION_API_KEY}&location=${address},FI`)
    const data = await response.json()
    const latLng = data.results[0].locations[0].latLng
    return { latitude: latLng.lat, longitude: latLng.lng }
}

export { getLocation }