/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import {
  FlatList,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

const CITY_NAMES = ['北', '上', '广', '深', '杭']

const FlatListDemo = (): React$Node => {

  const [isLoading, setIsLoading] = useState(false)
  const [dataArray, setDataArray] = useState(CITY_NAMES)

  const _renderItem = (data) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    )
  }

  const loadData = (refreshing) => {
    if (refreshing) setIsLoading(true)

    setTimeout(() => {
      let newArray = []
      if (refreshing) {
        for (let i = dataArray.length - 1; i >= 0; i--) {
          newArray.push(dataArray[i])
        }
      } else {
        newArray = dataArray.concat(CITY_NAMES)
      }
      setDataArray(newArray)
      setIsLoading(false)
    }, 2000)
  }

  const getIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={'large'}
          animating={true}
          color={'red'}
        />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataArray}
        renderItem={(data) => _renderItem(data)}
        // refreshing={isLoading}
        // onRefresh={() => {loadData()}}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            colors={['red']}
            tintColor={'orange'}
            titleColor={'blue'}
            refreshing={isLoading}
            onRefresh={() => loadData(true)}
          />
        }
        ListFooterComponent={() => getIndicator()}
        onEndReached={() => loadData(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#169',
    height: 200,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})


export default FlatListDemo;
