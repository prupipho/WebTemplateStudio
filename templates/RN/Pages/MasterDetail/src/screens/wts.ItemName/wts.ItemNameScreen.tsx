﻿import React, {useState} from 'react';
import {View, FlatList, useWindowDimensions} from 'react-native';

import sampleData from '../../data/sampleData';
import ItemDetailScreen from './ItemDetail/ItemDetailScreen';
import ListItemScreen from './ListItem/ListItemScreen';
import {getStyles} from './wts.ItemNameScreen.style';

export interface IProps {
  navigation: any;
}

const wts.ItemNameScreen = ({navigation}: IProps): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState({id: null});
  const {width} = useWindowDimensions();
  const COMPACT_MODE_WIDTH = 700;
  const isCompactMode = width < COMPACT_MODE_WIDTH;

  const styles = React.useMemo(() => getStyles(), []);

  const handleOnPress = (item: any) => {
    setSelectedItem(item);
    if (isCompactMode) {
      navigation.navigate('wts.ItemNameDetail', {item});
    }
  };

  const isSelected = (item: any): boolean => {
    return selectedItem.id === item.id;
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={sampleData.companies}
          renderItem={({item}) => (
            <ListItemScreen
              item={item}
              onPress={() => handleOnPress(item)}
              isSelected={isSelected(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {!isCompactMode && (
        <View style={styles.itemDetailContainer}>
          <ItemDetailScreen item={selectedItem} />
        </View>
      )}
    </View>
  );
};

export default wts.ItemNameScreen;
