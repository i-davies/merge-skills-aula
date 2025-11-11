import Button from '@/components/Button';
import React from 'react';
import { Modal, StatusBar, StyleSheet, Text, View } from "react-native";

interface FeedbackDrawerProps {
  visible: boolean;
  isCorrect: boolean;
  onContinue: () => void;
}

export default function FeedbackDrawer({
  visible,
  isCorrect,
  onContinue,
}: FeedbackDrawerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.drawer,
            isCorrect ? styles.drawerCorrect : styles.drawerIncorrect,
          ]}
        >
          <Text style={styles.emoji}>{isCorrect ? "🎉" : "😕"}</Text>
          <Text style={styles.title}>
            {isCorrect ? "Resposta Correta!" : "Resposta Incorreta"}
          </Text>
          <Text style={styles.message}>
            {isCorrect
              ? "Parabéns! Continue assim!"
              : "Não desista! Tente novamente na próxima."}
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Continuar" onPress={onContinue} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    paddingTop: StatusBar.currentHeight || 0,
  },
  drawer: {
    padding: 24,
    paddingBottom: 40,
    minHeight: 280,
    alignItems: "center",
  },
  drawerCorrect: {
    backgroundColor: "#f1f8f4",
  },
  drawerIncorrect: {
    backgroundColor: "#fffbf0",
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
  },
});