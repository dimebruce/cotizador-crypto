import { useState,useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

// style para el submit
const InputSubmit = styled.input`
    color: white;
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    margin-bottom: 30px;
    transition: background-color .3s ease;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setMonedas}) => {

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false)
 
    // Invocando el hook selectMonedas
    const [ moneda, SelectMonedas ] = useSelectMonedas("Escoge tu moneda 💲", monedas)    
    
    // Invocando el hook selectMonedas
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas("Escoge tu criptomoneda 💎", criptos)

    // Consumiendo una API de crypto https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD
    useEffect(() => {
            const consultarAPI = async () => {
                const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

                // Bloqueamos el codigo hasta que haya una respuesta para url
                const respuesta = await fetch(url)
                // Transformamos la respuesta en un JSON
                const resultado = await respuesta.json()
                //Entrando a la data que contiene las cryptos
                // console.log(resultado.Data);

                // Creando objeto para pasar el id y el nombre 

                

                const arrayCripto = resultado.Data.map( cripto => {
                    const objetoCripto = {
                        id:         cripto.CoinInfo.Name,
                        nombre:     cripto.CoinInfo.FullName
                    }

                    return objetoCripto
                } )

                setCriptos(arrayCripto)
            }
            consultarAPI()
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }
        setError(false)

        // Mandando el valor de moneda y crypto a la app.jsx
        setMonedas({
            moneda,
            criptomoneda
        })
    }


    return (
        
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form
            // Validaciones
            onSubmit={handleSubmit}
        >
            <SelectMonedas/>
            <SelectCriptomoneda/>
            <InputSubmit 
                type="submit" 
                value="Cotizar"
            />
        </form>
    </>    
  )
}

export default Form