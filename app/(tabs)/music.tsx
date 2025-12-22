import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function MusicScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
        return (
            <SafeAreaView edges={["top"]} style={styles.safeArea}>
                <ThemedView style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#1DB954" />
                </ThemedView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.headerTitle}>
                        Музыка для тренировок
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Tecktonik from Spotify
                    </ThemedText>
                </View>

                <View style={styles.playerContainer}>
                    <WebView
                        source={{ html: generateSpotifySearchHTML() }}
                        style={styles.webView}
                        scrollEnabled={true}
                        javaScriptEnabled={true}
                    />
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}

function generateSpotifySearchHTML(): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {
                    margin: 0;
                    padding: 10px;
                    background: transparent;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }
                iframe {
                    border: none;
                    width: 100%;
                    height: 600px;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
            <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/17npF7OXRoOP47JUaOuc2I?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </body>
        </html>
    `;
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: "#1DB954",
        fontWeight: "500",
    },
    playerContainer: {
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "#fff",
    },
    webView: {
        flex: 1,
    },
});
