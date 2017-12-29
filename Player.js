import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import Sound from 'react-native-sound';
import ReactTimeout from 'react-timeout';

class Player extends Component<{}> {
  constructor (props) {
    super(props);

    const sound = new Sound(props.book.filename, Sound.MAIN_BUNDLE);
    Sound.setCategory('Playback');

    this.state = {
      sound,
      isPlaying: false,
      progress: 0,
      duration: 0
    }
  }

  playSound (sound) {
    sound.play();
    this.setState({isPlaying: true})
  }

  pauseSound (sound) {
    sound.pause();
    this.setState({isPlaying: false})
  }

  componentDidMount () {
    this.progress();
  }

  progress () {
    this.props.setInterval(() => {
      const duration = this.state.sound.getDuration();

      this.state.sound.getCurrentTime(
        (seconds, isPlaying) => {
          if (!isPlaying) { return; }

          this.setState({
            progress: seconds / duration,
            duration
          });
        }
      );
    }, 500);
  }

  playButton () {
    return (
      <TouchableHighlight
        onPress={() => this.playSound(this.state.sound)}
        underlayColor='transparent'>
        <Image source={require('./play.png')} style={{
          width: 50,
          height: 50
        }} />
      </TouchableHighlight>);
  }

  pauseButton () {
    return (
      <TouchableHighlight
        onPress={() => this.pauseSound(this.state.sound)}
        underlayColor='transparent'>
        <Image source={require('./pause.png')} style={{
          width: 50,
          height: 50
        }} />
      </TouchableHighlight>);
  }

  progressBar () {
    const duration = this.state.sound.getDuration();
    const width = 300;

    return (
      <View style={{
        backgroundColor: '#EEE',
        height: 20,
        width
      }}>
      <View style={{
        height: 20,
        backgroundColor: 'rebeccapurple',
        width: this.state.progress * width
      }}></View>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <View style = {{flex: 1, flexBasis: '70%', backgroundColor: 'transparent'}}>
          <Image
            source={{ uri: 'crazy-rich-asians' }}
            style={{flex: 1}}
            resizeMode='cover'
          />
        </View>
        <View style={styles.controlsContainer}>
          <Text style={styles.title}>
            {this.props.book.title}
          </Text>
          <Text style={styles.author}>
            {this.props.book.author}
          </Text>
          {
            this.state.isPlaying ?
            this.pauseButton()   :
            this.playButton()
          }
          {this.progressBar()}
        </View>
      </View>
    );
  }
}
export default ReactTimeout(Player);

const styles = StyleSheet.create({
  controlsContainer: {
    flexBasis: '30%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 7,
    fontSize: 20,
  },
  author: {
    margin: 7,
    fontSize: 15,
  }
});
