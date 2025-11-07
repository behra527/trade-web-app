"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowDown, ArrowUp, Wallet } from "lucide-react";

const transactions = [
  { id: 1, type: "Deposit", amount: 250, date: "2025-10-12", status: "Success" },
  { id: 2, type: "Withdraw", amount: 120, date: "2025-10-11", status: "Pending" },
  { id: 3, type: "Deposit", amount: 500, date: "2025-10-09", status: "Success" },
  { id: 4, type: "Withdraw", amount: 300, date: "2025-10-08", status: "Failed" },
];

const TransactionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) => {
    const matchType =
      activeTab === "all" ? true : t.type.toLowerCase() === activeTab;
    const matchSearch = t.type.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 w-full md:w-64"
          />
          <Button variant="outline" className="border-slate-700 text-white">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Total Balance</CardTitle>
            <Wallet className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">$5,420</CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Total Deposit</CardTitle>
            <ArrowDown className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-400">$2,890</CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Total Withdraw</CardTitle>
            <ArrowUp className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-400">$1,560</CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-slate-900 border border-slate-700 w-fit">
          <TabsTrigger value="all" className="text-white data-[state=active]:bg-slate-800">
            All
          </TabsTrigger>
          <TabsTrigger value="deposit" className="text-white data-[state=active]:bg-slate-800">
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="text-white data-[state=active]:bg-slate-800">
            Withdraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="bg-slate-800 border-slate-700 text-white mt-4 overflow-x-auto">
            <CardContent className="p-0">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-900 border-b border-slate-700 text-slate-400">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-700 hover:bg-slate-700/40 transition">
                        <td className="px-6 py-3">{tx.id}</td>
                        <td className="px-6 py-3">{tx.type}</td>
                        <td className="px-6 py-3">${tx.amount}</td>
                        <td className="px-6 py-3">{tx.date}</td>
                        <td className="px-6 py-3">
                          <Badge
                            variant={
                              tx.status === "Success"
                                ? "default"
                                : tx.status === "Pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-slate-400"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionPage;
