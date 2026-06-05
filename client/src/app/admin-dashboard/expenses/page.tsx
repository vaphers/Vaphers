"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Plus, X, Wallet, CreditCard, Banknote, ArrowUpCircle, ArrowDownCircle,
  ArrowLeftRight, Search, Filter, Trash2, Tag, ChevronDown, TrendingUp,
  TrendingDown, BarChart3, PiggyBank, AlertCircle, Check, Edit3, DollarSign,
  Calendar, SlidersHorizontal, RefreshCw, Loader2
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type AccountType = 'bank' | 'card' | 'cash' | 'wallet'
type TxType = 'expense' | 'income' | 'transfer'

interface Account {
  id: string
  name: string
  type: AccountType
  color: string
  balance: number
  currency: string
}

interface Transaction {
  id: string
  type: TxType
  amount: number
  mainCategory: string
  subCategory: string
  date: string
  note: string
  tags: string[]
  accountId: string | null
  toAccountId: string | null
  payee: string
  createdAt: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES: Record<string, { subs: string[]; emoji: string; color: string }> = {
  Food: { emoji: '🍜', color: '#f97316', subs: ['Groceries', 'Restaurant', 'Café', 'Delivery', 'Snacks'] },
  Transport: { emoji: '🚌', color: '#3b82f6', subs: ['Fuel', 'Uber/Ola', 'Metro', 'Bus', 'Auto', 'Train', 'Flight'] },
  Shopping: { emoji: '🛍️', color: '#a855f7', subs: ['Clothes', 'Electronics', 'Books', 'Home', 'Beauty'] },
  Health: { emoji: '💊', color: '#22c55e', subs: ['Medicine', 'Doctor', 'Gym', 'Lab Tests', 'Insurance'] },
  Bills: { emoji: '📄', color: '#ef4444', subs: ['Electricity', 'Internet', 'Mobile', 'Water', 'Gas', 'Rent', 'EMI'] },
  Entertainment: { emoji: '🎬', color: '#ec4899', subs: ['Streaming', 'Movies', 'Games', 'Events', 'Sports'] },
  Education: { emoji: '📚', color: '#06b6d4', subs: ['Course', 'Books', 'Stationery', 'Tuition'] },
  Travel: { emoji: '✈️', color: '#f59e0b', subs: ['Hotel', 'Flight', 'Activities', 'Food', 'Transport'] },
  Investment: { emoji: '📈', color: '#10b981', subs: ['Stocks', 'Mutual Funds', 'FD', 'Crypto', 'Gold'] },
  Income: { emoji: '💰', color: '#84cc16', subs: ['Salary', 'Freelance', 'Gift', 'Refund', 'Dividend', 'Rental', 'Other'] },
  Transfer: { emoji: '🔄', color: '#6366f1', subs: ['Between Accounts'] },
  Other: { emoji: '📦', color: '#64748b', subs: ['Miscellaneous'] },
}

const ACCOUNT_TYPE_META: Record<AccountType, { icon: any; label: string }> = {
  bank: { icon: Banknote, label: 'Bank Account' },
  card: { icon: CreditCard, label: 'Credit/Debit Card' },
  cash: { icon: DollarSign, label: 'Cash' },
  wallet: { icon: Wallet, label: 'Digital Wallet' },
}

const ACCOUNT_COLORS = [
  '#6366f1','#3b82f6','#22c55e','#f97316','#ef4444','#a855f7','#ec4899','#f59e0b','#10b981','#06b6d4'
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

const groupByDate = (txs: Transaction[]) => {
  const map = new Map<string, Transaction[]>()
  txs.forEach(tx => {
    const key = tx.date.slice(0, 10)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(tx)
  })
  return map
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AccountCard({ account, onSelect, selected }: { account: Account; onSelect: () => void; selected: boolean }) {
  const meta = ACCOUNT_TYPE_META[account.type]
  const Icon = meta.icon
  return (
    <button
      onClick={onSelect}
      className={`relative flex-shrink-0 w-48 rounded-sm p-4 text-left transition-all duration-200 border-2 ${
        selected ? 'border-gray-900 shadow-md scale-105' : 'border-transparent hover:border-gray-300'
      }`}
      style={{ background: `linear-gradient(135deg, ${account.color}, ${account.color}dd)` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/90">{meta.label}</span>
        <Icon size={16} className="text-white/90" />
      </div>
      <p className="text-lg font-bold text-white truncate">{account.name}</p>
      <p className={`text-2xl font-black mt-1 ${account.balance < 0 ? 'text-red-100' : 'text-white'}`}>
        {fmt(account.balance)}
      </p>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
          <Check size={12} className="text-gray-900" />
        </div>
      )}
    </button>
  )
}

function TxRow({ tx, accounts, onDelete }: { tx: Transaction; accounts: Account[]; onDelete: () => void }) {
  const cat = CATEGORIES[tx.mainCategory] || CATEGORIES.Other
  const srcAcc = accounts.find(a => a.id === tx.accountId)
  const dstAcc = accounts.find(a => a.id === tx.toAccountId)

  return (
    <div className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
      {/* Category icon */}
      <div
        className="w-10 h-10 rounded-sm flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: cat.color + '22', border: `1px solid ${cat.color}44` }}
      >
        {cat.emoji}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {tx.payee || tx.subCategory || tx.mainCategory}
          </p>
          {tx.subCategory && tx.payee && (
            <span className="text-xs text-gray-500 truncate">· {tx.subCategory}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {srcAcc && (
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-sm"
              style={{ background: srcAcc.color + '22', color: srcAcc.color }}
            >
              {srcAcc.name}
            </span>
          )}
          {tx.type === 'transfer' && dstAcc && (
            <>
              <ArrowLeftRight size={10} className="text-gray-400" />
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-sm"
                style={{ background: dstAcc.color + '22', color: dstAcc.color }}
              >
                {dstAcc.name}
              </span>
            </>
          )}
          {tx.note && <span className="text-[10px] text-gray-500 truncate">{tx.note}</span>}
        </div>
      </div>

      {/* Amount + date */}
      <div className="text-right flex-shrink-0">
        <p className={`font-bold text-sm ${
          tx.type === 'income' ? 'text-emerald-600' :
          tx.type === 'transfer' ? 'text-blue-600' : 'text-rose-600'
        }`}>
          {tx.type === 'income' ? '+' : tx.type === 'transfer' ? '⇄' : '-'}{fmt(tx.amount)}
        </p>
        <p className="text-[10px] text-gray-500 mt-0.5">{fmtDate(tx.date)}</p>
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-sm hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExpensePage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [activeAccount, setActiveAccount] = useState<string | null>(null)

  // Modals
  const [showTxModal, setShowTxModal] = useState(false)
  const [showAccModal, setShowAccModal] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<TxType | 'all'>('all')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [filterMonth, setFilterMonth] = useState<string>(() => {
    const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
  })
  const [showFilters, setShowFilters] = useState(false)

  // New transaction form
  const emptyTx = {
    type: 'expense' as TxType,
    amount: '',
    mainCategory: 'Food',
    subCategory: '',
    date: new Date().toISOString().slice(0,10),
    note: '',
    tags: [] as string[],
    accountId: '',
    toAccountId: '',
    payee: '',
  }
  const [txForm, setTxForm] = useState(emptyTx)
  const [tagInput, setTagInput] = useState('')
  const [txSaving, setTxSaving] = useState(false)
  const [txError, setTxError] = useState('')

  // New account form
  const emptyAcc = { name: '', type: 'bank' as AccountType, color: ACCOUNT_COLORS[0], balance: '', currency: 'INR' }
  const [accForm, setAccForm] = useState(emptyAcc)
  const [accSaving, setAccSaving] = useState(false)

  // Analytics tab
  const [analyticsTab, setAnalyticsTab] = useState<'category'|'account'|'trend'>('category')

  // ── Load data ──────────────────────────────────────────────────────────────
  const loadAll = async () => {
    setLoading(true)
    try {
      const [txRes, accRes] = await Promise.all([
        fetch('/api/expense').then(r => r.json()),
        fetch('/api/expense?resource=accounts').then(r => r.json()),
      ])
      setTransactions(Array.isArray(txRes) ? txRes : [])
      setAccounts(Array.isArray(accRes) ? accRes : [])
    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => { loadAll() }, [])

  // ── Derived data ────────────────────────────────────────────────────────────
  const filteredTxs = useMemo(() => {
    return transactions.filter(tx => {
      if (filterType !== 'all' && tx.type !== filterType) return false
      if (filterCat !== 'all' && tx.mainCategory !== filterCat) return false
      if (activeAccount && tx.accountId !== activeAccount && tx.toAccountId !== activeAccount) return false
      if (filterMonth && !tx.date.startsWith(filterMonth)) return false
      if (search) {
        const q = search.toLowerCase()
        if (
          !tx.payee?.toLowerCase().includes(q) &&
          !tx.mainCategory?.toLowerCase().includes(q) &&
          !tx.subCategory?.toLowerCase().includes(q) &&
          !tx.note?.toLowerCase().includes(q) &&
          !tx.tags?.some(t => t.toLowerCase().includes(q))
        ) return false
      }
      return true
    })
  }, [transactions, filterType, filterCat, activeAccount, filterMonth, search])

  const totalIncome = useMemo(() =>
    filteredTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0), [filteredTxs])
  const totalExpense = useMemo(() =>
    filteredTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0), [filteredTxs])
  const netBalance = totalIncome - totalExpense

  const totalAssets = accounts.reduce((s, a) => s + (a.balance > 0 ? a.balance : 0), 0)
  const totalDebt = accounts.reduce((s, a) => s + (a.balance < 0 ? a.balance : 0), 0)

  const spendByCategory = useMemo(() => {
    const map: Record<string, number> = {}
    filteredTxs.filter(t => t.type === 'expense').forEach(t => {
      map[t.mainCategory] = (map[t.mainCategory] || 0) + t.amount
    })
    return Object.entries(map).sort((a,b) => b[1]-a[1])
  }, [filteredTxs])

  const spendByAccount = useMemo(() => {
    const map: Record<string, number> = {}
    filteredTxs.filter(t => t.type === 'expense').forEach(t => {
      if (t.accountId) map[t.accountId] = (map[t.accountId] || 0) + t.amount
    })
    return Object.entries(map).sort((a,b) => b[1]-a[1])
  }, [filteredTxs])

  const grouped = useMemo(() => groupByDate(filteredTxs), [filteredTxs])

  // ── Handlers ───────────────────────────────────────────────────────────────
  const saveTx = async () => {
    if (!txForm.amount || !txForm.date) { setTxError('Amount and date are required'); return }
    if (txForm.type === 'transfer' && !txForm.toAccountId) { setTxError('Select destination account'); return }
    setTxSaving(true); setTxError('')
    try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...txForm,
          amount: Number(txForm.amount),
          mainCategory: txForm.type === 'transfer' ? 'Transfer' : txForm.type === 'income' ? (txForm.mainCategory === 'Food' ? 'Income' : txForm.mainCategory) : txForm.mainCategory,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setShowTxModal(false)
      setTxForm(emptyTx)
      await loadAll()
    } catch (e: any) { setTxError(e.message) }
    setTxSaving(false)
  }

  const saveAcc = async () => {
    if (!accForm.name) return
    setAccSaving(true)
    try {
      await fetch('/api/expense?resource=accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...accForm, balance: Number(accForm.balance) || 0 }),
      })
      setShowAccModal(false)
      setAccForm(emptyAcc)
      await loadAll()
    } catch {}
    setAccSaving(false)
  }

  const deleteTx = async (id: string) => {
    await fetch(`/api/expense?id=${id}`, { method: 'DELETE' })
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const addTag = () => {
    if (tagInput.trim() && !txForm.tags.includes(tagInput.trim())) {
      setTxForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const txCats = txForm.type === 'income' ? ['Income'] : txForm.type === 'transfer' ? ['Transfer'] : Object.keys(CATEGORIES).filter(c => c !== 'Income' && c !== 'Transfer')

  // ─── UI ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black tracking-tight text-gray-900">Finance Hub</h1>
          <p className="text-xs text-gray-500 mt-0.5">{filterMonth}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadAll} className="p-2 rounded-sm hover:bg-gray-100 text-gray-500 transition-colors">
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => { setShowAccModal(true) }}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
          >
            <Plus size={14} /> Account
          </button>
          <button
            onClick={() => setShowTxModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-sm"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 space-y-6 max-w-6xl mx-auto">

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Assets', value: totalAssets, icon: PiggyBank, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { label: 'Month Income', value: totalIncome, icon: TrendingUp, color: 'text-sky-600', bg: 'bg-sky-100' },
            { label: 'Month Spend', value: totalExpense, icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-100' },
            { label: 'Net Savings', value: netBalance, icon: BarChart3, color: netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600', bg: netBalance >= 0 ? 'bg-emerald-100' : 'bg-rose-100' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="rounded-sm border border-gray-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{label}</span>
                <div className={`w-7 h-7 rounded-sm ${bg} flex items-center justify-center`}>
                  <Icon size={14} className={color} />
                </div>
              </div>
              <p className={`text-xl font-black ${color}`}>{fmt(value)}</p>
            </div>
          ))}
        </div>

        {/* ── Accounts Row ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Accounts</h2>
            <button onClick={() => { setShowAccModal(true) }} className="md:hidden text-xs font-semibold text-indigo-600 hover:text-indigo-500">+ New</button>
          </div>
          {loading ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1,2,3].map(i => (
                <div key={i} className="flex-shrink-0 w-48 h-28 rounded-sm bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : accounts.length === 0 ? (
            <div className="rounded-sm border border-dashed border-gray-300 p-6 text-center text-gray-500 text-sm">
              No accounts yet.{' '}
              <button onClick={() => setShowAccModal(true)} className="text-indigo-600 font-semibold hover:underline">Add one</button>
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveAccount(null)}
                className={`flex-shrink-0 w-32 rounded-sm border-2 p-4 transition-all duration-200 ${
                  activeAccount === null ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-transparent bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                <p className={`text-xs font-semibold mb-2 ${activeAccount === null ? 'text-indigo-600' : 'text-gray-500'}`}>All</p>
                <p className="text-lg font-black text-gray-900">{fmt(accounts.reduce((s,a) => s+a.balance, 0))}</p>
              </button>
              {accounts.map(acc => (
                <AccountCard
                  key={acc.id}
                  account={acc}
                  selected={activeAccount === acc.id}
                  onSelect={() => setActiveAccount(activeAccount === acc.id ? null : acc.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Analytics ── */}
        <div className="rounded-sm border border-gray-200 bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 bg-gray-100 rounded-sm p-1">
              {(['category','account','trend'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setAnalyticsTab(t)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold capitalize transition-all ${
                    analyticsTab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              type="month"
              value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-sm px-2 py-1 text-gray-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {analyticsTab === 'category' && (
            <div className="space-y-3">
              {spendByCategory.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No expenses this period</p>
              ) : spendByCategory.map(([cat, amt]) => {
                const meta = CATEGORIES[cat] || CATEGORIES.Other
                const pct = totalExpense > 0 ? (amt / totalExpense) * 100 : 0
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-base w-7 text-center">{meta.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-800 font-semibold">{cat}</span>
                        <span className="text-gray-600 font-medium">{fmt(amt)} <span className="text-gray-400 font-normal">({pct.toFixed(0)}%)</span></span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all duration-500"
                          style={{ width: `${pct}%`, background: meta.color }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {analyticsTab === 'account' && (
            <div className="space-y-3">
              {spendByAccount.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No account-tagged expenses</p>
              ) : spendByAccount.map(([accId, amt]) => {
                const acc = accounts.find(a => a.id === accId)
                if (!acc) return null
                const pct = totalExpense > 0 ? (amt / totalExpense) * 100 : 0
                return (
                  <div key={accId} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: acc.color }}>
                      <span className="text-xs text-white font-bold">{acc.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-800 font-semibold">{acc.name}</span>
                        <span className="text-gray-600 font-medium">{fmt(amt)} · {pct.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all duration-500"
                          style={{ width: `${pct}%`, background: acc.color }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                {accounts.map(acc => (
                  <div key={acc.id} className="flex items-center justify-between rounded-sm bg-gray-50 border border-gray-100 px-3 py-2">
                    <span className="text-xs text-gray-600 font-medium truncate">{acc.name}</span>
                    <span className={`text-xs font-bold ml-2 ${acc.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {fmt(acc.balance)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analyticsTab === 'trend' && (
            <div className="space-y-2">
              {(() => {
                const days: Record<string, { income: number; expense: number }> = {}
                filteredTxs.forEach(tx => {
                  const d = tx.date.slice(0,10)
                  if (!days[d]) days[d] = { income: 0, expense: 0 }
                  if (tx.type === 'income') days[d].income += tx.amount
                  if (tx.type === 'expense') days[d].expense += tx.amount
                })
                const entries = Object.entries(days).sort((a,b) => a[0].localeCompare(b[0]))
                const maxVal = Math.max(...entries.map(([,v]) => Math.max(v.income, v.expense)), 1)
                if (entries.length === 0) return <p className="text-gray-500 text-sm text-center py-4">No data</p>
                return (
                  <div className="flex items-end gap-1 h-24">
                    {entries.map(([date, vals]) => (
                      <div key={date} className="flex-1 flex flex-col items-center gap-0.5 group relative">
                        <div
                          className="w-full rounded-t-sm bg-emerald-400 hover:bg-emerald-500 transition-colors"
                          style={{ height: `${(vals.income / maxVal) * 80}px` }}
                          title={`Income: ${fmt(vals.income)}`}
                        />
                        <div
                          className="w-full rounded-t-sm bg-rose-400 hover:bg-rose-500 transition-colors"
                          style={{ height: `${(vals.expense / maxVal) * 80}px` }}
                          title={`Expense: ${fmt(vals.expense)}`}
                        />
                        <span className="hidden group-hover:block absolute bottom-full mb-1 text-[9px] bg-gray-800 text-white px-1.5 py-0.5 rounded-sm whitespace-nowrap z-10 shadow-sm">
                          {date.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              })()}
              <div className="flex gap-4 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1 font-medium"><span className="w-2 h-2 rounded-sm bg-emerald-400 inline-block" />Income</span>
                <span className="flex items-center gap-1 font-medium"><span className="w-2 h-2 rounded-sm bg-rose-400 inline-block" />Expense</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Transactions ── */}
        <div>
          {/* Search + Filter bar */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search transactions…"
                className="w-full bg-white border border-gray-200 rounded-sm pl-8 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-sm border transition-colors shadow-sm ${showFilters ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-sm bg-gray-50 border border-gray-200">
              {/* Type filter */}
              {(['all','income','expense','transfer'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold capitalize transition-colors border ${
                    filterType === t ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t}
                </button>
              ))}
              <div className="w-px bg-gray-300 mx-1" />
              {/* Category filter */}
              <select
                value={filterCat}
                onChange={e => setFilterCat(e.target.value)}
                className="bg-white border border-gray-200 rounded-sm text-xs text-gray-700 px-2 py-1 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All categories</option>
                {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{CATEGORIES[c].emoji} {c}</option>)}
              </select>
            </div>
          )}

          {/* Transaction list */}
          {loading ? (
            <div className="space-y-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-16 rounded-sm bg-white border border-gray-100 animate-pulse" />
              ))}
            </div>
          ) : filteredTxs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-sm border border-gray-200">
              <BarChart3 size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No transactions found</p>
            </div>
          ) : (
            <div className="rounded-sm border border-gray-200 bg-white shadow-sm overflow-hidden">
              {Array.from(grouped.entries()).map(([date, txs]) => (
                <div key={date}>
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      {new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {fmt(txs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0))} spent
                    </span>
                  </div>
                  {txs.map(tx => (
                    <TxRow key={tx.id} tx={tx} accounts={accounts} onDelete={() => deleteTx(tx.id)} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════════════ ADD TRANSACTION MODAL ════════════ */}
      {showTxModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-sm shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">New Transaction</h2>
              <button onClick={() => { setShowTxModal(false); setTxError('') }} className="p-2 hover:bg-gray-200 rounded-sm text-gray-500 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Type tabs */}
              <div className="flex bg-gray-100 rounded-sm p-1 gap-1">
                {(['expense','income','transfer'] as TxType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTxForm(f => ({ ...f, type: t, mainCategory: t === 'income' ? 'Income' : t === 'transfer' ? 'Transfer' : 'Food' }))}
                    className={`flex-1 py-2 rounded-sm text-sm font-bold capitalize transition-all ${
                      txForm.type === t
                        ? t === 'expense' ? 'bg-rose-600 text-white shadow-sm'
                          : t === 'income' ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {t === 'expense' ? '↓ Expense' : t === 'income' ? '↑ Income' : '⇄ Transfer'}
                  </button>
                ))}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={txForm.amount}
                    onChange={e => setTxForm(f => ({ ...f, amount: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-sm pl-8 pr-4 py-3 text-2xl font-black text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Date + Payee */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={txForm.date}
                    onChange={e => setTxForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">
                    {txForm.type === 'income' ? 'Received From' : 'Paid To / Payee'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Swiggy, Salary"
                    value={txForm.payee}
                    onChange={e => setTxForm(f => ({ ...f, payee: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Category */}
              {txForm.type !== 'transfer' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Category</label>
                    <select
                      value={txForm.mainCategory}
                      onChange={e => setTxForm(f => ({ ...f, mainCategory: e.target.value, subCategory: '' }))}
                      className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                    >
                      {txCats.map(c => (
                        <option key={c} value={c}>{CATEGORIES[c]?.emoji} {c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Sub-category</label>
                    <select
                      value={txForm.subCategory}
                      onChange={e => setTxForm(f => ({ ...f, subCategory: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                    >
                      <option value="">None</option>
                      {(CATEGORIES[txForm.mainCategory]?.subs || []).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Account */}
              {accounts.length > 0 && (
                <div className={`grid gap-3 ${txForm.type === 'transfer' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">
                      {txForm.type === 'transfer' ? 'From Account' : 'Account'}
                    </label>
                    <select
                      value={txForm.accountId}
                      onChange={e => setTxForm(f => ({ ...f, accountId: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                    >
                      <option value="">No account</option>
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.name} ({fmt(a.balance)})</option>)}
                    </select>
                  </div>
                  {txForm.type === 'transfer' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">To Account</label>
                      <select
                        value={txForm.toAccountId}
                        onChange={e => setTxForm(f => ({ ...f, toAccountId: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                      >
                        <option value="">Select…</option>
                        {accounts.filter(a => a.id !== txForm.accountId).map(a => (
                          <option key={a.id} value={a.id}>{a.name} ({fmt(a.balance)})</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Note */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Note</label>
                <input
                  type="text"
                  placeholder="Optional note…"
                  value={txForm.note}
                  onChange={e => setTxForm(f => ({ ...f, note: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Tag size={10} /> Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add tag…"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 bg-white border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
                  />
                  <button onClick={addTag} className="px-3 py-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-sm text-sm text-gray-700 font-medium transition-colors shadow-sm">+</button>
                </div>
                {txForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {txForm.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs rounded-sm font-medium">
                        {tag}
                        <button onClick={() => setTxForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))} className="hover:text-indigo-900">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {txError && (
                <div className="flex items-center gap-2 p-3 rounded-sm bg-red-50 border border-red-200 text-red-600 text-sm">
                  <AlertCircle size={14} /> {txError}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => { setShowTxModal(false); setTxForm(emptyTx); setTxError('') }}
                className="flex-1 py-2.5 rounded-sm bg-white border border-gray-300 hover:bg-gray-50 text-sm font-bold text-gray-700 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveTx}
                disabled={txSaving}
                className={`flex-1 py-2.5 rounded-sm text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm ${
                  txForm.type === 'expense' ? 'bg-rose-600 hover:bg-rose-700' :
                  txForm.type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' :
                  'bg-blue-600 hover:bg-blue-700'
                } text-white disabled:opacity-50`}
              >
                {txSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {txSaving ? 'Saving…' : 'Save Transaction'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ ADD ACCOUNT MODAL ════════════ */}
      {showAccModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-sm shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">New Account</h2>
              <button onClick={() => setShowAccModal(false)} className="p-2 hover:bg-gray-200 rounded-sm text-gray-500 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Account Name</label>
                <input
                  type="text"
                  placeholder="e.g. HDFC Savings, SBI Card"
                  value={accForm.name}
                  onChange={e => setAccForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['bank','card','cash','wallet'] as AccountType[]).map(t => {
                    const Icon = ACCOUNT_TYPE_META[t].icon
                    return (
                      <button
                        key={t}
                        onClick={() => setAccForm(f => ({ ...f, type: t }))}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-sm text-xs font-semibold capitalize transition-colors border shadow-sm ${
                          accForm.type === t ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={16} />
                        {ACCOUNT_TYPE_META[t].label.split('/')[0].split(' ')[0]}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Opening Balance */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Opening Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={accForm.balance}
                    onChange={e => setAccForm(f => ({ ...f, balance: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-sm pl-8 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1 font-medium">Use negative for credit card outstanding</p>
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {ACCOUNT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAccForm(f => ({ ...f, color: c }))}
                      className={`w-8 h-8 rounded-full transition-all ${accForm.color === c ? 'scale-125 ring-2 ring-indigo-500 ring-offset-2' : 'hover:scale-110'}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowAccModal(false)}
                className="flex-1 py-2.5 rounded-sm bg-white border border-gray-300 hover:bg-gray-50 text-sm font-bold text-gray-700 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveAcc}
                disabled={accSaving || !accForm.name}
                className="flex-1 py-2.5 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {accSaving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}