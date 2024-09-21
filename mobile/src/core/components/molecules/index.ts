import styled, { css } from "@emotion/native"

const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: ${(props) => props.theme["base-100"]};
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
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.secondary};
`

const SafeArea = styled.SafeAreaView`
    flex: 1;
`

const Scroll = styled.ScrollView`
    flex: 1;
`

const InputLabel = styled.Text`
    font-size: 16px;
    margin-top: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.secondary};
`

const InputBox = styled.View`
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.secondary};
    padding: 5px 10px;
    margin-top: 5px;
    gap: 5px;
    align-items: center;
    flex-direction: row;
`

const inputStyle = css`
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    padding: 8px 0;
`

export { Container, ButtonTouchable, ButtonPressable, ButtonText, SafeArea, Scroll, InputLabel, InputBox, inputStyle }
