import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Text,
  Heading,
  Card,
  Button,
  Box,
} from 'native-base';
import Icons from './src/Components/Icons';
import Snackbar from 'react-native-snackbar';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const changeItem = itemNumber => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: '#FFF',
      });
    } else if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "Cross" : "Circle"
      setIsCross(!isCross);
      checkIsWinner();
    } else {
      return Snackbar.show({
        text: "This slot is already filled",
        backgroundColor: '#F00',
        textColor: '#FFF',
      });
    }
  };

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    itemArray.fill('empty', 0, 9);
  };

  const checkIsWinner = () => {
    if (itemArray[0] != "empty" && itemArray[0] === itemArray[1] && itemArray[1] === itemArray[2]) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (itemArray[3] != "empty" && itemArray[3] === itemArray[4] && itemArray[4] === itemArray[5]) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (itemArray[6] != "empty" && itemArray[6] === itemArray[7] && itemArray[7] === itemArray[8]) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (itemArray[0] != "empty" && itemArray[0] === itemArray[3] && itemArray[3] === itemArray[6]) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (itemArray[1] != "empty" && itemArray[1] === itemArray[4] && itemArray[4] === itemArray[7]) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (itemArray[2] != "empty" && itemArray[2] === itemArray[5] && itemArray[5] === itemArray[8]) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (itemArray[0] != "empty" && itemArray[0] === itemArray[4] && itemArray[4] === itemArray[8]) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (itemArray[2] != "empty" && itemArray[2] === itemArray[4] && itemArray[4] === itemArray[6]) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (itemArray.indexOf("empty") == -1) {
      setWinMessage("DRAW");
    }
  };

  return (
    <NativeBaseProvider>
      <Heading style={styles.message}>Tic Tac Toe</Heading>
      <Box style={styles.grid}>
        {itemArray.map((item, index) => (
          <TouchableOpacity
            style={styles.box}
            key={index}
            onPress={() => changeItem(index)}>
            <Card style={styles.card}>
              <Icons name={item} />
            </Card>
          </TouchableOpacity>
        ))}
      </Box>
      <Box>
        {winMessage ? (
          <>
            <Heading size="xl" style={styles.message}>
              {winMessage}
            </Heading>
            <Button onPress={reloadGame} rounded={24}>
              <Text style={{color: '#FFF'}}>Reload Game</Text>
            </Button>
          </>
        ) : (
          <Heading style={styles.message} size="md">
            {isCross ? 'Cross' : 'Circle'}'s turn
          </Heading>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  box: {
    width: '33%',
    marginBottom: 4,
  },
  card: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFF',
    marginTop: 16,
    backgroundColor: '#4652B3',
    paddingVertical: 8,
    marginBottom: 16,
  },
});
