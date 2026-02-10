import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createService } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const AddServiceScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    try {
      await createService(name, parseInt(price));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add service');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service</Text>
      </View>
      <View style={styles.content}>
        <Input
          label="Service Name *"
          value={name}
          onChangeText={setName}
          placeholder="Enter service name"
        />
        <Input
          label="Price *"
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="numeric"
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EF506B',
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
  content: {
    padding: 20,
  },
});

export default AddServiceScreen;
