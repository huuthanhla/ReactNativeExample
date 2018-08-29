/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {name} from './app.json'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated
} from 'react-native';

export default class DemoPanResponder extends Component {
  constructor(props) {
    super(props)

    _panResponder = {}

    this.state = {
      pan: new Animated.ValueXY(),
      scale : new Animated.Value(1)
    } 
  }

  componentWillMount() {
    _panResponder = PanResponder.create({
      onStartShouldSetPanResponder:()=> true,
      onMoveShouldSetPanResponder:()=> true,
      onPanResponderGrant:this._onPanResponderGrant.bind(this),
      onPanResponderMove: Animated.event([null,{dx:this.state.pan.x , dy: this.state.pan.y}]),
      onPanResponderRelease:this._onPanResponderRelease.bind(this),
    });
  } 

  _addAnimatedSpring(value){
      Animated.spring(
        this.state.scale,
        {
          toValue:value,
          friction:3
        } 
      ).start();
  }

  _onPanResponderGrant(event,gestureState){
    this.state.pan.setOffset({x:this.state.pan.x._value, y:this.state.pan.y._value});
    this.state.pan.setValue({x:0,y:0});
    this._addAnimatedSpring(1.1);
  }


  _onPanResponderRelease(event,gestureState){
      this.state.pan.flattenOffset();
      this._addAnimatedSpring(1)
  }


  render(){

      let {pan,scale} = this.state;
      let [translateX,translateY] = [pan.x,pan.y];
      let myTransForm = {transform:[{translateX},{translateY},{scale}]}

      return(
          <View style={styles.container} >
            <Animated.View 
              style={[styles.circle, myTransForm]}
              {..._panResponder.panHandlers}>
                
            </Animated.View>
          </View>
      )
  }

  componentDidMount(){
      
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "violet",
  }

});

AppRegistry.registerComponent(name, () => DemoPanResponder);