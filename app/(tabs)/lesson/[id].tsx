import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

type Lesson = {
    id: string;
    title: string;
    level: "Начинающий" | "Средний" | "Продвинутый";
    duration: string;
    description: string;
    searchQuery?: string;
};

const lessonsData: Lesson[] = [
    {
        id: "1",
        title: "Основы тектоника",
        level: "Начинающий",
        duration: "10 мин",
        description: "Изучите базовые движения и ритм танца тектоник",
        searchQuery: "tecktonic tutorial for beginners",
    },
    {
        id: "2",
        title: "Движения рук",
        level: "Начинающий",
        duration: "15 мин",
        description: "Выучите правильные движения рук",
        searchQuery: "tecktonic hand movements tutorial",
    },
    {
        id: "3",
        title: "Ритмические комбинации",
        level: "Средний",
        duration: "20 мин",
        description: "Освойте сложные комбинации движений",
        searchQuery: "tecktonic rhythmic combinations",
    },
    {
        id: "4",
        title: "Продвинутые техники",
        level: "Продвинутый",
        duration: "25 мин",
        description: "Техники для опытных танцоров",
        searchQuery: "advanced tecktonic dance techniques",
    },
];

export default function LessonDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const lesson = lessonsData.find((l) => l.id === id);

    if (!lesson) {
        return (
            <SafeAreaView edges={["top"]} style={styles.safeArea}>
                <ThemedView style={styles.container}>
                    <ThemedText>Урок не найден</ThemedText>
                </ThemedView>
            </SafeAreaView>
        );
    }

    const youtubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        lesson.searchQuery || lesson.title
    )}`;

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <ThemedView style={styles.container}>
                {/* Header with back button */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <IconSymbol
                            name="chevron.left"
                            size={24}
                            color="#0a7ea4"
                        />
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.headerTitle}>
                        {lesson.title}
                    </ThemedText>
                    <View style={{ width: 24 }} />
                </View>

                {/* Lesson info */}
                <View style={styles.lessonInfo}>
                    <View style={styles.infoRow}>
                        <ThemedText style={styles.infoLabel}>
                            Уровень:
                        </ThemedText>
                        <ThemedText style={styles.level}>
                            {lesson.level}
                        </ThemedText>
                    </View>
                    <View style={styles.infoRow}>
                        <ThemedText style={styles.infoLabel}>
                            Длительность:
                        </ThemedText>
                        <ThemedText style={styles.duration}>
                            {lesson.duration}
                        </ThemedText>
                    </View>
                    <ThemedText style={styles.description}>
                        {lesson.description}
                    </ThemedText>
                </View>

                {/* YouTube Videos Section */}
                <ThemedText type="defaultSemiBold" style={styles.videosTitle}>
                    Видео уроки YouTube
                </ThemedText>

                <View style={styles.webViewContainer}>
                    <WebView
                        source={{ uri: youtubeSearchURL }}
                        style={styles.webView}
                        scalesPageToFit={true}
                        scrollEnabled={true}
                        javaScriptEnabled={true}
                    />
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
        marginHorizontal: 8,
    },
    lessonInfo: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        alignItems: "center",
    },
    infoLabel: {
        fontWeight: "600",
        fontSize: 14,
    },
    level: {
        fontSize: 14,
        color: "#0a7ea4",
        fontWeight: "bold",
    },
    duration: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
    },
    description: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        marginTop: 8,
    },
    videosTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginBottom: 12,
    },
    webViewContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
    },
    webView: {
        flex: 1,
    },
});
