import styled from '@emotion/styled'

const Texto = styled.div`
    background-color: #c94841e4;
    color: #FFF;
    padding: 10px;
    font-size: 22px;
    text-transform: uppercase;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    border-radius: 10px;
`

const Error = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Error
