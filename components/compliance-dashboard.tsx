'use client'
import React, { useState } from 'react'
import { Bell, Filter, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Helper function to generate a random transaction
const generateRandomTransaction = () => {
  const events = ['Swapped', 'Position Updated', 'Fees Accumulated']
  const event = events[Math.floor(Math.random() * events.length)]
  const amount = Math.floor(Math.random() * 1000)
  const isFlagged = Math.random() < 0.3 // 30% chance of being flagged
  const hash = '0x' + Math.random().toString(16).substr(2, 8)
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
  
  return {
    event,
    hash,
    amount: `${amount} Token0, ${amount * 1.5} Token1`,
    timestamp,
    isFlagged,
    status: isFlagged ? 'Flagged' : 'Normal'
  }
}

export function ComplianceDashboard() {
  const [transactions, setTransactions] = useState([
    { event: 'Swapped', hash: '0xtxhash456...', amount: '200 Token0, 300 Token1', timestamp: '2024-04-25 12:15:00', status: 'Normal' },
    { event: 'Position Updated', hash: '0xtxhash789...', amount: '+1000 Liquidity', timestamp: '2024-04-25 12:12:30', status: 'Flagged' },
    { event: 'Fees Accumulated', hash: '0xtxhashABC...', amount: '50 Token0, 75 Token1', timestamp: '2024-04-25 12:10:45', status: 'Normal' },
  ])
  const [flaggedTransaction, setFlaggedTransaction] = useState({
    event: 'High-Volume Swap',
    hash: '0xtxhashEKUBO123...',
    amount: '500 Token0, 500 Token1',
    timestamp: '2024-04-25 12:10:00',
  })
  const [stats, setStats] = useState({
    totalTransactions: 1234,
    flaggedTransactions: 56,
    totalVolume: 10567890
  })

  const handleRefresh = () => {
    const newTransaction = generateRandomTransaction()
    setTransactions(prev => [newTransaction, ...prev.slice(0, 2)])
    setStats(prev => ({
      totalTransactions: prev.totalTransactions + 1,
      flaggedTransactions: prev.flaggedTransactions + (newTransaction.isFlagged ? 1 : 0),
      totalVolume: prev.totalVolume + parseInt(newTransaction.amount.split(' ')[0])
    }))
    if (newTransaction.isFlagged) {
      setFlaggedTransaction({
        event: newTransaction.event,
        hash: newTransaction.hash,
        amount: newTransaction.amount,
        timestamp: newTransaction.timestamp,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EC796B] to-[#D672EF] p-8">
      <Card className="container mx-auto bg-gradient-to-br from-[#2F44B2] to-[#3F8CFF] rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#1C1C84] to-[#2F44B2] text-white p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Compliance Dashboard</CardTitle>
            <Button variant="outline" className="text-white border-white bg-white/10 hover:bg-white/20" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
            </Button>
          </div>
          <CardDescription className="text-gray-300 mt-2">
            Monitor and analyze EKUBO Core contract transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-[#3F8CFF] to-[#2F44B2] text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalTransactions.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#EC796B] to-[#D672EF] text-white">
              <CardHeader>
                <CardTitle className="text-lg">Flagged Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.flaggedTransactions.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#2F44B2] to-[#1C1C84] text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total Volume (USD)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${stats.totalVolume.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="flex flex-wrap gap-4">
              <Input className="max-w-xs bg-white/20 text-white placeholder-white border-white/20 [&::placeholder]:text-white" placeholder="Search by address or transaction hash" />
              <Select>
                <SelectTrigger className="w-[180px] bg-white/10 text-white border-white/20">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#2F44B2] text-white">
                  <SelectItem value="swapped" className="hover:bg-white/20">Swapped</SelectItem>
                  <SelectItem value="positionUpdated" className="hover:bg-white/20">Position Updated</SelectItem>
                  <SelectItem value="feesAccumulated" className="hover:bg-white/20">Fees Accumulated</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-white/10 text-white border-white/20">
                  <SelectValue placeholder="Issue Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#2F44B2] text-white">
                  <SelectItem value="highVolume" className="hover:bg-white/20">High Volume</SelectItem>
                  <SelectItem value="frequentTrades" className="hover:bg-white/20">Frequent Trades</SelectItem>
                  <SelectItem value="largeLiquidity" className="hover:bg-white/20">Large Liquidity Movement</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#EC796B] hover:bg-[#D672EF] text-white">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Recent Flagged Transactions</h3>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between py-2 border-b border-white/20">
                <div className="flex items-center">
                  <Bell className="text-[#EC796B] mr-2" />
                  <span className="font-medium">{flaggedTransaction.event}</span>
                </div>
                <span className="text-sm text-gray-300">Just now</span>
              </div>
              <div className="mt-2">
                <p className="text-sm"><strong>Transaction Hash:</strong> {flaggedTransaction.hash}</p>
                <p className="text-sm"><strong>Amount:</strong> {flaggedTransaction.amount}</p>
                <p className="text-sm"><strong>Timestamp:</strong> {flaggedTransaction.timestamp}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/10 rounded-lg">
                <thead className="bg-white/20">
                  <tr>
                    <th className="py-2 px-4 text-left">Event</th>
                    <th className="py-2 px-4 text-left">Transaction Hash</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                    <th className="py-2 px-4 text-left">Timestamp</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-2 px-4">{tx.event}</td>
                      <td className="py-2 px-4">{tx.hash}</td>
                      <td className="py-2 px-4">{tx.amount}</td>
                      <td className="py-2 px-4">{tx.timestamp}</td>
                      <td className="py-2 px-4 flex items-center">
                        {tx.status === 'Flagged' ? (
                          <><AlertTriangle className="text-[#EC796B] mr-2" /> Flagged</>
                        ) : (
                          <><CheckCircle className="text-green-400 mr-2" /> Normal</>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      <footer className="text-center text-white mt-8">
        Powered by Starknet
      </footer>
    </div>
  )
}

