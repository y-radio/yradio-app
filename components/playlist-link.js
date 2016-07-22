import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

/**
 * Try opening a universal playlist link and fallback to web link otherwise.
 */
const openPlaylist = (playlist) => {
  return Linking.openURL(playlist.universalLink)
    .catch(() => {
      return Linking.openURL(playlist.webLink);
    });
};

export const PlaylistLink = ({playlist}) => {
  return (
    <TouchableHighlight
      underlayColor="#ededed"
      style={styles.row}
      onPress={() => openPlaylist(playlist)}
    >
      <Text style={styles.rowText}>
        {playlist.name}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
});
