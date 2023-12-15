"use client"

import MapWithMarkers from '@/components/MapWithMarkers';
import { useState } from 'react';

export default function NearbyLocationPage() {
  const [position, setPosition] = useState<[number, number]>([36.715992, -4.477982])
  const [positions, setPositions] = useState<{lat: number, lon: number}[]>([])
  const [address, setAddress] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) e.preventDefault();
    try {
      const reverseResult = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=jsonv2`)
      const reverseData = await reverseResult.json()
      if (reverseData.length == 0) throw new Error("No results found")
      setPosition([parseFloat(reverseData[0].lat), parseFloat(reverseData[0].lon)])
      const nearbyResults =  await fetch(`api/nearby?lat=${reverseData[0].lat}&lon=${reverseData[0].lon}&radius=3`)
      const nearbyData = await nearbyResults.json()
      if (nearbyData.length == 0) throw new Error("No results found")
      setPositions(nearbyData)
      if (message != "") setMessage("")
    } catch (e) {
      setMessage("No results found")
      }
    }
    return (
      <>
        <MapWithMarkers mainPosition={position} positions={positions} />
        <h1
          className="items-center text-center mt-2 py-1 font-bold text-2xl"
        >Localizacion a Buscar</h1>
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={onFormSubmit}
        >
          <label htmlFor="address">Direccion</label>
          <input
            className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
            type="text"
            step="0.001"
            name="address"
            id="address"
            value={address}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                onFormSubmit(null)
              }
            }
            }
            onChange={(e) => {
              setAddress(e.target.value.trim())
            }}
          />
          <br />
          <input
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Submit"
          />
          {message != "" && <p className="text-red-500">{message}</p>}
        </form>
      </>
    );
}
