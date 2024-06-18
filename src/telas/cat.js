import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const CatGalleryScreen = () => {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatImages();
  }, []);

  const fetchCatImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
      setCatImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cat images:', error);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchCatImages();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ff69b4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria de Gatos</Text>
      <FlatList
        data={catImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Icon name="refresh" size={20} color="#fff" />
        <Text style={styles.buttonText}>Recarregar Imagens</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff69b4',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff69b4',
  },
  image: {
    width: 300,
    height: 200,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff69b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CatGalleryScreen;
