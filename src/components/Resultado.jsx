import styled from "@emotion/styled"

const Contenedor = styled.div`
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Parrafo = styled.p`
font-size: 16px;
`

const Precio = styled.p`
font-size: 24px;
span {
    font-weight: 900;
    color: aquamarine;
}
`

const Resultado = ({resultado}) => {

    // Aplicando destructuring a todo lo que viene desde resultado
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <Contenedor>
        <Imagen
            src={`https://cryptocompare.com/${IMAGEURL}`}
            alt="Imagen"
        />
        <div>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Parrafo>Precio más alto del día: <span>{HIGHDAY}</span></Parrafo>
            <Parrafo>Precio más bajo del día: <span>{LOWDAY}</span></Parrafo>
            <Parrafo>Cambios en las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Parrafo>
            <Parrafo>Última actualización <span>{LASTUPDATE}</span></Parrafo>
        </div>
    </Contenedor>
  )
}

export default Resultado