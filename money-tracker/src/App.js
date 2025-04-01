import './App.css';
import { useState } from 'react';


function App() {
  const[name,setName] = useState('');  
  const[datetime,setDatetime] = useState('');  
  const[description,setDescription] = useState('');  
  const[amount,setAmount] = useState(''); 
  const[balance,setBalance] = useState(100);  

  const[transactions,setTransactions] = useState([
    {
      id: 1,
      name: "New Pringles",
      description: "Hungry!",
      amount: -100,
      datetime: "2025-01-01T11:11"
    },
    {
      id: 2,
      name: "Found cash",
      description: "yayaayya!!",
      amount: 300,
      datetime: "2025-01-03T14:20"
    },
    {
      id: 3,
      name: "Mobile Repair",
      description: "Screw that thing",
      amount: -100,
      datetime: "2025-01-11T19:23"
    }
  ]);  

  function handleSubmit(e){ 
    e.preventDefault(); 

    const amountvalue = parseFloat(amount);
    
    const newTransaction = {
      id: Date.now(),
      name,
      description,
      amount: amountvalue,
      datetime
    };

    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance + amountvalue);
    setName('');
    setDatetime('');
    setDescription('');
    setAmount(''); 
  }

  function formatDate(date){
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(date).toLocaleString('en-US', options).replace(',','');
  }

  return (
    <main>
      <h1 className={`balance ${balance < 0 ? 'red' : ''}`}>Balance:{balance}Rs</h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
            <input type="text" 
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 placeholder="Pringles"
                 required /> 
            <input type="datetime-local"
                  value={datetime}
                  onChange={(e)=>setDatetime(e.target.value)}
                  required />
        </div> 
        <div className="description">
          <input type="text" 
                 value={description}
                 onChange={(e)=>setDescription(e.target.value)} 
                 placeholder="description" />
        </div>
        <div className="amount">
          <input type="number"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 placeholder="Amount (use - for expenses)"
                 required />
        </div>
        <button type="submit">Add Transaction</button> 
      </form>
      <div className="Transactions">
        {transactions.map(transaction => (
          <div className="Transaction" key={transaction.id}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={`price ${transaction.amount < 0 ? 'red' : ''}`}>
                {transaction.amount < 0 ? '-' : '+'} {Math.abs(transaction.amount)}Rs
              </div>
              <div className="date">{formatDate(transaction.datetime)}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
