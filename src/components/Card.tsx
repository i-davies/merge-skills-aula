import { StyleSheet, Text, View } from "react-native";

type propsCard = {
    title: string,
    body: string
}

export default function Card({title, body} : propsCard) {
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                {/* <Octicons size={44} color={'#bdbdbd'} name="home" /> */}
                <Text style={styles.body}>{body}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 16,
        borderColor: '#bdbdbd'
    },
    content: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        gap:20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    body: {
        flexShrink: 1,
        fontSize: 18,
        color: '#4a4a4a'
    }
})