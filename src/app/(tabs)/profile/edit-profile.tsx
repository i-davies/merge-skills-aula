import Button from "@/components/Button";
import { ProfileStorage } from "@/services/profileStorage";
import { UserProfile } from "@/types/profile";
import * as DocumentPicker from "expo-document-picker";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditProfileModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fileUri, setFileUri] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadProfile() {
        const savedProfile = await ProfileStorage.load();

        if (savedProfile) {
          setName(savedProfile.name);
          setEmail(savedProfile.email);
          setFileUri(savedProfile.fileUri || null);
        }
      }

      loadProfile();
    }, [])
  );

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setFileUri(uri);
    } else {
      console.warn("Nenhuma imagem selecionada");
    }
  };

  const handleSave = async () => {
    const updatedProfile: UserProfile = {
      name: name.trim(),
      email: email.trim(),
      fileUri: fileUri || undefined,
    };

    await ProfileStorage.save(updatedProfile);
    handleCancel();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Informações do Perfil */}
      <View style={styles.profileInfo}>
        {fileUri && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: fileUri }} style={styles.preview} />
          </View>
        )}

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email:</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.footer}>
        <Button
          title="Selecionar imagem"
          variant="info"
          onPress={handlePickDocument}
        />
        <Button title="SALVAR" onPress={handleSave} />
        <Button title="Cancelar" variant="secondary" onPress={handleCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  footer: {
    width: "100%",
    gap: 12,
    paddingBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInfo: {
    width: "100%",
    marginBottom: 40,
  },
  infoItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    color: "#333333",
  },
  previewContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  preview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
