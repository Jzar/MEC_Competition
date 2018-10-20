import React from 'react';
import { Text, Button, StyleSheet, View, ScrollView } from 'react-native';
import { Constants, Speech } from 'expo';
import Touchable from 'react-native-platform-touchable'; // 1.1.1
import {AppRegistry, TextInput} from 'react-native';


class AmountControlButton extends React.Component {
  render() {
    return (
      <Touchable
        onPress={this.props.disabled ? null : this.props.onPress}
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}>
        <Text
          style={{
            color: this.props.disabled ? '#ccc' : 'blue',
            fontWeight: 'bold',
            paddingHorizontal: 5,
            fontSize: 18,
          }}>
          {this.props.title}
        </Text>
      </Touchable>
    );
  }
}

export default class SpeechScreen extends React.Component {
  static navigationOptions = {
    title: 'Speech',
    headerStyle: {marginTop: 24}
  };

  state = {
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
          <TextInput 
            style={{height: 80, borderColor: 'gray', borderWidth: 0,fontSize: 35, textAlign: 'center',}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
        </View>


        <View style={styles.separator} />

        <ScrollView>

        <View style={styles.controlRow}>
          <Button
            disabled={this.state.inProgress}
            onPress={this._speak}
            title="Speak"
          />

          <Button
            disabled={!this.state.inProgress}
            onPress={this._stop}
            title="Stop"
          />
        </View>

        <Text style={styles.controlText}>
          Pitch: {this.state.pitch.toFixed(2)}
        </Text>
        <View style={styles.controlRow}>
          <AmountControlButton
            onPress={this._increasePitch}
            title="Increase"
            disabled={this.state.inProgress}
          />

          <Text>/</Text>

          <AmountControlButton
            onPress={this._decreasePitch}
            title="Decrease"
            disabled={this.state.inProgress}
          />
        </View>

        <Text style={styles.controlText}>
          Rate: {this.state.rate.toFixed(2)}
        </Text>
        <View style={styles.controlRow}>
          <AmountControlButton
            onPress={this._increaseRate}
            title="Increase"
            disabled={this.state.inProgress}
          />

          <Text>/</Text>
          <AmountControlButton
            onPress={this._decreaseRate}
            title="Decrease"
            disabled={this.state.inProgress}
          />
        </View>
        </ScrollView>
      </View>
    );
  }

  _speak = () => {
    const start = () => {
      this.setState({ inProgress: true });
    };
    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    Speech.speak(this.state.text, {
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

  _increasePitch = () => {
    this.setState(state => ({
      ...state,
      pitch: state.pitch + 0.1,
    }));
  };

  _increaseRate = () => {
    this.setState(state => ({
      ...state,
      rate: state.rate + 0.1,
    }));
  };

  _decreasePitch = () => {
    this.setState(state => ({
      ...state,
      pitch: state.pitch - 0.1,
    }));
  };

  _decreaseRate = () => {
    this.setState(state => ({
      ...state,
      rate: state.rate - 0.1,
    }));
  };

  _renderExample = (example, i) => {
    let { selectedExample } = this.state;
    let isSelected = selectedExample === example;

    return (
      <Touchable
        key={i}
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        onPress={() => this._selectExample(example)}>
        <Text
          style={[
            styles.exampleText,
            isSelected && styles.selectedExampleText,
          ]}>
          {example.text} ({example.language})
        </Text>
      </Touchable>
    );
  };

  _selectExample = example => {
    this.setState({ selectedExample: example });
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
  exampleText: {
    fontSize: 15,
    color: '#ccc',
    marginVertical: 10,
  },
  examplesContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  selectedExampleText: {
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
    marginBottom: 20,
  },
});
