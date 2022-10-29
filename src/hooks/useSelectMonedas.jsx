import { useState } from 'react'
import styled from '@emotion/styled';

const Label = styled.label`
    color: #fff;
    text-align: center;
    display: block;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
    font-weight: 700;
`;

const useSelectMonedas = (label, monedas) => {

    // Un state generico para varios usos
    const [state, setState] = useState('')

  const SelectMonedas = () => (
    <>
        <Label>{label}</Label>
        {/* Creando el select para las monedas */}
        <Select
            // El state es el valor que posee
            // setState es para guardar el valor que seleccione el user
            value={state}
            onChange={e=> setState(e.target.value)}
        >
            <option value="">Seleccione una moneda 👇</option>
        {monedas.map( moneda => (
                <option 
                    key={moneda.id}
                    value={moneda.id}
                >
                    {moneda.nombre}
                </option>
        ))}
        
        </Select>    
    </>
  )
  //Para retornar este valor cuando se invoque este hook
  return [ state, SelectMonedas ]
}

export default useSelectMonedas
