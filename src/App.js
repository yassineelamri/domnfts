import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import DemonOfMoney from './artifacts/contracts/DemonOfMoney.sol/DemonOfMoney.json';
import img1 from './img/img1.jpeg';

const DOMaddress = "0x971703B7F135733c5742771B304Eb3a5842989Ad" 

function App() {
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData(){
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(DOMaddress, DemonOfMoney.abi, provider);
      try{
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)}
        setData(object)
      }
      catch(err){

      }
    }
  }

async function mint() {
  if(typeof window.ethereum !== "undefined"){
    let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(DOMaddress, DemonOfMoney.abi, signer);
    try {
      let overrides = {
        from: accounts[0],
        value: data.cost
      }
      const transaction = await contract.mint(accounts[0], 1, overrides);
      await transaction.wait();
      fetchData();
    }
    catch(err) {

    }
  }
}

  return (
    <div className="App">
      <div className='container'>
        <div className='banniere'>
          <img src={img1} alt = "img"/>
        </div>
        {error && <p>{error}</p>}
        <h1>Mint a Demon Of Money NFT!</h1>
        <p className='count'>{data.totalSupply} / 10000</p>
        <p className='cost'>Each Demon Of Money Costs {data.cost/10**18} eth (excluding gas fees)</p>
        <button onClick={mint}>Buy 1 Demon Of Money</button>
      </div>
    </div>
  );
}

export default App;
