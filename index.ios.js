import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {searchPlaylist} from './api/playlist';

const STICKY_HEADER_HEIGHT = 60;
const HEADER_HEIGHT = 500;

const ListHeader = ({text, error, searching}) => {
  var errorSection;
  if (error) {
    errorSection = (
      <Text>
        {`Error while searching matching playlist: ${error}`}
      </Text>
    )
  }

  var searchingSection;
  if (searching) {
    searchingSection = (
      <Text>
        Loading...
      </Text>
    );
  }

  return (
    <View>
      <Text style={styles.title}>
        {`y/${text || 'Radio'}`}
      </Text>
      {errorSection}
      {searchingSection}
    </View>
  );
}

class yradio extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };

    this.scrollView = ScrollView;
    this.lastRequest = Promise.resolve();

    this.scrollRef = this.scrollRef.bind(this);
    this.scrollToSearch = this.scrollToSearch.bind(this);
    this.search = this.search.bind(this);
    this.searchInputRef = this.searchInputRef.bind(this);
  }

  scrollRef(ref) {
    if (ref) {
      this.scrollView = ref;
    }
  }

  searchInputRef(ref) {
    if (ref) {
      this.searchInput = ref;
    }
  }

  scrollToSearch() {
    this.scrollView.scrollTo({y: HEADER_HEIGHT - STICKY_HEADER_HEIGHT});
    this.searchInput.focus();
  }

  search(searchTerm) {
    this.setState({
      text: searchTerm,
      searching: true,
      error: null,
    });

    var request = searchPlaylist(searchTerm).then((results) => {
      // Prevent race conditions
      if (request !== this.lastRequest) {
        return;
      }

      this.setState({
        searching: false,
        dataSource: this.state.dataSource.cloneWithRows(results),
      });
    }, (error) => {
      // Prevent race conditions
      if (request !== this.lastRequest) {
        return;
      }

      this.setState({
        error,
        searching: false,
        dataSource: this.state.dataSource.cloneWithRows([]),
      });
    });

    this.lastRequest = request;
  }

  render() {
    return (
      <ListView
        ref={this.scrollRef}
        style={styles.container}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <View key={rowData.id} style={styles.row}>
            <Text style={styles.rowText}>
              {rowData.name}
            </Text>
          </View>
        )}
        renderHeader={() => (
          <ListHeader
            text={this.state.text}
            error={this.state.error}
            searching={this.state.searching}
          />
        )}
        renderScrollComponent={(props) => (
          <ParallaxScrollView
            backgroundColor="white"
            contentBackgroundColor="white"
            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
            parallaxHeaderHeight={HEADER_HEIGHT}
            backgroundSpeed={10}
            renderBackground={() => (
              <View key="background">
                <Image
                  source={require('./assets/img/hut.jpg')}
                  style={{height: HEADER_HEIGHT}}
                />
              </View>
            )}
            renderForeground={() => (
              <View key="parallax-header" style={{height: HEADER_HEIGHT}}>
                <TouchableHighlight
                  style={styles.roundButton}
                  underlayColor="#FFAA44"
                  onPress={this.scrollToSearch}
                >
                  <Icon name="search" size={30} color="white" style={styles.icon}/>
                </TouchableHighlight>
              </View>
            )}
            renderStickyHeader={() => (
              <View key="sticky-header" style={styles.stickySection}>
                <Icon name="search" size={15} color="#444" style={styles.icon}/>
                <TextInput
                  ref={this.searchInputRef}
                  style={styles.stickySectionText}
                  selectTextOnFocus={true}
                  placeholder="Search"
                  onChangeText={this.search}
                />
              </View>
            )}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
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
