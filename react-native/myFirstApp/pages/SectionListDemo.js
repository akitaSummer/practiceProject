/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import {
  SectionList,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

const CITY_NAMES = [{
  data: ['杭'],
  title: '二线'
},{
  data: ['北', '上', '广', '深'],
  title: '一线'
}]

const SectionListDemo = (): React$Node => {

  const [isLoading, setIsLoading] = useState(false)
  const [dataArray, setDataArray] = useState(CITY_NAMES)

  const _renderItem = (data) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{data.item}</Text>
      </View>
    )
  }

  const _renderSectionHeader = (section) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.text}>
          {section.section.title}
        </Text>
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
      <SectionList
        sections={dataArray}
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
        renderSectionHeader={(data) => _renderSectionHeader(data)}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  item: {
    height: 200,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
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
  },
  sectionHeader: {
    height: 50,
    backgroundColor: "#93ebbe",
    alignItems: 'center',
    justifyContent: "center"
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    flex: 1
  }
})

export default SectionListDemo
