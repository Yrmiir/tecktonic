import { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

type Lesson = {
    id: string;
    title: string;
    level: "Начинающий" | "Средний" | "Продвинутый";
    duration: string;
    description: string;
};

const lessonsData: Lesson[] = [
    {
        id: "1",
        title: "Основы тектоника",
        level: "Начинающий",
        duration: "10 мин",
        description: "Изучите базовые движения и ритм танца тектоник",
    },
    {
        id: "2",
        title: "Движения рук",
        level: "Начинающий",
        duration: "15 мин",
        description: "Выучите правильные движения рук",
    },
    {
        id: "3",
        title: "Ритмические комбинации",
        level: "Средний",
        duration: "20 мин",
        description: "Освойте сложные комбинации движений",
    },
    {
        id: "4",
        title: "Продвинутые техники",
        level: "Продвинутый",
        duration: "25 мин",
        description: "Техники для опытных танцоров",
    },
];

export default function LessonsScreen() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const router = useRouter();

    const filteredLessons = selectedLevel
        ? lessonsData.filter((lesson) => lesson.level === selectedLevel)
        : lessonsData;

    const levels = ["Начинающий", "Средний", "Продвинутый"];

    const tagColors: { [key: string]: string } = {
        all: "#6366F1",
        Начинающий: "#EC4899",
        Средний: "#F59E0B",
        Продвинутый: "#0a7ea4",
    };

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.headerTitle}>
                        Уроки тектоника
                    </ThemedText>
                </View>

                {/* Теги для выбора сложности */}
                <View style={styles.tagsContainer}>
                    <DifficultyTag
                        label="Все"
                        color={tagColors.all}
                        isActive={selectedLevel === null}
                        onPress={() => setSelectedLevel(null)}
                    />
                    {levels.map((level) => (
                        <DifficultyTag
                            key={level}
                            label={level}
                            color={tagColors[level]}
                            isActive={selectedLevel === level}
                            onPress={() => setSelectedLevel(level)}
                        />
                    ))}
                </View>

                {/* Список уроков */}
                <ScrollView
                    style={styles.lessonsList}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredLessons.map((lesson) => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            onPress={() => router.push(`/lesson/${lesson.id}`)}
                        />
                    ))}
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    );
}

function DifficultyTag({
    label,
    color,
    isActive,
    onPress,
}: {
    label: string;
    color: string;
    isActive: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    styles.tag,
                    {
                        backgroundColor: isActive ? color : "transparent",
                        borderColor: color,
                    },
                ]}
            >
                <ThemedText
                    style={[
                        styles.tagLabel,
                        {
                            color: isActive ? "#fff" : color,
                        },
                    ]}
                >
                    {label}
                </ThemedText>
            </View>
        </TouchableOpacity>
    );
}

function LevelButton({
    label,
    isActive,
    onPress,
}: {
    label: string;
    isActive: boolean;
    onPress: () => void;
}) {
    return (
        <ThemedView
            style={[
                styles.levelButton,
                {
                    backgroundColor: isActive ? "#0a7ea4" : "transparent",
                    borderColor: isActive ? "#0a7ea4" : "#ccc",
                },
            ]}
            lightColor={isActive ? "#0a7ea4" : "#fff"}
            darkColor={isActive ? "#0a7ea4" : "#151718"}
        >
            <ThemedText
                style={{
                    color: isActive ? "#fff" : "#0a7ea4",
                    fontWeight: "bold",
                }}
                onPress={onPress}
            >
                {label}
            </ThemedText>
        </ThemedView>
    );
}

function LessonCard({
    lesson,
    onPress,
}: {
    lesson: Lesson;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={styles.card}>
                <View style={styles.cardHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                        {lesson.title}
                    </ThemedText>
                    <ThemedText style={styles.duration}>
                        {lesson.duration}
                    </ThemedText>
                </View>
                <ThemedText style={styles.level}>{lesson.level}</ThemedText>
                <ThemedText style={styles.description}>
                    {lesson.description}
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
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
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 2,
    },
    tagLabel: {
        fontSize: 11,
        fontWeight: "600",
    },
    filterContainer: {
        marginBottom: 20,
    },
    filterContent: {
        gap: 8,
    },
    levelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
    },
    lessonsList: {
        flex: 1,
    },
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16,
        flex: 1,
    },
    duration: {
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
    },
    level: {
        fontSize: 12,
        color: "#0a7ea4",
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },
});
