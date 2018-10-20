import React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import { Constants, Speech } from 'expo';
import Touchable from 'react-native-platform-touchable'; // 1.1.1
import {AppRegistry, TextInput} from 'react-native';

const PRESETS = [
  {text: 'Yes' },
  {text: 'No' },
  {text: 'Hello' },
  {text: 'How are you today?' },
  {text: 'Oh yea' },
];

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Preset',
  };

  state = {
    selectedPreset: PRESETS[0],
    text: "Please Enter Your Text",
    inProgress: false,
    pitch: 1,
    rate: 0.75,
    language: 'en'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Select a phrase</Text>
        </View>

        <View style={styles.examplesContainer}>
          {PRESETS.map(this._renderPreset)}
        </View>
      </View>
    );
  }

  _speak = (preset) => {
    const start = () => {
      this.setState({ inProgress: true });
    };
    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    Speech.speak(preset.text, {
      language: this.state.language,
      pitch: this.state.pitch,
      rate: this.state.rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
    });
  };

  _stop = () => {
    Speech.stop();
  };


  _renderPreset= (preset, i) => {
    let { selectedPreset} = this.state;
    let isSelected = selectedPreset === preset;

    return (
      <Touchable
        key={i}
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        onPress={() => this._selectPreset(preset)}>
        <Text
          style={[
            styles.presetText,
            isSelected && styles.selectedPresetText,
          ]}>
          {preset.text}
        </Text>
      </Touchable>
    );
  };

  _selectPreset = preset => {
    this.setState({ selectedPreset: preset });
    this._speak(preset);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 0,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 20,
  },
  presetText: {
    fontSize: 15,
    color: '#ccc',
    marginVertical: 10,
  },
  presetContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  selectedPresetText: {
    color: 'black',
  },
  controlText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});