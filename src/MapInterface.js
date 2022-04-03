import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import { GlobalStateContext } from './App';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Container = styled(MapContainer)`
    height: 100vh;
    z-index: 22;
    position: relative;
`

const MainBar = styled.div`
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

  const onEachSubDivision = (subdivision, layer) => {
    layer.bindPopup(subdivision.properties.name);
  }

  const handleSearch = e => {
    e.preventDefault();
    axios.get('admin1.json')
    .then(res => {
      const filteredData =
      {
          ...res.data,
          features: res.data.features.filter(s =>
              globalState.subDivisionInput
                  ? typeof s.properties.name === 'string' && s.properties.name.toLowerCase().includes(globalState.subDivisionInput.toLowerCase())
                  : globalState.countryInput
                      ? s.properties.country.toLowerCase().includes(globalState.countryInput.toLowerCase())
                      : s
          )
      }
      dispatch({type: 'HANDLE_SEARCH', value: filteredData});
    })
    .catch(err => console.log(err))
}

  return (
    <>
      <MainBar>
        <form onSubmit={handleSearch}>
          <Input
            value={globalState.subDivisionInput}
            onChange={e => dispatch({ type: 'HANDLE_SUBDIVISION_INPUT', value: e.target.value })}
            name='subdivision'
            placeholder='Subdivision'>
          </Input>
          <Input
            value={globalState.countryInput}
            onChange={e => dispatch({ type: 'HANDLE_COUNTRY_INPUT', value: e.target.value })}
            name='country'
            placeholder='Country'>
          </Input>
          <Button>Search</Button>
        </form>
        <Button onClick={() => dispatch({type: 'CLEAR_MAP'})}>Clear</Button>
      </MainBar>
      <Container center={[51.505, -0.09]} zoom={13}>
        {globalState.dataRender
          ? <GeoJSON key={Math.floor(Math.random() * 10000000)}
            data={globalState.dataRender.features}
            onEachFeature={onEachSubDivision}
          />
          : null}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Container>
    </>
  )
}
