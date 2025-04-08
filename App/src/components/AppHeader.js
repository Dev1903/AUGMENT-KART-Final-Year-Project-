import React from 'react';
import { Appbar } from 'react-native-paper';

const AppHeader = ({title}) => (
  <Appbar.Header style={{backgroundColor: "white"}}>
    <Appbar.Content title={title} titleStyle={{fontWeight: "600", fontSize: 24}} />
  </Appbar.Header>
);

export default AppHeader;
