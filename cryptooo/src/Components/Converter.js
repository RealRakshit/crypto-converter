import React, { useEffect } from 'react'
import { Card } from 'antd'
import "./Converter.css";
import {Form} from 'antd';
import {Input} from 'antd';
import {Select} from 'antd';
import { useState } from 'react';
import { FaCoins } from "react-icons/fa";

function Converter() {

    const apiurl="https://api.coingecko.com/api/v3/exchange_rates";


   useEffect(
    ()=>{
        fetchData();
    },[]
   );

   const [cryptoList,setCryptoList]=useState([]);
    const[inputValue,setInputValue]=useState("0");
    const[firstSelect,setFirstSelect]=useState("Bitcoin");
    const[secondSelect,setSecondSelect]=useState("Ether");
    const[result,setResult]=useState("");


   async function fetchData(){
    const data=await fetch(apiurl);
    const jsonData=await data.json();
    const datas=jsonData.rates;
    const tempArray=Object.entries(datas).map(item=>{           //convert object to array
        return {
            value: item[1].name,
            label: item[1].name,
            rate: item[1].value,
        }
    });
    setCryptoList(tempArray);
   }

   useEffect(
    ()=>{

        if (cryptoList.length===0){return}
            const firstobjrate=cryptoList.find((item)=>{

                return item.value===firstSelect;
            }
            ).rate;
    
            const secondobjrate=cryptoList.find((item)=>{
    
                return item.value===secondSelect;
            }
            ).rate;
            const resultvalue=(inputValue* secondobjrate)/ firstobjrate;
            setResult(resultvalue);
        
        
    },[inputValue,firstSelect,secondSelect]
   )

    return (
        <div className='container'>
          <Card className="converter-card" title={<h1><FaCoins />Crypto Converter</h1>} bordered={false}>
            <Form>
              <Form.Item name="Crypto 1">
                <Input onChange={(event)=>setInputValue(event.target.value)} />
              </Form.Item>
            </Form>
            <div className='selectbox'>
              <Select style={{width : '120px' }} defaultValue={"Bitcoin"} options={cryptoList} onChange={(value)=>setFirstSelect(value)} />
              <Select style={{width : '120px' }} defaultValue={"Ether"} options={cryptoList} onChange={(value)=>setSecondSelect(value)}/>
            </div>
            <p>{result}</p>
          </Card>
        </div>
      );
    }
export default Converter;
