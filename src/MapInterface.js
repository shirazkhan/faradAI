import React, { useRef, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import styled from 'styled-components';
import { GlobalStateContext } from './App';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Container = styled(MapContainer)`
    height: 100vh;
    z-index: 22;
    position: relative;
`

const MainBarContainer = styled.div`
    width: 95%;
    height: 65px;
    position: absolute;
    z-index: 33;
    top: 10px;
    left: 55px;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
`;

const MainBar = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Input = styled.input`
    height: 35px;
    width: 250px;
    font-size: 24px;
    border-radius: 25px;
    border: none;
    padding: 0 20px;
    background: rgba(255,255,255,0.7);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Button = styled.button`
    height: 35px;
    width: 125px;
    font-size: 24px;
    border-radius: 25px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 0 20px;
    background: rgba(255,255,255,0.7);
`;

const SideMenu = styled.div`
    height: 500px;
    width: 225px;
    left: 12px;
    top: 100px;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(5px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: absolute;
    z-index: 66;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    border-radius: 20px;
    align-items: center;
    ::-webkit-scrollbar {
      display: none;
    }
`;

const SideMenuItem = styled.div`
    background: rgba(255,255,255,0.7);
    width: 120px;
    height: 35px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 25px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0 10px;
`;

function SetView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default function MapInterface() {

  const { globalState, dispatch } = useContext(GlobalStateContext);
  const animateRef = useRef(false);

  const processData = () => {

  }

  useEffect(() => {
    const preProcessor = () =>
      axios.get('admin1.json')
        .then(res => {
          const flatCoords = res.data.features.map(s => {
            return { properties: s.properties, coordinates: s.geometry.coordinates[0].flat() }
          })
          dispatch({ type: 'PREPROCESS_DATA', value: flatCoords })
        })

    preProcessor();
  }, [])

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
        dispatch({ type: 'HANDLE_SEARCH', value: filteredData });
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <MainBarContainer>
        <MainBar onSubmit={handleSearch}>
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
          <Button type='button' onClick={() => dispatch({ type: 'CLEAR_MAP' })}>Clear</Button>
        </MainBar>
        <Button onClick={() => dispatch({ type: 'LOG_OUT' })}>Logout</Button>
      </MainBarContainer>
      {/* <SideMenu>
        <h3>Results (0)</h3>
        {globalState.dataRender ? globalState.dataRender.features.map(s => <SideMenuItem>{s.properties.name}</SideMenuItem>) : null}
      </SideMenu> */}
      <Container center={[51.505, -0.09]} zoom={13}>
        {globalState.dataRender
          ?
          <>
            <GeoJSON key={Math.floor(Math.random() * 10000000)}
              data={globalState.dataRender.features}
              onEachFeature={onEachSubDivision}
            />
            {/* <SetView coords={globalState.dataRender.features[0].geometry.coordinates[0][0][0]} /> FLY TO BUGGY! */}
          </>
          : null}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Container>
    </>
  )
}
