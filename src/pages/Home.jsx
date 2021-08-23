import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

import UserList from '../components/UserList';
import Error from '../components/Error';

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [nat, setNat] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [gender, setGender] = useState('');

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?page=${page}${nat}&results=50&seed=marvin`)
    .then(response => {
      let newUsers = users.concat(response.data.results);
      setUsersFiltered(newUsers);
      setUsers(newUsers);
      setLoading(false);
    })
    .catch(error => {
      setError(true);
      setLoading(false);
    })
  }, [page, nat]);

  const searchUser = () => {
    if (search === '') {
      setUsersFiltered(users);
    } else {
      let newUsers = [];
      users.forEach(user => {
        if (user.name.first.toLowerCase().includes(search.toLowerCase()) || user.name.first.toLowerCase().includes(search.toLowerCase())) {
          newUsers.push(user);
        }
      })

      setUsersFiltered(newUsers);
    }
  }

  const searchNat = () => {
    setPage(1);
    setLoading(true);
    setUsers([]);
    if (search === '') {
      setNat('');
    } else {
      setNat(`&nat=${search.toUpperCase()}`);
    }
  }

  const filter = () => {
    if (gender) {
      let newUsers = [];
      users.forEach(user => {
        if (user.gender === gender) {
          newUsers.push(user);
        }
      })

      setUsersFiltered(newUsers);
    } else {
      setUsersFiltered(users);
    }

    setFilterVisible(false);
  }

  return (
    <View style={styles.container}>
      {loading
        ?<ActivityIndicator size='large' color='#00AFAD' />
        :error
          ?<Error />
          :<React.Fragment>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={filterVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setFilterVisible(!filterVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.closeModalView}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setFilterVisible(false);
                          setGender('');
                        }}
                      >
                        <Text style={styles.closeModalText}>X</Text>
                      </TouchableWithoutFeedback>
                    </View>
                    <Picker
                      style={styles.picker}
                      selectedValue={gender}
                      onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                      }>
                      <Picker.Item label="Choose a gender" value={0} />
                      <Picker.Item label="Female" value={'female'} />
                      <Picker.Item label="Male" value={'male'} />
                    </Picker>
                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={() => filter()}
                    >
                      <Text style={styles.textStyle}>Filter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View> 

            <View style={styles.filterView} >
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Searching'
                  value={search}
                  onChangeText={setSearch}
                  onSubmitEditing={()=>searchNat()}
                />
                <TouchableOpacity
                  style={styles.searchTouchble}
                  //onPress={() => searchUser()}
                  onPress={() => searchNat()}
                >
                  <FontAwesome
                    style={styles.searchIcon}
                    name={'search'}
                    size={20}
                    color={'#00AFAD'}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.searchTouchble}
                onPress={() => setFilterVisible(true)}
              >
                <FontAwesome
                  style={styles.filterIcon}
                  name={'filter'}
                  size={30}
                  color={'#00AFAD'}
                />
              </TouchableOpacity>
            </View>
            <UserList users={usersFiltered} loadMoreItems={() => setPage(page + 1)} />
          </React.Fragment>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },

  filterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  textInputView: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#00AFAD'
  },

  textInput: {
    paddingLeft: 10,
    flexGrow: 1,
    height: 30,
  },

  searchTouchble: {
    alignSelf: 'center'
  },

  searchIcon: {
    paddingRight: 10,
  },

  filterIcon: {
    paddingLeft: 15
  },

  picker: {
    width: '100%',
    marginVertical: 20
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  closeModalView: {
    alignSelf: 'flex-end'
  },

  closeModalText: {
    fontSize: 16
  },

  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: '100%',
    marginTop: 15
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Home;