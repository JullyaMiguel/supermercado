import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (name && quantity && price) {
      setItems([...items, { name, quantity: parseInt(quantity), price: parseFloat(price), id: Math.random().toString() }]);
      setName('');
      setQuantity('');
      setPrice('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Item"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantity}
          onChangeText={text => setQuantity(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={price}
          onChangeText={text => setPrice(text)}
          keyboardType="numeric"
        />
        <Button title="Adicionar Item" onPress={addItem} />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name} - Quantidade: {item.quantity} - Preço: ${item.price.toFixed(2)}</Text>
              <Button title="Remover" onPress={() => removeItem(item.id)} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
