import Card from "@/components/Card";
import { COURSES, LESSONS } from "@/data/coursesData";
import { Lesson } from "@/types/course";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CourseLessonsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Encontra o curso atual
  const course = COURSES.find((c) => c.id === id);

  // Filtra lições do curso específico
  const courseLessons = LESSONS.filter((lesson) => lesson.courseId === id).sort(
    (a, b) => a.order - b.order
  );

  const handleLessonPress = (lesson: Lesson) => {
    router.push(`/lesson/${lesson.id}` as any);
  };

  const renderLesson = ({ item, index }: { item: Lesson; index: number }) => (
    <TouchableOpacity onPress={() => handleLessonPress(item)}>
      <Card
        leftComponent={
          <View style={styles.lessonNumber}>
            <Text style={styles.lessonNumberText}>{index + 1}</Text>
          </View>
        }
        rightComponent={<Text style={styles.arrow}>→</Text>}
      >
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription}>{item.description}</Text>
        <Text style={styles.questionCount}>
          {item.questions.length}{" "}
          {item.questions.length === 1 ? "questão" : "questões"}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: course?.title || "Lições do Curso",
          headerBackTitle: "Cursos",
        }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Lições</Text>
        <Text style={styles.subtitle}>
          {courseLessons.length}{" "}
          {courseLessons.length === 1
            ? "lição disponível"
            : "lições disponíveis"}
        </Text>
      </View>

      <FlatList
        data={courseLessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  lessonNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
  },
  lessonNumberText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "600",
  },
  arrow: {
    fontSize: 24,
    color: "#112437",
  },
});