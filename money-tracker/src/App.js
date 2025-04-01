import './App.css';
import { useState } from 'react';


function App() {
  const[name,setName] = useState('');  
  const[datetime,setDatetime] = useState('');  
  const[amount,setAmount] = useState(''); 
  const [category, setCategory] = useState('');
  const[balance,setBalance] = useState(100); 
  const [filterCategory, setFilterCategory] = useState('');
  
  const categories = [
    "Salary", "Investments", "Other Income",
    "Food & Drinks", "Rent & Bills", "Transport", "Entertainment",
    "Healthcare", "Shopping", "Education", "Other Expenses"
  ];

  const[transactions,setTransactions] = useState([
    {
      id: 1,
      name: "New Pringles",
      amount: -100,
      category: "Food & Drinks",
      datetime: "2025-01-01T11:11"
    },
    {
      id: 2,
      name: "Found cash",
      amount: 300,
      category: "Other Income",
      datetime: "2025-01-03T14:20"
    },
    {
      id: 3,
      name: "Mobile Repair",
      amount: -100,
      category: "Other Expenses",
      datetime: "2025-01-11T19:23"
    }
  ]); 
  
  const filteredTransactions = filterCategory
        ? transactions.filter(transaction => transaction.category === filterCategory)
        : transactions;

  function handleSubmit(e){ 
    e.preventDefault(); 

    const amountvalue = parseFloat(amount);
    
    const newTransaction = {
      id: Date.now(),
      name,
      amount: amountvalue,
      category,
      datetime
    };

    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance + amountvalue);
    setName('');
    setDatetime('');
    setAmount(''); 
    setCategory('');
    setFilterCategory('');
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
      <h1 className="balance">
        Balance: <span className={balance < 0 ? 'red' : 'green'}>{balance}Rs</span>
      </h1>
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
        <div className="amount">
          <input type="number"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 placeholder="Amount (use - for expenses)"
                 required />
        </div>
        <div className="category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} 
            required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Transaction</button> 
      </form>
      <div className="filter">
        <h6 className='fil-head'>Filter by Category:</h6>
        <select className="fil-cat" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="Transactions">
        {filteredTransactions.map(transaction => (
          <div className="Transaction" key={transaction.id}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="category">Category: {transaction.category}</div>
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
