import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { getService, deleteService } from '../services/api';

const ServiceDetailScreen = ({ navigation, route }) => {
  const { service } = route.params;
  const [serviceDetail, setServiceDetail] = useState(service);

  useEffect(() => {
    fetchServiceDetail();
  }, []);

  const fetchServiceDetail = async () => {
    try {
      const data = await getService(service._id);
      setServiceDetail(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch service details');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned.',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteService(service._id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete service');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service detail</Text>
        <Menu>
          <MenuTrigger>
            <Text style={styles.menuTrigger}>⋮</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => navigation.navigate('EditService', { service: serviceDetail })}>
              <Text>Update</Text>
            </MenuOption>
            <MenuOption onSelect={handleDelete}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Service name</Text>
        <Text style={styles.value}>{serviceDetail.name}</Text>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>{serviceDetail.price} đ</Text>
        <Text style={styles.label}>Creator</Text>
        <Text style={styles.value}>{serviceDetail.createdBy}</Text>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{new Date(serviceDetail.createdAt).toLocaleString()}</Text>
        <Text style={styles.label}>Final update</Text>
        <Text style={styles.value}>{new Date(serviceDetail.updatedAt).toLocaleString()}</Text>
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
    justifyContent: 'space-between',
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
  },
  menuTrigger: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});

export default ServiceDetailScreen;
