import { useState, useEffect } from 'react';
import produce from 'immer';

const DirtyItems = props => props.data.map(item => <div className="items">{item.itemName} {item.itemAmount} <button onClick={() => handleClickItemAmounts()}>+</button></div>);

export default () => {
  const initialData = [{ name: 'Loading... ', amount: 0 }];
  const [data, setDirtyItem] = useState(initialData);

  const handleClickItems = () => {
    const itemName = document.querySelector('#itemName').value.trim();
    const itemAmount = document.querySelector('#itemAmount').value.trim();

    if (itemName && itemAmount) {
      const nextState = produce(data, draftState => {
        draftState.push({ itemName, itemAmount });
      });
      document.querySelector('#itemName').value = '';
      document.querySelector('#itemAmount').value = '';

      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }

      setDirtyItem(nextState);
    }
  };

  const handleClickItemAmounts = () => {
    
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getDirtyItems = localStorage.getItem('data');
      if (getDirtyItems !== '' && getDirtyItems !== null) {
        return setDirtyItem(JSON.parse(getDirtyItems));
      }
      return setDirtyItem([]);
    }
  }, 0);

  return (
    <>
      <input id="itemName" style={{ width: '20%' }} type="text" placeholder="Item name" />
      <input id="itemAmount" style={{ width: '20%' }} type="text" placeholder="Item Amount" />
      <button onClick={() => handleClickItems()}>Add Item</button>

      <DirtyItems data={data} />
    </>
  );
};
