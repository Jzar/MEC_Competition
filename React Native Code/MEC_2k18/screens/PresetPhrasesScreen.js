import React from 'react';
import { Text, Button, StyleSheet, View , ScrollView, AsyncStorage} from 'react-native';
import { Constants, Speech } from 'expo';
import Touchable from 'react-native-platform-touchable'; // 1.1.1
import {AppRegistry, TextInput} from 'react-native';



//Hard-Coded Presets
/*
const this.state.presets = [
  {text: 'Yes' },
  {text: 'No' },
  {text: 'Hello' },
  {text: 'How are you today?' },
  {text: 'Oh yea' },
];*/


export default class PresetPhrasesScreen extends React.Component {
  //Titles the section of the app
  static navigationOptions = {
    title: 'Preset',
    headerStyle: {marginTop: 24}
  };

  //sets up the state of the class to include all useful items needed for TTS
  state = {
    selectedPreset: 'hello',
    text: "Please Enter Your Text",
    inProgress: false,
    pitch: 1,
    rate: 0.75,
    language: 'en',
    presets: ['hello'],
    temp: 'Sample'
  };
  //Render function, displays the presets

  async componentDidMount(){
    this.preload_presets();
    }
  async preload_presets(){
    if (AsyncStorage.getItem('presets') != null){
      this.setState({presets: JSON.parse(AsyncStorage.getItem('presets'))});
    }
    
  }  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Select/Add a phrase</Text>
        </View>

        <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 30, textAlign: 'center'}}
            onChangeText={(temp) => this.setState({temp})}
            value={this.state.text}
         />
         <Button
         onPress={async () => {
           var presets1 = this.state.presets;
           presets1.push(this.state.temp);
           this.setState({presets: presets1})
           AsyncStorage.setItem('presets', JSON.stringify(presets1));
        }} 
        title = "Add Phrase"
        />

        <ScrollView style={styles.examplesContainer}>
          {this.state.presets.map(this._renderPreset)}
        </ScrollView>
      </View>
    );
  }
  //Function for speaking, takes a preset, checks if the app is currently speaking, then speaks with the defined settings
  _speak = (preset) => {
    const start = () => {
      this.setState({ inProgress: true });
    };
    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    Speech.speak(preset, {
      language: this.state.language,
      pitch: this.state.pitch,
      rate: this.state.rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
    });
  };
  //unused stop function
  _stop = () => {
    Speech.stop();
  };

  //Function for rendering presets. Creates a touchable object that calls selectPreset when pressed
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
          {preset}
        </Text>
      </Touchable>
    );
  };
  //What happ
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
    fontSize: 25,
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
  presetContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  selectedPresetText: {
    fontSize: 30,
    color: 'blue',
    textAlign: 'center',
  },
  controlText: {
    fontSize: 25,
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
