import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../api/news';
import { Article } from '../types/news';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';

type RootStackParamList = {
  Home: undefined;
  Details: { article: Article };
};

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data, isLoading } = useQuery({queryKey:['news'],queryFn:fetchNews});

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Top News</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`mb-4 border border-gray-300 rounded-lg p-2`}
            onPress={() => navigation.navigate('Details', { article: item })}
          >
            <Text style={tw`text-lg font-semibold mb-2`}>{item.title}</Text>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={tw`w-full h-48 rounded mb-2`} />
            )}
            <Text style={tw`text-sm text-gray-700`}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
