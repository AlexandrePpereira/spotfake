import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppHeader from '../../components/Header';
import PlaylistList from '../../components/PlaylistSection';
import AudioControls from '../../components/MusicControls';

const MainScreen = () => {
  const userPlaylists = [
    { id: '1', name: 'Top Hits' },
    { id: '2', name: 'Relax & Chill' },
    { id: '3', name: 'Favoritos' },
  ];

  return (
    <View style={styles.screenWrapper}>
      <AppHeader />
      <PlaylistList playlists={userPlaylists} />
      <AudioControls />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#101820',
    padding: 10,
  },
});

export default MainScreen;