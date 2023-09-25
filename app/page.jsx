"use client"
import { useEffect, useState } from 'react'
import getRepo from '../utils/ghApi'
import Commits from './components/Commit'

export default function Home() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const func = async () =>{
      const res = await getRepo();
      setData(res)
    }
    func();
  },[])
  return (
  <div>
    { data ? <Commits data={data}/> : <div>loading...</div>
    }
  </div>
);
}
