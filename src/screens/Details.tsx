import React from 'react';
import { Text, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Article } from '../types/news';
import tw from 'twrnc';

type RootStackParamList = {
  Details: { article: Article };
};

const Details = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { article } = route.params;

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>{article.title}</Text>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={tw`w-full h-64 rounded mb-4`} />
      )}
      <Text style={tw`text-base text-gray-800`}>{article.content || 'No content available.'}</Text>
    </ScrollView>
  );
};

export default Details;
