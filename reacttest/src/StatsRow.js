import React from "react";
import StockChart from './stock.svg';
import './StatsRow.css';
import { db } from './firebase';
import { doc, addDoc, updateDoc, collection, query, where, getDocs, runTransaction } from 'firebase/firestore';

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;
  const percentageClass = percentage < 0 ? 'negative' : 'positive';

  async function buyStock() {
    const q = query(collection(db, 'myStocks'), where('ticker', '==', props.name));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Use transaction to ensure atomic updates
        await runTransaction(db, async (transaction) => {
          querySnapshot.forEach((docSnapshot) => {
            const docData = docSnapshot.data();
            if (docData) { // Check if docData is defined
              const docRef = doc(db, 'myStocks', docSnapshot.id);
              const currentShares = parseInt(docData.shares, 10);

              transaction.update(docRef, {
                shares: currentShares + 1
              });
            } else {
              console.error("Document data is undefined");
            }
          });
        });

      } else {
        // Add the ticker to the database with 1 share
        await addDoc(collection(db, 'myStocks'), {
          ticker: props.name,
          shares: 1
        });
      }

    } catch (error) {
      console.error("Error updating or adding stock shares: ", error);
    }
  }

  return (
    <div className="row" onClick={buyStock}>
      <div className="row__intro">
        <h1>{props?.name}</h1>
        <p>{props.volume && (props.volume + " shares")}</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16} alt="Stock Chart" />
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>
        <p className={`row__percentage ${percentageClass}`}>{Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default StatsRow;
