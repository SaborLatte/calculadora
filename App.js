import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function App() {
  const buttons = [
    '7', '8', '9', '4', '5', '6', '1', '2', '3', '0',
    '+', '-', '×', '÷',
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'x²', '√', 'x^y', 'ln', 'log',
    'π', 'e', '%',
    '=', 'AC', '.', 'DEL'
  ];
  
  const [currentNumber, setcurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch (operator) {
      case '+': 
        setcurrentNumber((firstNumber + lastNumber).toString());
        return;
      case '-': 
        setcurrentNumber((firstNumber - lastNumber).toString());
        return;
      case '×': 
        setcurrentNumber((firstNumber * lastNumber).toString());
        return;
      case '÷': 
        if (lastNumber === 0) {
          setcurrentNumber("Error");
        } else {
          setcurrentNumber((firstNumber / lastNumber).toString());
        }
        return;
      case 'x^y':
        setcurrentNumber(Math.pow(firstNumber, lastNumber).toString());
        return;
      case '%':
        setcurrentNumber((firstNumber / 100).toString());
        return;
    }
  }

  function handleInput(buttonPressed) {
    if (['+', '-', '×', '÷', '%', 'x^y'].includes(buttonPressed)) {
      setcurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setcurrentNumber(currentNumber.substring(0, currentNumber.length - 1)); 
        return;
      case 'AC':
        setLastNumber("");
        setcurrentNumber("");
        return;
      case '=':
        setLastNumber(currentNumber + " = ");
        calculator();
        return;
      case 'π':
        setcurrentNumber(currentNumber + Math.PI.toString());
        return;
      case 'e':
        setcurrentNumber(currentNumber + Math.E.toString());
        return;
      case 'x²':
        setcurrentNumber((Math.pow(parseFloat(currentNumber), 2)).toString());
        return;
      case '√':
        setcurrentNumber((Math.sqrt(parseFloat(currentNumber))).toString());
        return;
      case 'e^x':
        setcurrentNumber((Math.exp(parseFloat(currentNumber))).toString());
        return;
      case 'ln':
        setcurrentNumber((Math.log(parseFloat(currentNumber))).toString());
        return;
      case 'log':
        setcurrentNumber((Math.log10(parseFloat(currentNumber))).toString());
        return;
        case 'sin':
          setcurrentNumber((Math.sin(parseFloat(currentNumber) * (Math.PI / 180)).toFixed(4)).toString());
          return;
        case 'cos':
          setcurrentNumber((Math.cos(parseFloat(currentNumber) * (Math.PI / 180)).toFixed(4)).toString());
          return;
        case 'tan':
          setcurrentNumber((Math.tan(parseFloat(currentNumber) * (Math.PI / 180)).toFixed(4)).toString());
          return;
        case 'asin':
          setcurrentNumber((Math.asin(parseFloat(currentNumber)) * (180 / Math.PI)).toFixed(4).toString());
          return;
        case 'acos':
          setcurrentNumber((Math.acos(parseFloat(currentNumber)) * (180 / Math.PI)).toFixed(4).toString());
          return;
        case 'atan':
          setcurrentNumber((Math.atan(parseFloat(currentNumber)) * (180 / Math.PI)).toFixed(4).toString());
          return;
    }

    setcurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.results}
        contentContainerStyle={styles.scrollContent}
        horizontal={true}
      >
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </ScrollView>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  results: {
    backgroundColor: "#c7d9f5",
    width: '100%',
    minHeight: '20%',
    padding: 20,
  },
  scrollContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  resultText: {
    fontSize: 40,
  },
  historyText: {
    fontSize: 20,
    marginRight: 3,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: "#e1c4fc",
    minHeight: '80%',
  },
  button: {
    borderColor: "#f1fcc4",
    backgroundColor: "#bfadf4",
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '22%',
    height: '11.5%',
    margin: 3,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});