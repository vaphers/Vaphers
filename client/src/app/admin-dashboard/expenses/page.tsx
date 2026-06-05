"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Plus, X, Wallet, CreditCard, Banknote, ArrowLeftRight, Search, SlidersHorizontal,
  Trash2, Tag, AlertCircle, Check, Loader2, Send, ChevronRight, RefreshCw, 
  Utensils, Bus, ShoppingBag, HeartPulse, FileText, Clapperboard, 
  GraduationCap, Plane, TrendingUp, Coins, Package, BarChart3, Settings
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

const CATEGORIES: Record<string, { icon: any; color: string; subs: string[] }> = {
  Food: { icon: Utensils, color: '#f97316', subs: ['Lunch', 'Restaurant', 'Café', 'Delivery', 'Snacks'] },
  Transport: { icon: Bus, color: '#2383e2', subs: ['Rapido', 'Metro', 'Bus', 'Auto', 'Train'] },
  Shopping: { icon: ShoppingBag, color: '#a855f7', subs: ['Clothes', 'Electronics', 'Books', 'Home', 'Beauty'] },
  Health: { icon: HeartPulse, color: '#22c55e', subs: ['Medicine', 'Doctor', 'Gym', 'Lab Tests', 'Insurance'] },
  Bills: { icon: FileText, color: '#ef4444', subs: ['Electricity', 'Internet', 'Mobile', 'Water', 'Gas', 'Rent', 'EMI'] },
  Entertainment: { icon: Clapperboard, color: '#ec4899', subs: ['Streaming', 'Movies', 'Games', 'Events', 'Sports'] },
  Education: { icon: GraduationCap, color: '#06b6d4', subs: ['Course', 'Books', 'Stationery', 'Tuition'] },
  // Travel: { icon: Plane, color: '#f59e0b', subs: ['Hotel', 'Flight', 'Activities', 'Food', 'Transport'] },
  Investment: { icon: TrendingUp, color: '#10b981', subs: ['Stocks', 'Mutual Funds', 'FD', 'Crypto', 'Gold'] },
  Income: { icon: Coins, color: '#84cc16', subs: ['Salary', 'Freelance', 'Gift', 'Refund', 'Dividend', 'Rental', 'Other'] },
  Transfer: { icon: ArrowLeftRight, color: '#2383e2', subs: ['Between Accounts'] },
  Other: { icon: Package, color: '#64748b', subs: ['Miscellaneous'] },
}

const ACCOUNT_TYPE_META: Record<AccountType, { icon: any; label: string }> = {
  bank: { icon: Banknote, label: 'Bank Account' },
  card: { icon: CreditCard, label: 'Credit Card' },
  cash: { icon: Coins, label: 'Cash' },
  wallet: { icon: Wallet, label: 'Digital Wallet' },
}

const ACCOUNT_COLORS = [
  '#2383e2', '#0284c7', '#16a34a', '#ea580c', '#e11d48', '#9333ea', '#db2777', '#d97706', '#059669', '#0891b2'
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const fmtDecimal = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n)

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

