import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <ThemedText type="title" style={styles.title}>
                            Тектоник
                        </ThemedText>
                        <ThemedText style={styles.subtitle}>
                            Учись танцевать с лучшими уроками
                        </ThemedText>
                    </View>

                    <View style={styles.cardsContainer}>
                        <HomeCard
                            title="🎓 Уроки"
                            description="Полный курс от новичка до профессионала"
                            color="#FF6B6B"
                        />
                        <HomeCard
                            title="🎵 Музыка"
                            description="Треки для тренировок и баттлов"
                            color="#4ECDC4"
                        />
                    </View>

                    <View style={styles.infoSection}>
                        <ThemedText type="subtitle" style={styles.infoTitle}>
                            О приложении
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            Тектоник — это энергичный стиль танца, зародившийся
                            в Польше. Используйте наше приложение, чтобы выучить
                            основные движения и совершенствовать свои навыки.
                        </ThemedText>
                    </View>
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    );
}

function HomeCard({
    title,
    description,
    color,
}: {
    title: string;
    description: string;
    color: string;
}) {
    return (
        <ThemedView
            style={[
                styles.card,
                { borderLeftColor: color, borderLeftWidth: 4 },
            ]}
            lightColor="#fff"
            darkColor="#151718"
        >
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                {title}
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
                {description}
            </ThemedText>
        </ThemedView>
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
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#999",
    },
    cardsContainer: {
        marginBottom: 24,
        gap: 12,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: "#999",
        lineHeight: 20,
    },
    infoSection: {
        marginBottom: 24,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    infoTitle: {
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#666",
    },
});
