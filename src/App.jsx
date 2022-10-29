import { useState, useEffect } from 'react'
import Form from './components/Form'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import styled from '@emotion/styled'
import ImageCrypto from './assets/img/imagen-criptos.png'
import crypto from './assets/img/bitcoin.svg'

// Creando el contenedor de la app
const Contenedor = styled.div`
      max-width: 900px;
      margin: 0 auto;
      width: 90%;
      @media (min-width: 992px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
      }
`

// Style para la Image
const Imagen = styled.img`
      max-width: 400px;
      width: 80%;
      margin: 100px auto 0 auto;
      display: block;
`


// Creando el componente CSS para el stilo de H1
// En vez de aplicar un h1{propiedades}, se usaran las `` de template Strings
const Heading = styled.h1`
      font-family: 'Roboto', sans-serif;
      color: #FFF;
      text-align: center;
      font-weight: 700;
      margin-top: 80px;
      margin-bottom: 50px;
      font-size: 34px;

      &::after {
        content: '';
        width: 200px;
        height: 6px;
        background-color: #66A2FE;
        border-radius: 10px;
        display: block;
        margin: 10px auto 0 auto;
      }
`


function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)
 
  // En espera si existe algo en monedas
  useEffect(() => {
    if ( Object.keys(monedas).length > 0 ) {

      // Invocando a la API para que cotice el valor de la moneda
      const cotizarCripto = async () => {
        // Pasando a true nuestro loading
        setCargando(true)
        setResultado({})

        // Aplicando destructuring a monedas
        const { moneda, criptomoneda } = monedas

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respeuesta = await fetch(url)
        const resultado  = await respeuesta.json()

        // Una forma de acceder a objetos de forma dinamica con los corchetes
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        
        // Pasando a false nuestro loading
        setCargando(false)

      }

      cotizarCripto()
    }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen
        src={crypto}
        alt="Imagen de criptomoneda"
      />
      <div>
        <Heading>Cotizador de criptomonedas</Heading>
        <Form
          setMonedas={setMonedas}
        />

        {/* Creando un spinner que simule la carga */}
        {cargando && <Spinner/>}
        {/* Sólo se muestra si existe la propiedad precio en resultado */}
        { resultado.PRICE && <Resultado resultado={resultado} /> }
        
      </div>
    </Contenedor>
  )
}

export default App
