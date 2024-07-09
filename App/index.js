// Filename: index.js
// Combined code from all files

import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Button, View, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function App() {
    const [hero, setHero] = React.useState('');
    const [villain, setVillain] = React.useState('');
    const [plot, setPlot] = React.useState('');
    const [story, setStory] = React.useState('');

    const generateStory = async () => {
        try {
            const response = await axios.post('http://apihubp.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please generate a fairy tale." },
                    { role: "user", content: `Create a fairy tale with the hero: ${hero}, the villain: ${villain}, and the plot: ${plot}` }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            setStory(data.response);
        } catch (error) {
            Alert.alert("Error", "Could not generate story. Please try again later.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Create Your Own Fairy Tale</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Story" onPress={generateStory} />
                {story ? (
                    <View style={styles.storyBox}>
                        <Text style={styles.story}>{story}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
    storyBox: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        width: '100%',
    },
    story: {
        fontSize: 16,
    },
});