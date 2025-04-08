import React from 'react';
import { Appbar } from 'react-native-paper';

const AppHeader = ({title}) => (
  <Appbar.Header>
    <Appbar.Content title={title} />
  </Appbar.Header>
);

export default AppHeader;