function TxRow({ tx, accounts, onDelete }: { tx: Transaction; accounts: Account[]; onDelete: () => void }) {
  const cat = CATEGORIES[tx.mainCategory] || CATEGORIES.Other
  const CatIcon = cat.icon
  const srcAcc = accounts.find(a => a.id === tx.accountId)
  const dstAcc = accounts.find(a => a.id === tx.toAccountId)

  return (
    <div className="group flex items-center gap-3 md:gap-4 px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
      <div
        className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
        style={{ background: cat.color + '15', color: cat.color }}
      >
        <CatIcon size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-slate-900 text-xs md:text-sm truncate">
            {tx.payee || tx.subCategory || tx.mainCategory}
          </p>
          {tx.subCategory && tx.payee && (
            <span className="hidden sm:inline text-xs text-slate-400 truncate">· {tx.subCategory}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          {srcAcc && (
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
              {srcAcc.name}
            </span>
          )}
          {tx.type === 'transfer' && dstAcc && (
            <>
              <ArrowLeftRight size={8} className="text-slate-400" />
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                {dstAcc.name}
              </span>
            </>
          )}
          {tx.note && <span className="text-[9px] text-slate-400 truncate max-w-[150px] sm:max-w-xs">{tx.note}</span>}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`font-bold text-xs md:text-sm ${
          tx.type === 'income' ? 'text-emerald-600' :
          tx.type === 'transfer' ? 'text-blue-600' : 'text-rose-600'
        }`}>
          {tx.type === 'income' ? '+' : tx.type === 'transfer' ? '⇄' : '-'}{fmt(tx.amount)}
        </p>
        <p className="text-[9px] text-slate-400 mt-0.5">
          {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 rounded-sm hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all ml-1"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExpensePage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [activeAccount, setActiveAccount] = useState<string | null>(null)
  
  // Chart tooltip tracking
  const [hoveredChartDay, setHoveredChartDay] = useState<number | null>(null)

  // Modals
  const [showTxModal, setShowTxModal] = useState(false)
  const [showAccModal, setShowAccModal] = useState(false)
  const [showBudgetModal, setShowBudgetModal] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<TxType | 'all'>('all')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [filterMonth, setFilterMonth] = useState<string>(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [showFilters, setShowFilters] = useState(false)

  // New transaction form
  const emptyTx = {
    type: 'expense' as TxType,
    amount: '',
    mainCategory: 'Food',
    subCategory: '',
    date: new Date().toISOString().slice(0, 10),
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

  // Budget management state
  const [budgetEditorValues, setBudgetEditorValues] = useState<Record<string, string>>({})
  const [budgetSaving, setBudgetSaving] = useState(false)

  // ── Load data ──────────────────────────────────────────────────────────────
  const loadAll = async () => {
    setLoading(true)
    try {
      const [txRes, accRes, budgetRes] = await Promise.all([
        fetch('/api/transactions').then(r => r.json()),
        fetch('/api/transactions?resource=accounts').then(r => r.json()),
        fetch('/api/transactions?resource=budgets').then(r => r.json()),
      ])
      
      setTransactions(Array.isArray(txRes) ? txRes : [])
      setAccounts(Array.isArray(accRes) ? accRes : [])

      const bMap: Record<string, number> = {}
      if (Array.isArray(budgetRes)) {
        budgetRes.forEach((b: any) => {
          bMap[b.category] = b.limit
        })
      }
      setBudgets(bMap)
      
      // Sync budget state
      const initialBudgetForm: Record<string, string> = {}
      Object.keys(CATEGORIES).forEach(cat => {
        if (cat !== 'Income' && cat !== 'Transfer') {
          initialBudgetForm[cat] = String(bMap[cat] || '')
        }
      })
      setBudgetEditorValues(initialBudgetForm)

    } catch { /* silent */ }
    setLoading(false)
  }

  useEffect(() => {
    loadAll()
  }, [])

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

  const totalAssets = useMemo(() => 
    accounts.reduce((s, a) => s + (a.balance > 0 ? a.balance : 0), 0), [accounts])

  const totalBudgetLimit = useMemo(() => {
    return Object.values(budgets).reduce((sum, lim) => sum + lim, 0)
  }, [budgets])

  const categorySpending = useMemo(() => {
    const map: Record<string, number> = {}
    filteredTxs.filter(t => t.type === 'expense').forEach(t => {
      map[t.mainCategory] = (map[t.mainCategory] || 0) + t.amount
    })
    return map
  }, [filteredTxs])

  // Dual Curve Line Chart Data Calculation
  const chartData = useMemo(() => {
    const getPrevMonth = (currMonthStr: string) => {
      const [y, m] = currMonthStr.split('-').map(Number)
      const prevDate = new Date(y, m - 2, 1)
      return `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`
    }

    const prevMonthStr = getPrevMonth(filterMonth)
    const thisMonthDays = new Array(31).fill(0)
    const lastMonthDays = new Array(31).fill(0)

    let sumThis = 0
    let sumLast = 0

    for (let day = 1; day <= 31; day++) {
      const dayStr = String(day).padStart(2, '0')
      const thisDayPrefix = `${filterMonth}-${dayStr}`
      const lastDayPrefix = `${prevMonthStr}-${dayStr}`

      const daySpendThis = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(thisDayPrefix))
        .reduce((sum, t) => sum + t.amount, 0)

      const daySpendLast = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(lastDayPrefix))
        .reduce((sum, t) => sum + t.amount, 0)

      sumThis += daySpendThis
      sumLast += daySpendLast

      thisMonthDays[day - 1] = sumThis
      lastMonthDays[day - 1] = sumLast
    }

    return { thisMonthDays, lastMonthDays }
  }, [transactions, filterMonth])

  const netWorth = accounts.reduce((s, a) => s + a.balance, 0)

  const accountsDistribution = useMemo(() => {
    const activeTotal = accounts.filter(a => a.balance > 0).reduce((sum, a) => sum + a.balance, 0) || 1
    return accounts.map(acc => ({
      ...acc,
      percent: acc.balance > 0 ? Math.round((acc.balance / activeTotal) * 100) : 0
    })).sort((a, b) => b.balance - a.balance)
  }, [accounts])

  const grouped = useMemo(() => groupByDate(filteredTxs), [filteredTxs])

  // ── Handlers ───────────────────────────────────────────────────────────────
  const saveTx = async () => {
    if (!txForm.amount || !txForm.date) { setTxError('Amount and date are required'); return }
    if (txForm.type === 'transfer' && !txForm.toAccountId) { setTxError('Select destination account'); return }
    setTxSaving(true); setTxError('')
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...txForm,
          amount: Number(txForm.amount),
          mainCategory: txForm.type === 'transfer' ? 'Transfer' : txForm.type === 'income' ? 'Income' : txForm.mainCategory,
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
      await fetch('/api/transactions?resource=accounts', {
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

  const saveBudgets = async () => {
    setBudgetSaving(true)
    try {
      const promises = Object.entries(budgetEditorValues).map(([category, value]) => {
        return fetch('/api/transactions?resource=budgets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, limit: Number(value) || 0 }),
        })
      })
      await Promise.all(promises)
      setShowBudgetModal(false)
      await loadAll()
    } catch {}
    setBudgetSaving(false)
  }

  const deleteTx = async (id: string) => {
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' })
    await loadAll()
  }

  const addTag = () => {
    if (tagInput.trim() && !txForm.tags.includes(tagInput.trim())) {
      setTxForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const txCats = txForm.type === 'income' ? ['Income'] : txForm.type === 'transfer' ? ['Transfer'] : Object.keys(CATEGORIES).filter(c => c !== 'Income' && c !== 'Transfer')

  const totalBudgetSpent = Object.keys(budgets).reduce((sum, cat) => sum + (categorySpending[cat] || 0), 0)
  const overallBudgetPercent = totalBudgetLimit > 0 ? Math.min((totalBudgetSpent / totalBudgetLimit) * 100, 100) : 0

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-12">

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 hidden md:block">

          <div>
            <h1 className="text-3xl tracking-tight text-slate-900 leading-none bungee-shade">V<span className="text-[#1125fd] text-2xl">aphers</span> </h1>
          </div>
        </div>
        
        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="relative">
            <input
              type="month"
              value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
              className="text-[11px] font-bold bg-slate-100 border-0 rounded-sm px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
            />
          </div>

          <button onClick={loadAll} className="p-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
            <RefreshCw size={13} />
          </button>
          
          <button
            onClick={() => setShowBudgetModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
          >
            <Settings size={12} /> <span className="hidden sm:inline">Budgets</span>
          </button>

          <button
            onClick={() => { setShowAccModal(true) }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#2383e2]/10 hover:bg-[#2383e2]/20 text-[#2383e2] text-[11px] font-bold transition-colors"
          >
            <Plus size={12} /> <span className="hidden sm:inline">Account</span>
          </button>

          <button
            onClick={() => {
              setTxForm({ ...emptyTx, type: 'expense' })
              setShowTxModal(true)
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-[11px] font-bold transition-colors shadow-sm"
          >
            <Plus size={12} /> Record
          </button>
        </div>
      </header>

      <div className="px-3 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6 max-w-7xl mx-auto">

        {/* ── Portfolio Balance & Budget Tracking Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

          {/* Column A: Balance Ledger overview */}
          <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Balance</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  + {fmtDecimal(totalIncome)} incoming
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
                {fmtDecimal(netWorth)}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                {fmt(totalAssets)} Total Assets · {fmt(totalAssets - netWorth)} Current Liability
              </p>

              {/* Accounts breakdown layout */}
              <div className="mt-4 md:mt-6 space-y-3">
                {accountsDistribution.slice(0, 4).map(acc => (
                  <div key={acc.id} className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: acc.color }} />
                        <span className="font-semibold text-slate-700 truncate">{acc.name}</span>
                        <span className="text-slate-400">{acc.percent}%</span>
                      </div>
                      <span className="font-bold text-slate-900 flex-shrink-0">{fmt(acc.balance)}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all duration-500"
                        style={{ width: `${acc.percent}%`, backgroundColor: acc.color }}
                      />
                    </div>
                  </div>
                ))}
                {accounts.length === 0 && (
                  <div className="text-center py-4 text-xs text-slate-400">
                    No active accounts found. Setup cash reserves to get started.
                  </div>
                )}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="grid grid-cols-2 gap-2 mt-6">
              <button
                onClick={() => {
                  setTxForm({ ...emptyTx, type: 'transfer' })
                  setShowTxModal(true)
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-sm border border-slate-200 hover:bg-slate-50 font-bold text-[11px] text-slate-700 transition-colors cursor-pointer"
              >
                <Send size={12} className="text-slate-400" /> Send Transfer
              </button>
              <button
                onClick={() => {
                  setTxForm({ ...emptyTx, type: 'expense' })
                  setShowTxModal(true)
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-sm bg-[#2282e3] hover:bg-[#1a6bc2] font-bold text-[11px] text-white transition-all shadow-sm cursor-pointer"
              >
                <Plus size={12} /> Record Spend
              </button>
            </div>
          </div>

          {/* Column B: Live Budget Tracker */}
          <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Budget Tracker</span>
                  <p className="text-[9px] text-slate-400 mt-0.5">Live budget across targets</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">{fmt(totalBudgetSpent)}</span>
                  <span className="text-[11px] text-slate-400 font-normal"> / {fmt(totalBudgetLimit)} spent</span>
                </div>
              </div>

              {/* Step Graded Segment Progress Bar Indicator */}
              <div className="flex gap-0.5 h-4 rounded-sm overflow-hidden bg-slate-100 my-3">
                {Array.from({ length: 45 }).map((_, idx) => {
                  const barValue = (idx / 45) * 100
                  const isActive = barValue <= overallBudgetPercent
                  
                  let bgStyle = 'bg-slate-200'
                  if (isActive) {
                    if (barValue < 33) bgStyle = 'bg-gradient-to-r from-orange-500 to-amber-500'
                    else if (barValue < 66) bgStyle = 'bg-gradient-to-r from-pink-500 to-rose-500'
                    else bgStyle = 'bg-gradient-to-r from-[#2383e2] to-indigo-500'
                  }

                  return (
                    <div
                      key={idx}
                      className={`flex-1 h-full rounded-sm transition-all duration-300 ${bgStyle}`}
                    />
                  )
                })}
              </div>

              {/* Budget Limit Items List */}
              <div className="space-y-3 mt-4 max-h-[140px] overflow-y-auto pr-1">
                {Object.keys(budgets).map(catName => {
                  const spent = categorySpending[catName] || 0
                  const limit = budgets[catName] || 0
                  const ratio = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0
                  const catMeta = CATEGORIES[catName] || CATEGORIES.Other
                  const CatIcon = catMeta.icon

                  return (
                    <div key={catName} className="flex items-center justify-between gap-3 text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0"
                          style={{ background: catMeta.color + '15', color: catMeta.color }}
                        >
                          <CatIcon size={12} />
                        </div>
                        <span className="font-bold text-slate-700 truncate">{catName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-slate-400">
                          {fmt(spent)} <span className="text-[10px]">/ {fmt(limit)}</span>
                        </span>
                        <span className={`font-bold px-1 py-0.5 rounded-sm text-[10px] ${
                          ratio >= 90 ? 'text-rose-600 bg-rose-50' : 'text-slate-600 bg-slate-100'
                        }`}>
                          {ratio.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
                {Object.keys(budgets).length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-[11px] text-slate-400 mb-2">No categories configured yet.</p>
                    <button
                      onClick={() => setShowBudgetModal(true)}
                      className="text-xs text-[#2383e2] font-semibold hover:underline"
                    >
                      Configure Target Limits
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center text-[10px]">
              <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">Configure target limits to regulate spending.</span>
              <button
                onClick={() => setShowBudgetModal(true)}
                className="font-bold text-[#2383e2] hover:text-[#1c6ebf] flex items-center gap-0.5 flex-shrink-0"
              >
                Edit Targets <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Dynamic Visual Spending Trend Chart Card ── */}
        <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cumulative Spending</span>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Dual-curve timeline trend comparison</p>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="flex items-center gap-1 font-bold text-[#2383e2]">
                <span className="w-2 h-2 rounded-sm bg-[#2383e2] inline-block" /> This Month
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-400">
                <span className="w-2 h-2 rounded-sm bg-slate-300 inline-block" /> Last Month
              </span>
            </div>
          </div>

          {/* Custom SVG Trend Chart with Viewbox Aspect scaling */}
          <div className="relative mt-2 h-36 sm:h-44 w-full">
            {(() => {
              const { thisMonthDays, lastMonthDays } = chartData
              const maxVal = Math.max(...thisMonthDays, ...lastMonthDays, 1000)
              const width = 1000
              const height = 180

              const getCoords = (data: number[]) => {
                return data.map((val, idx) => {
                  const x = (idx / 30) * width
                  const y = height - (val / maxVal) * (height - 15)
                  return { x, y, val }
                })
              }

              const coordsThis = getCoords(thisMonthDays)
              const coordsLast = getCoords(lastMonthDays)

              const pathThis = coordsThis.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
              const pathLast = coordsLast.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')

              const areaThis = `${pathThis} L ${width} ${height} L 0 ${height} Z`

              return (
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradientThis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2383e2" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#2383e2" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guide Lines */}
                  {Array.from({ length: 4 }).map((_, idx) => {
                    const y = (idx / 3) * (height - 15) + 10
                    return (
                      <line
                        key={idx}
                        x1="0"
                        y1={y}
                        x2={width}
                        y2={y}
                        stroke="#f1f5f9"
                        strokeWidth="1"
                        strokeDasharray="4"
                      />
                    )
                  })}

                  {/* Last Month Dashed Line */}
                  <path
                    d={pathLast}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeDasharray="4"
                    strokeLinecap="square"
                    className="transition-all duration-500"
                  />

                  {/* This Month Shaded Gradient Fill */}
                  <path
                    d={areaThis}
                    fill="url(#gradientThis)"
                    className="transition-all duration-500"
                  />

                  {/* This Month Primary line */}
                  <path
                    d={pathThis}
                    fill="none"
                    stroke="#2383e2"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                    className="transition-all duration-500"
                  />

                  {/* Selected Day Interaction Marker line */}
                  {hoveredChartDay !== null && (
                    <>
                      <line
                        x1={(hoveredChartDay / 30) * width}
                        y1="0"
                        x2={(hoveredChartDay / 30) * width}
                        y2={height}
                        stroke="#2383e2"
                        strokeWidth="1.5"
                        strokeDasharray="2"
                      />
                      <rect
                        x={(hoveredChartDay / 30) * width - 4}
                        y={coordsThis[hoveredChartDay].y - 4}
                        width="8"
                        height="8"
                        fill="#2383e2"
                        stroke="#fff"
                        strokeWidth="2"
                        className="shadow-sm"
                      />
                    </>
                  )}

                  {/* Transparent Interactive Slices */}
                  {coordsThis.map((c, i) => (
                    <rect
                      key={i}
                      x={((i - 0.5) / 30) * width}
                      y="0"
                      width={width / 30}
                      height={height}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredChartDay(i)}
                      onMouseLeave={() => setHoveredChartDay(null)}
                    />
                  ))}
                </svg>
              )
            })()}
          </div>

          {/* Interactive Inspection panel */}
          <div className="flex justify-between items-center text-[10px] md:text-xs mt-3 bg-slate-50 border border-slate-100 px-3 py-2 rounded-sm">
            <span className="text-slate-500 font-medium">
              {hoveredChartDay !== null 
                ? `Day ${hoveredChartDay + 1} Selected` 
                : 'Hover timeline coordinates to inspect specific totals'
              }
            </span>
            {hoveredChartDay !== null && (
              <div className="flex gap-3">
                <span className="text-[#2383e2] font-bold">
                  This Month: {fmt(chartData.thisMonthDays[hoveredChartDay])}
                </span>
                <span className="text-slate-400 font-bold">
                  Last: {fmt(chartData.lastMonthDays[hoveredChartDay])}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Transaction Ledger Section ── */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Filter Bar controls */}
          <div className="p-4 border-b border-slate-100 bg-white space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Ledger History</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Filter and query logs</p>
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search logs..."
                    className="w-full bg-slate-50 border-0 rounded-sm pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-sm border transition-colors ${
                    showFilters 
                      ? 'bg-blue-50 border-[#2383e2]/30 text-[#2383e2]' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal size={13} />
                </button>
              </div>
            </div>

            {/* Filter Drawer */}
            {showFilters && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {(['all', 'income', 'expense', 'transfer'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-2.5 py-1 rounded-sm text-[10px] font-bold capitalize transition-colors ${
                      filterType === t 
                        ? 'bg-[#2383e2] text-white' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
                <div className="w-px bg-slate-200 my-0.5 mx-1" />
                <select
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                  className="bg-slate-50 text-slate-600 border-0 rounded-sm text-[10px] px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                >
                  <option value="all">All Categories</option>
                  {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Record Ledger display list */}
          {loading ? (
            <div className="p-6 space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 bg-slate-100 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : filteredTxs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-white">
              <BarChart3 size={28} className="mx-auto mb-2 opacity-20 text-slate-900" />
              <p className="text-[11px]">No transactions match active filter configurations.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {Array.from(grouped.entries()).map(([date, txs]) => (
                <div key={date}>
                  {/* Ledger Sub-Group Date Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-y border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      Spent: {fmt(txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
                    </span>
                  </div>
                  
                  {/* Rows */}
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">New Transaction</h2>
              <button onClick={() => { setShowTxModal(false); setTxError('') }} className="p-1 hover:bg-slate-200 rounded-sm text-slate-400 transition-colors">
                <X size={14} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Type Switcher */}
              <div className="flex bg-slate-100 rounded-sm p-0.5 gap-0.5">
                {(['expense', 'income', 'transfer'] as TxType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTxForm(f => ({ ...f, type: t, mainCategory: t === 'income' ? 'Income' : t === 'transfer' ? 'Transfer' : 'Food' }))}
                    className={`flex-1 py-1 rounded-sm text-[10px] font-bold capitalize transition-all ${
                      txForm.type === t
                        ? 'bg-[#2383e2] text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Dynamic Amount Input */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-base">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={txForm.amount}
                    onChange={e => setTxForm(f => ({ ...f, amount: e.target.value }))}
                    className="w-full bg-slate-50 border-0 rounded-sm pl-8 pr-3 py-2 text-base font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                  />
                </div>
              </div>

              {/* Date & Payee Forms */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    value={txForm.date}
                    onChange={e => setTxForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full bg-slate-50 border-0 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {txForm.type === 'income' ? 'Received From' : 'Paid To'}
                  </label>
                  <input
                    type="text"
                    placeholder="Entity"
                    value={txForm.payee}
                    onChange={e => setTxForm(f => ({ ...f, payee: e.target.value }))}
                    className="w-full bg-slate-50 border-0 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                  />
                </div>
              </div>

              {/* Category Dropdowns */}
              {txForm.type !== 'transfer' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={txForm.mainCategory}
                      onChange={e => setTxForm(f => ({ ...f, mainCategory: e.target.value, subCategory: '' }))}
                      className="w-full bg-slate-50 border-0 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                    >
                      {txCats.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sub-category</label>
                    <select
                      value={txForm.subCategory}
                      onChange={e => setTxForm(f => ({ ...f, subCategory: e.target.value }))}
                      className="w-full bg-slate-50 border-0 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                    >
                      <option value="">None</option>
                      {(CATEGORIES[txForm.mainCategory]?.subs || []).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Source & Transfer accounts logic */}
              {accounts.length > 0 && (
                <div className={`grid gap-2 ${txForm.type === 'transfer' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {txForm.type === 'transfer' ? 'From Account' : 'Debit Account'}
                    </label>
                    <select
                      value={txForm.accountId}
                      onChange={e => setTxForm(f => ({ ...f, accountId: e.target.value }))}
                      className="w-full bg-slate-50 border-0 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                    >
                      <option value="">Select account...</option>
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.name} ({fmt(a.balance)})</option>)}
                    </select>
                  </div>
                  {txForm.type === 'transfer' && (
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">To Account</label>
                      <select
                        value={txForm.toAccountId}
                        onChange={e => setTxForm(f => ({ ...f, toAccountId: e.target.value }))}
                        className="w-full bg-slate-50 border-0 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                      >
                        <option value="">Select destination...</option>
                        {accounts.filter(a => a.id !== txForm.accountId).map(a => (
                          <option key={a.id} value={a.id}>{a.name} ({fmt(a.balance)})</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Description logs */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Note</label>
                <input
                  type="text"
                  placeholder="Memo description details"
                  value={txForm.note}
                  onChange={e => setTxForm(f => ({ ...f, note: e.target.value }))}
                  className="w-full bg-slate-50 border-0 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                />
              </div>

              {/* Tag system logs */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Tag size={10} /> Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New tag..."
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 bg-slate-50 border-0 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                  />
                  <button onClick={addTag} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-sm text-xs font-bold text-slate-700 transition-colors">+</button>
                </div>
                {txForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {txForm.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-100 text-[9px] rounded-sm font-bold text-[#2383e2]">
                        {tag}
                        <button onClick={() => setTxForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))} className="hover:text-blue-900">
                          <X size={8} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {txError && (
                <div className="flex items-center gap-1.5 p-2 rounded-sm bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-medium">
                  <AlertCircle size={12} /> {txError}
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button
                onClick={() => { setShowTxModal(false); setTxForm(emptyTx); setTxError('') }}
                className="flex-1 py-1.5 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveTx}
                disabled={txSaving}
                className="flex-1 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-[11px] font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {txSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                {txSaving ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ ADD ACCOUNT MODAL ════════════ */}
      {showAccModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">New Portfolio Account</h2>
              <button onClick={() => setShowAccModal(false)} className="p-1 hover:bg-slate-200 rounded-sm text-slate-400 transition-colors">
                <X size={14} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-4">
              {/* Name logs */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Account Name</label>
                <input
                  type="text"
                  placeholder="Savings, Card Name"
                  value={accForm.name}
                  onChange={e => setAccForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-slate-50 border-0 rounded-sm px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                />
              </div>

              {/* Type toggle selection */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Type</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['bank', 'card', 'cash', 'wallet'] as AccountType[]).map(t => {
                    const Icon = ACCOUNT_TYPE_META[t].icon
                    return (
                      <button
                        key={t}
                        onClick={() => setAccForm(f => ({ ...f, type: t }))}
                        className={`flex flex-col items-center gap-1 py-2 rounded-sm text-[9px] font-bold capitalize transition-colors border ${
                          accForm.type === t 
                            ? 'bg-blue-50 border-[#2383e2]/30 text-[#2383e2]' 
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={12} />
                        {ACCOUNT_TYPE_META[t].label.split(' ')[0]}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Initial asset value */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Opening Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={accForm.balance}
                    onChange={e => setAccForm(f => ({ ...f, balance: e.target.value }))}
                    className="w-full bg-slate-50 border-0 rounded-sm pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                  />
                </div>
                <p className="text-[9px] text-slate-400 mt-1 font-medium">Use negative counts for Credit outstanding</p>
              </div>

              {/* Color logs */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Color Code Assignment</label>
                <div className="flex gap-1.5 flex-wrap">
                  {ACCOUNT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAccForm(f => ({ ...f, color: c }))}
                      className={`w-6 h-6 rounded-full transition-all ${accForm.color === c ? 'scale-110 ring-1 ring-[#2383e2] ring-offset-1' : 'hover:scale-105'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button
                onClick={() => setShowAccModal(false)}
                className="flex-1 py-1.5 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAcc}
                disabled={accSaving || !accForm.name}
                className="flex-1 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-[11px] font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {accSaving ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ CONFIGURE BUDGET TARGETS MODAL ════════════ */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Configure Monthly Budgets</h2>
              <button onClick={() => setShowBudgetModal(false)} className="p-1 hover:bg-slate-200 rounded-sm text-slate-400 transition-colors">
                <X size={14} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
              <p className="text-[10px] text-slate-400">Configure parameters to control visual target thresholds.</p>
              
              <div className="space-y-2 pt-2">
                {Object.keys(CATEGORIES).filter(cat => cat !== 'Income' && cat !== 'Transfer').map(cat => {
                  const catMeta = CATEGORIES[cat]
                  const CatIcon = catMeta.icon
                  return (
                    <div key={cat} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-sm flex items-center justify-center text-white"
                          style={{ backgroundColor: catMeta.color }}
                        >
                          <CatIcon size={12} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{cat}</span>
                      </div>
                      <div className="relative w-28 sm:w-32">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">₹</span>
                        <input
                          type="number"
                          placeholder="No Limit"
                          value={budgetEditorValues[cat] || ''}
                          onChange={e => setBudgetEditorValues(prev => ({ ...prev, [cat]: e.target.value }))}
                          className="w-full bg-slate-50 border-0 rounded-sm pl-6 pr-2 py-1 text-xs text-slate-900 font-bold text-right focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 py-1.5 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveBudgets}
                disabled={budgetSaving}
                className="flex-1 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-[11px] font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {budgetSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                {budgetSaving ? 'Saving...' : 'Apply Targets'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}