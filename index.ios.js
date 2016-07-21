import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const STICKY_HEADER_HEIGHT = 60;

class yradio extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <ParallaxScrollView
        backgroundColor="white"
        contentBackgroundColor="white"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={500}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image
              source={require('./assets/img/hut.jpg')}
              style={{height: 500}}
            />
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={{height: 500}}>
            <TouchableHighlight
              style={styles.roundButton}
              underlayColor="#FFAA44"
              onPress={() => {}}
            >
              <Icon name="search" size={30} color="white" style={styles.icon}/>
            </TouchableHighlight>
          </View>
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Icon name="search" size={15} color="#444" style={styles.icon}/>
            <TextInput
              style={styles.stickySectionText}
              selectTextOnFocus={true}
              placeholder="Search"
              onChangeText={(text) => this.setState({text})}
            />
          </View>
        )}
      >
        <View style={{ height: 500 }}>
          <Text style={styles.title}>
            y/Radio
          </Text>
          <Text>
            Searching for: {this.state.text}
          </Text>
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFAA00',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 24,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  stickySectionText: {
    color: '#444',
    fontSize: 20,
    margin: 10,
    flex: 1,
  },
  title: {
    padding: 8,
    marginTop: 16,
    fontSize: 50,
    color: '#444',
    backgroundColor: 'transparent',
  }
});

AppRegistry.registerComponent('yradio', () => yradio);
