import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Moment from 'moment';

import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';

const LineInfo = ({ text }) => {
  return (
    <View style={[styles.infoLine, styles.infoLineModal]}>
      <Text style={styles.textItemModal}>
        {text}
      </Text>
    </View>
  )
}

const UserListItem = ({ user }) => {
  const { dob, email, gender, location, login, name, nat, phone, picture } = user;
  const fullName = `${name.first} ${name.last}`;
  const { date, age } = dob;
  const { city, postcode, state, street } = location;
  Moment.locale('pt-br');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.headerModal}>
              <Image style={styles.avatarModal} source={{uri: picture.large}} />
              <View style={styles.subHeader}>
                <View style={styles.viewNameModal}>
                  <Text style={styles.nameModal}>{`${fullName}`}</Text>
                </View>
                
                <View style={styles.closeModalView}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.closeModalText}>
                      X
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            
            <LineInfo text={`Email: ${email}`} />
            <LineInfo text={`Gênero: ${capitalizeFirstLetter(gender)}`} />
            <LineInfo text={`Data de nascimento: ${Moment(date).format('DD/MM/YYYY')}`} />
            <LineInfo text={`Telefone: ${phone}`} />
            <LineInfo text={`Endereço: ${street.name}, ${street.number}`} />
            <LineInfo text={`CEP: ${postcode}`} />
            <LineInfo text={`Cidade: ${city}`} />
            <LineInfo text={`Estado: ${state}`} />
            <LineInfo text={`Nacionalidade: ${nat}`} />
            <LineInfo text={`ID: ${login.uuid}`} />
          </View>
        </View>
      </Modal>


      <View style={styles.container}>
        <Image style={styles.avatarItem} source={{uri: picture.thumbnail}} />
        <View style={styles.info}>
          <View style={styles.infoLine}>
            <Text style={styles.textItem}>
              {fullName}
            </Text>
          </View>
          <View style={styles.infoLine}>
            <Text style={styles.textItem}>
              {`ID: ${login.uuid}`}
            </Text>
          </View>
          <View style={styles.infoLine}>
            <Text style={styles.textItem}>
              {`${capitalizeFirstLetter(gender)}`}
            </Text>
            <Text style={styles.textItem}>
              {`${Moment(date).format('DD/MM/YYYY')}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderWidth: 1,
    borderColor: '#00AFAD',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 3
  },

  textItem: {
    paddingLeft: 15,
    flex: 4
  },

  avatarItem: {
    aspectRatio: 1,
    flex: 1,
    maxWidth: 70,
    marginLeft: 15,
    borderRadius: 50
  },

  info: {
    flexGrow: 1,
  },

  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },

  infoLineModal: {
    marginVertical: 4,
  },

  textItemModal: {
    fontSize: 15
  },

  modalContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },

  headerModal: {
    flexDirection: 'row',
    flexGrow: 1,
    marginBottom: 15
  },

  avatarModal: {
    aspectRatio: 1,
    maxWidth: 100,
    maxHeight: 100,
    flex: 1,
    borderRadius: 100
  },

  subHeader: {
    flexDirection: 'row',
    flexGrow: 1,
    flex: 5,
    justifyContent: 'space-between',
  },

  viewNameModal: {
    paddingLeft: 10,
    flex: 16,
    alignContent: 'center',
    flexDirection: 'row',
  },

  nameModal: {
    fontSize: 20,
    alignSelf: 'center'
  },

  closeModalView: {
    flex: 1,
  },

  closeModalText: {
    fontSize: 16
  },

  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserListItem;