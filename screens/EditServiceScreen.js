import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { updateService } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const EditServiceScreen = ({ navigation, route }) => {
  const { service } = route.params;
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());

  const handleUpdate = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    try {
      await updateService(service._id, name, parseInt(price));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update service');
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
        <Button title="Update" onPress={handleUpdate} />
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

export default EditServiceScreen;
