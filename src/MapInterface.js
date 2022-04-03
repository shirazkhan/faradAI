import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import { GlobalStateContext } from './App';
import 'leaflet/dist/leaflet.css';

const Container = styled(MapContainer)`
    height: 100vh;
    z-index: 22;
    position: relative;
`

const Interface = styled.div`
    width: 80%;
    height: 65px;
    position: absolute;
    z-index: 33;
    top: 10px;
    left: 55px;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Input = styled.input`
    height: 35px;
    width: 250px;
    font-size: 24px;
    border-radius: 25px;
    border: 1px solid grey;
    padding: 0 20px;
`;

const Button = styled.button`
    height: 35px;
    width: 125px;
    font-size: 24px;
    border-radius: 25px;
    border: 1px solid grey;
    padding: 0 20px;
`;

export default function MapInterface() {

  const { globalState, dispatch } = useContext(GlobalStateContext);

  return (
    <>
      <Interface>
        <form>
          <Input
            name='subdivision'
            placeholder='Subdivision'>
          </Input>
          <Input
            name='country'
            placeholder='Country'>
          </Input>
          <Button>Search</Button>
        </form>
        <Button>Clear</Button>
      </Interface>
      <Container center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Container>
    </>
  )
}
