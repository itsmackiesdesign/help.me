import styled, { css } from "@emotion/native"

const Container = styled.View`
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const buttonCss = css`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`
const ButtonTouchable = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.primary};
    ${buttonCss}
`

const ButtonPressable = styled.Pressable`
    background-color: ${(props) => props.theme.primary};
    ${buttonCss}
`

const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: ${(props) => props.theme.text};
`

export { Container, ButtonTouchable, ButtonPressable, ButtonText }
