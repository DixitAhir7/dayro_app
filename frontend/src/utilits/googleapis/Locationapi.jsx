import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import Input from "utilits/reusableCode/Input";

export default function Locationapi({
    placeselect,
    libraries,
    inputref,
    containerStyle,
    searchBoxRef,
    center,
    marker
}) {
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLEMAP_APIKEY}
            libraries={libraries}>
            <div className="w-full">
                <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={placeselect}>
                    <Input
                        name='location'
                        type="text"
                        ref={inputref}
                        className="w-fit"
                        placeholder="ex: Gir"
                    />
                </StandaloneSearchBox>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}>
                    {marker && <Marker position={marker} />}
                </GoogleMap>
            </div>
        </LoadScript>
    )
};