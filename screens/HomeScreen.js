import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Menu, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { getServices, deleteService } from '../services/api';
import { removeToken } from '../utils/storage';

const HomeScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch services');
    }
  };

  const handleDelete = (id) => {
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
              await deleteService(id);
              fetchServices();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete service');
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'LOGOUT',
          style: 'destructive',
          onPress: async () => {
            await removeToken();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const renderService = ({ item }) => (
    <View style={styles.serviceItem}>
      <TouchableOpacity
        style={styles.serviceContent}
        onPress={() => navigation.navigate('ServiceDetail', { service: item })}
      >
        <Text style={styles.serviceName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
        <Text style={styles.servicePrice}>{item.price} ₫</Text>
      </TouchableOpacity>
      <Menu>
        <MenuOptions>
          <MenuOption onSelect={() => navigation.navigate('EditService', { service: item })}>
            <Text>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => handleDelete(item._id)}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HUYỄN TRINH</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={handleLogout}>
          <Icon name="person-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.logoContainer}>
              <Image source={require('../logo.png')} style={styles.logoImage} />
            </View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Danh sách dịch vụ</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddService')}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EF506B',
    color: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoImage: {
    width: 250,
    height: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF506B',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#EF506B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  list: {
    paddingHorizontal: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 16,
    color: '#6A6A6A',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
