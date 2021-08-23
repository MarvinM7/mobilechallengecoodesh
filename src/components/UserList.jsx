import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from 'react-native';

import UserListItem from './UserListItem';

const UserList = ({ users, loadMoreItems }) => {
  return (
    <FlatList
      style={styles.container}
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
      keyExtractor={item => item.login.uuid}
      onEndReached={loadMoreItems}
      ListEmptyComponent={
        <View style={styles.centeredView}>
          <Text>
            Empty list
          </Text>
        </View>
      }
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        users.length === 0
          ?null
          :<View style={styles.centeredView}>
            <ActivityIndicator size='large' color='#00AFAD' />
            <Text>Loading more...</Text>
          </View>
        
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 10
  },

  centeredView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyView: {
    
  }
});

export default UserList;