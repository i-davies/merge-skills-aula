import Button from '@/components/Button';
import FeedbackDrawer from '@/components/FeedbackDrawer';
import { LESSONS } from "@/data/coursesData";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Encontra a lição
  const lesson = LESSONS.find((l) => l.id === id);

  // Estado da questão atual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lição não encontrada</Text>
      </View>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.questions.length - 1;

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedOption(null);

    if (isLastQuestion) {
      // Volta para a lista de lições
      router.back();
    } else {
      // Vai para próxima questão
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const renderOption = (option: string, index: number) => {
    const isSelected = selectedOption === index;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.option, isSelected && styles.optionSelected]}
        onPress={() => handleOptionPress(index)}
      >
        <View
          style={[
            styles.optionBullet,
            isSelected && styles.optionBulletSelected,
          ]}
        >
          <Text
            style={[
              styles.optionBulletText,
              isSelected && styles.optionBulletTextSelected,
            ]}
          >
            {String.fromCharCode(65 + index)}
          </Text>
        </View>
        <Text
          style={[styles.optionText, isSelected && styles.optionTextSelected]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "Lições",
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerLessonTitle}>{lesson.title}</Text>
              <Text style={styles.headerProgress}>
                Questão {currentQuestionIndex + 1} de {lesson.questions.length}
              </Text>
            </View>
          ),
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Questão */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        {/* Código com lacuna */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Complete o código:</Text>
          <View style={styles.codeBox}>
            {currentQuestion.code
              .split("[BLANK]")
              .map((part: string, index: number, array: string[]) => (
                <Text key={index} style={styles.code}>
                  {part}
                  {index < array.length - 1 && (
                    <Text style={styles.blank}>______</Text>
                  )}
                </Text>
              ))}
          </View>
        </View>

        {/* Opções */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsLabel}>Escolha a resposta correta:</Text>
          {currentQuestion.options.map((option: string, index: number) =>
            renderOption(option, index)
          )}
        </View>
      </ScrollView>

      {/* Botão de verificar */}
      <View style={styles.footer}>
        <Button
          title="Verificar Resposta"
          onPress={handleCheckAnswer}
          disabled={selectedOption === null}
        />
      </View>

      {/* Feedback Drawer */}
      <FeedbackDrawer
        visible={showFeedback}
        isCorrect={isCorrect}
        onContinue={handleContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerTitleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  headerLessonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  headerProgress: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  header: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  progress: {
    fontSize: 14,
    color: "#666666",
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    lineHeight: 24,
  },
  codeContainer: {
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginBottom: 8,
  },
  codeBox: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#d4d4d4",
    lineHeight: 20,
  },
  blank: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 4,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  optionSelected: {
    borderColor: "#1e1e1e",
    backgroundColor: "#f0f4f8",
  },
  optionBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionBulletSelected: {
    backgroundColor: "#1e1e1e",
  },
  optionBulletText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
  },
  optionBulletTextSelected: {
    color: "#ffffff",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  optionTextSelected: {
    fontWeight: "600",
    color: "#1e1e1e",
  },
  footer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});