"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Plus, X, Wallet, CreditCard, Banknote, ArrowLeftRight, Search, SlidersHorizontal,
  Trash2, Tag, AlertCircle, Check, Loader2, Send, ChevronRight, ChevronLeft, RefreshCw, 
  Utensils, Bus, ShoppingBag, HeartPulse, FileText, Clapperboard, PiggyBank,
  GraduationCap, TrendingUp, Coins, Package, BarChart3, Settings, LayoutDashboard, PieChart
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type AccountType = 'bank' | 'card' | 'cash' | 'wallet'
type TxType = 'expense' | 'income' | 'transfer' | 'save' | 'withdraw'

interface Account {
  id: string
  name: string
  type: AccountType
  color: string
  balance: number
  savingsBalance: number
  currency: string
}

interface Transaction {
  id: string
  type: TxType
  amount: number
  mainCategory: string
  subCategory: string
  date: string
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
  Investment: { icon: TrendingUp, color: '#10b981', subs: ['Stocks', 'Mutual Funds', 'FD', 'Crypto', 'Gold'] },
  Income: { icon: Coins, color: '#84cc16', subs: ['Salary', 'Freelance', 'Gift', 'Refund', 'Dividend', 'Rental', 'Other'] },
  Transfer: { icon: ArrowLeftRight, color: '#2383e2', subs: ['Between Accounts'] },
  Savings: { icon: PiggyBank, color: '#10b981', subs: ['Allocation', 'Withdrawal'] },
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

const SBI_LOGO = "https://www.freepnglogos.com/uploads/sbi-logo-png/state-bank-india-kiosk-banking-registration-apply-sbi-3.png"
const BOB_LOGO = "https://images.seeklogo.com/logo-png/19/2/bank-of-baroda-logo-png_seeklogo-195534.png"

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)

const fmtDecimal = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n || 0)

const groupByDate = (txs: Transaction[]) => {
  const map = new Map<string, Transaction[]>()
  txs.forEach(tx => {
    const key = tx.date.slice(0, 10)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(tx)
  })
  return map
}

const getAccountLogo = (name: string, type: string) => {
  const n = name.toLowerCase()
  if (n.includes('sbi')) return <img src={SBI_LOGO} alt="SBI" className="h-8 object-contain bg-white backdrop-blur-sm rounded-sm p-1" />
  if (n.includes('bob') || n.includes('baroda')) return <img src={BOB_LOGO} alt="BOB" className="h-8 object-contain bg-white backdrop-blur-sm rounded-sm p-1" />
  if (type === 'cash') return <Coins size={24} className="text-white opacity-80" />
  return <Banknote size={24} className="text-white opacity-80" />
}

const getPrevMonth = (currMonthStr: string) => {
  const [y, m] = currMonthStr.split('-').map(Number)
  const prevDate = new Date(y, m - 2, 1)
  return `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`
}

const getNextMonth = (currMonthStr: string) => {
  const [y, m] = currMonthStr.split('-').map(Number)
  const nextDate = new Date(y, m, 1)
  return `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TxRow({ tx, accounts, onDelete }: { tx: Transaction; accounts: Account[]; onDelete: () => void }) {
  const isSave = tx.type === 'save'
  const isWithdraw = tx.type === 'withdraw'
  
  const cat = isSave || isWithdraw ? CATEGORIES.Savings : CATEGORIES[tx.mainCategory] || CATEGORIES.Other
  const CatIcon = cat.icon
  const srcAcc = accounts.find(a => a.id === tx.accountId)
  const dstAcc = accounts.find(a => a.id === tx.toAccountId)

  return (
    <div className="flex items-center gap-3 md:gap-4 px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors montserrat-regular">
      <div
        className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
        style={{ background: cat.color + '15', color: cat.color }}
      >
        <CatIcon size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="montserrat-medium text-slate-900 text-xs md:text-sm truncate">
            {isSave ? 'Savings Allocation' : isWithdraw ? 'Savings Withdrawal' : (tx.payee || tx.subCategory || tx.mainCategory)}
          </p>
          {tx.subCategory && tx.payee && !isSave && !isWithdraw && (
            <span className="hidden sm:inline text-xs text-slate-400 truncate">· {tx.subCategory}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          {srcAcc && (
            <span className="text-[9px] montserrat-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
              {srcAcc.name}
            </span>
          )}
          {tx.type === 'transfer' && dstAcc && (
            <>
              <ArrowLeftRight size={8} className="text-slate-400" />
              <span className="text-[9px] montserrat-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                {dstAcc.name}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`montserrat-medium text-xs md:text-sm ${
          tx.type === 'income' || isSave ? 'text-emerald-600' :
          tx.type === 'transfer' || isWithdraw ? 'text-blue-600' : 'text-rose-600'
        }`}>
          {tx.type === 'income' || isSave ? '+' : tx.type === 'transfer' || isWithdraw ? '⇄' : '-'}{fmt(tx.amount)}
        </p>
        <p className="text-[9px] text-slate-400 mt-0.5">
          {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="p-1 rounded-sm bg-red-50 text-red-500 hover:bg-red-100 transition-all ml-1"
        title="Delete Transaction"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExpensePage() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard')
  
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Record<string, number>>({})
  const [activeAccount, setActiveAccount] = useState<string | null>(null)
  
  // Modals
  const [showTxModal, setShowTxModal] = useState(false)
  const [showAccModal, setShowAccModal] = useState(false)
  const [showBudgetModal, setShowBudgetModal] = useState(false)

  // Filters & State
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<TxType | 'all'>('all')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [filterMonth, setFilterMonth] = useState<string>(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [compareMonth, setCompareMonth] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredChartDay, setHoveredChartDay] = useState<number | null>(null)

  // Forms
  const emptyTx = {
    type: 'expense' as TxType,
    amount: '',
    mainCategory: 'Food',
    subCategory: '',
    date: new Date().toISOString().slice(0, 10),
    tags: [] as string[],
    accountId: '',
    toAccountId: '',
    payee: '',
  }
  const [txForm, setTxForm] = useState(emptyTx)
  const [tagInput, setTagInput] = useState('')
  const [txSaving, setTxSaving] = useState(false)
  const [txError, setTxError] = useState('')

  const emptyAcc = { name: '', type: 'bank' as AccountType, color: ACCOUNT_COLORS[0], balance: '', savingsBalance: 0, currency: 'INR' }
  const [accForm, setAccForm] = useState(emptyAcc)
  const [accSaving, setAccSaving] = useState(false)

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
        budgetRes.forEach((b: any) => { bMap[b.category] = b.limit })
      }
      setBudgets(bMap)
      
      const initialBudgetForm: Record<string, string> = {}
      Object.keys(CATEGORIES).forEach(cat => {
        if (cat !== 'Income' && cat !== 'Transfer' && cat !== 'Savings') {
          initialBudgetForm[cat] = String(bMap[cat] || '')
        }
      })
      setBudgetEditorValues(initialBudgetForm)

    } catch { /* silent */ }
    setLoading(false)
    setInitialLoad(false)
  }

  useEffect(() => { loadAll() }, [])

  // ── Derived data ────────────────────────────────────────────────────────────
  const filteredTxs = useMemo(() => {
    return transactions.filter(tx => {
      if (filterType !== 'all' && tx.type !== filterType) return false
      if (filterCat !== 'all' && tx.mainCategory !== filterCat && tx.type !== 'save' && tx.type !== 'withdraw') return false
      if (activeAccount && tx.accountId !== activeAccount && tx.toAccountId !== activeAccount) return false
      if (filterMonth && !tx.date.startsWith(filterMonth)) return false
      if (search) {
        const q = search.toLowerCase()
        if (
          !tx.payee?.toLowerCase().includes(q) &&
          !tx.mainCategory?.toLowerCase().includes(q) &&
          !tx.subCategory?.toLowerCase().includes(q) &&
          !tx.tags?.some(t => t.toLowerCase().includes(q))
        ) return false
      }
      return true
    })
  }, [transactions, filterType, filterCat, activeAccount, filterMonth, search])

  const totalAssets = useMemo(() => accounts.reduce((s, a) => s + (a.balance || 0), 0), [accounts])
  const totalSavings = useMemo(() => accounts.reduce((s, a) => s + (a.savingsBalance || 0), 0), [accounts])
  const availableAssets = totalAssets - totalSavings

  const categorySpending = useMemo(() => {
    const map: Record<string, number> = {}
    filteredTxs.filter(t => t.type === 'expense').forEach(t => {
      map[t.mainCategory] = (map[t.mainCategory] || 0) + t.amount
    })
    return map
  }, [filteredTxs])

  const sortedBudgets = useMemo(() => {
    return Object.keys(budgets).sort((a, b) => (categorySpending[b] || 0) - (categorySpending[a] || 0))
  }, [budgets, categorySpending])

  const totalBudgetLimit = useMemo(() => Object.values(budgets).reduce((sum, lim) => sum + lim, 0), [budgets])
  const totalBudgetSpent = sortedBudgets.reduce((sum, cat) => sum + (categorySpending[cat] || 0), 0)
  const overallBudgetPercent = totalBudgetLimit > 0 ? Math.min((totalBudgetSpent / totalBudgetLimit) * 100, 100) : 0

  // Chart Data calculations
  const chartData = useMemo(() => {
    const defaultLastMonthStr = getPrevMonth(filterMonth)
    const activeCompareMonth = compareMonth || defaultLastMonthStr

    const thisMonthDays = new Array(31).fill(0)
    const compareMonthDays = new Array(31).fill(0)
    
    // Detailed metrics for reports
    const dailyIncome = new Array(31).fill(0)
    const dailyExpense = new Array(31).fill(0)
    const dailyCompareExpense = new Array(31).fill(0)
    const dailySavings = new Array(31).fill(0)

    let sumThis = 0
    let sumCompare = 0
    let accumSavings = 0

    for (let day = 1; day <= 31; day++) {
      const dayStr = String(day).padStart(2, '0')
      const thisDayPrefix = `${filterMonth}-${dayStr}`
      const compDayPrefix = `${activeCompareMonth}-${dayStr}`

      const daySpendThis = transactions.filter(t => t.type === 'expense' && t.date.startsWith(thisDayPrefix)).reduce((sum, t) => sum + t.amount, 0)
      const daySpendComp = transactions.filter(t => t.type === 'expense' && t.date.startsWith(compDayPrefix)).reduce((sum, t) => sum + t.amount, 0)
      
      const dayIncThis = transactions.filter(t => t.type === 'income' && t.date.startsWith(thisDayPrefix)).reduce((sum, t) => sum + t.amount, 0)
      
      const daySave = transactions.filter(t => t.type === 'save' && t.date.startsWith(thisDayPrefix)).reduce((sum, t) => sum + t.amount, 0)
      const dayWith = transactions.filter(t => t.type === 'withdraw' && t.date.startsWith(thisDayPrefix)).reduce((sum, t) => sum + t.amount, 0)

      sumThis += daySpendThis
      sumCompare += daySpendComp
      accumSavings += (daySave - dayWith)

      thisMonthDays[day - 1] = sumThis
      compareMonthDays[day - 1] = sumCompare
      dailyIncome[day - 1] = dayIncThis
      dailyExpense[day - 1] = daySpendThis
      dailyCompareExpense[day - 1] = daySpendComp
      dailySavings[day - 1] = accumSavings > 0 ? accumSavings : 0
    }

    return { thisMonthDays, compareMonthDays, activeCompareMonth, dailyIncome, dailyExpense, dailyCompareExpense, dailySavings }
  }, [transactions, filterMonth, compareMonth])

  // Advanced Report Statistics
  const reportKPIs = useMemo(() => {
    const totalIncome = filteredTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = filteredTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const avgDailySpend = totalExpense / 31

    let maxDaySpend = 0
    let maxDayIdx = 0
    chartData.dailyExpense.forEach((spend, idx) => {
      if (spend > maxDaySpend) {
        maxDaySpend = spend
        maxDayIdx = idx
      }
    })

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

    let maxOverrunAmount = 0
    let worstOverrunCategory = 'None'
    Object.entries(budgets).forEach(([cat, limit]) => {
      const spent = categorySpending[cat] || 0
      if (limit > 0 && spent > limit) {
        const overrun = spent - limit
        if (overrun > maxOverrunAmount) {
          maxOverrunAmount = overrun
          worstOverrunCategory = cat
        }
      }
    })

    return {
      totalIncome,
      totalExpense,
      avgDailySpend,
      maxDaySpend,
      maxDayIdx,
      savingsRate,
      worstOverrunCategory,
      maxOverrunAmount
    }
  }, [filteredTxs, chartData, budgets, categorySpending])

  // Pie Chart Data Calculation
  const subCategoryData = useMemo(() => {
    const map: Record<string, number> = {}
    filteredTxs.filter(t => t.type === 'expense').forEach(t => {
      const key = t.subCategory ? `${t.mainCategory} - ${t.subCategory}` : t.mainCategory
      map[key] = (map[key] || 0) + t.amount
    })
    const arr = Object.entries(map).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount)
    
    // Calculate SVG pie slice coordinates
    const total = arr.reduce((s, i) => s + i.amount, 0)
    let cumulativePercent = 0
    return arr.map(item => {
      const percent = total > 0 ? (item.amount / total) * 100 : 0
      const dashArray = `${percent} ${100 - percent}`
      const dashOffset = 25 - cumulativePercent // Start at top (25 offset)
      cumulativePercent += percent
      return { ...item, dashArray, dashOffset, percent }
    })
  }, [filteredTxs])

  const grouped = useMemo(() => groupByDate(filteredTxs), [filteredTxs])

  // ── Handlers ───────────────────────────────────────────────────────────────
  const saveTx = async () => {
    if (!txForm.amount || !txForm.date) { setTxError('Amount and date are required'); return }
    if (['transfer', 'save', 'withdraw'].includes(txForm.type) && !txForm.accountId) { setTxError('Select primary account'); return }
    if (txForm.type === 'transfer' && !txForm.toAccountId) { setTxError('Select destination account'); return }
    
    setTxSaving(true); setTxError('')
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...txForm,
          amount: Number(txForm.amount),
          mainCategory: txForm.type === 'transfer' ? 'Transfer' : 
                        ['save', 'withdraw'].includes(txForm.type) ? 'Savings' : 
                        txForm.type === 'income' ? 'Income' : txForm.mainCategory,
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
        body: JSON.stringify({ ...accForm, balance: Number(accForm.balance) || 0, savingsBalance: 0 }),
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

  const txCats = txForm.type === 'income' ? ['Income'] : 
                 ['transfer', 'save', 'withdraw'].includes(txForm.type) ? [] : 
                 Object.keys(CATEGORIES).filter(c => c !== 'Income' && c !== 'Transfer' && c !== 'Savings')

  // Initial Full Page Loader
  if (initialLoad) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');` }} />
        <h1 className="text-4xl tracking-tight leading-none text-slate-900" style={{ fontFamily: '"Bungee Shade", cursive' }}>
          V<span className="text-[#1125fd] text-4xl">aphers</span>
        </h1>
        <Loader2 className="animate-spin text-[#1125fd] mt-6" size={28} />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      {/* Global CSS Inject */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        
        .montserrat-regular {
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 400 !important;
        }
        
        .montserrat-medium {
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 500 !important;
        }
      ` }} />

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#1125fd]">aphers</span>
          </h1>
          
          <div className="hidden sm:flex bg-slate-100 rounded-sm p-1 gap-1">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-[#2383e2]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <LayoutDashboard size={13} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('reports')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all ${activeTab === 'reports' ? 'bg-white shadow-sm text-[#2383e2]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <PieChart size={13} /> Reports
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Global Month Selection */}
          <div className="flex items-center bg-slate-100 rounded-sm">
            <button onClick={() => setFilterMonth(getPrevMonth(getNextMonth(filterMonth)))} className="p-1.5 text-slate-500 hover:text-slate-900"><ChevronLeft size={14} /></button>
            <input
              type="month"
              value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
              className="w-28 text-[11px] montserrat-medium bg-transparent border-0 px-1 py-1.5 text-center text-slate-700 focus:outline-none"
            />
            <button onClick={() => setFilterMonth(getNextMonth(filterMonth))} className="p-1.5 text-slate-500 hover:text-slate-900"><ChevronRight size={14} /></button>
          </div>

          <button onClick={loadAll} className="p-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
            <RefreshCw size={14} />
          </button>
          
          <button
            onClick={() => setShowBudgetModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] montserrat-medium transition-colors hidden sm:flex"
          >
            <Settings size={12} /> Budgets
          </button>

          <button
            onClick={() => setShowAccModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#2383e2]/10 hover:bg-[#2383e2]/20 text-[#2383e2] text-[11px] montserrat-medium transition-colors hidden sm:flex"
          >
            <Plus size={12} /> Account
          </button>

          <button
            onClick={() => { setTxForm({ ...emptyTx, type: 'expense' }); setShowTxModal(true) }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-[11px] montserrat-medium transition-colors shadow-sm"
          >
            <Plus size={12} /> Record
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="sm:hidden flex bg-white border-b border-slate-200 p-2 gap-2">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex-1 flex justify-center items-center gap-1.5 px-3 py-2 rounded-sm text-xs montserrat-medium transition-all ${activeTab === 'dashboard' ? 'bg-slate-100 text-[#2383e2]' : 'text-slate-500'}`}
        >
          <LayoutDashboard size={13} /> Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('reports')} 
          className={`flex-1 flex justify-center items-center gap-1.5 px-3 py-2 rounded-sm text-xs montserrat-medium transition-all ${activeTab === 'reports' ? 'bg-slate-100 text-[#2383e2]' : 'text-slate-500'}`}
        >
          <PieChart size={13} /> Reports
        </button>
      </div>

      <div className="w-full px-4 py-4 md:py-6 space-y-4 md:space-y-6 mx-auto">
        
        {/* ════════════ TAB: DASHBOARD ════════════ */}
        {activeTab === 'dashboard' && (
          <>
            {/* Account Colored Cards Array */}
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {accounts.map(acc => (
                <div 
                  key={acc.id} 
                  className="snap-start flex-shrink-0 w-64 h-32 rounded-lg p-4 flex flex-col justify-between shadow-md relative overflow-hidden text-white"
                  style={{ backgroundColor: acc.color }}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Wallet size={64} />
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="montserrat-medium text-sm text-white/90 truncate max-w-[120px]">{acc.name}</h3>
                      <p className="text-[10px] text-white/70 uppercase tracking-widest">{acc.type}</p>
                    </div>
                    {getAccountLogo(acc.name, acc.type)}
                  </div>
                  <div className="relative z-10">
                    <p className="text-2xl montserrat-medium">{fmt(acc.balance)}</p>
                    <div className="flex justify-between mt-1 text-[10px] montserrat-medium text-white/80 border-t border-white/20 pt-1">
                      <span>Avail: {fmt(acc.balance - (acc.savingsBalance || 0))}</span>
                      <span>Saved: {fmt(acc.savingsBalance || 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {accounts.length === 0 && (
                <div className="flex items-center justify-center w-full h-32 bg-white border border-dashed border-slate-300 rounded-lg text-slate-400 text-sm montserrat-medium">
                  Add accounts to view portfolio cards
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Portfolio Ledger Overview */}
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider">Total Portfolio</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setTxForm({ ...emptyTx, type: 'save' }); setShowTxModal(true) }} className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 p-1.5 rounded-sm transition-colors" title="Save Money">
                      <PiggyBank size={14} />
                    </button>
                    <button onClick={() => { setTxForm({ ...emptyTx, type: 'transfer' }); setShowTxModal(true) }} className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded-sm transition-colors" title="Transfer">
                      <Send size={14} />
                    </button>
                  </div>
                </div>
                <h2 className="text-3xl montserrat-medium tracking-tight text-slate-950 mb-1">{fmtDecimal(totalAssets)}</h2>
                <div className="flex gap-4 text-xs montserrat-medium border-b border-slate-100 pb-4">
                  <div className="text-slate-500">Available: <span className="text-slate-900 montserrat-medium">{fmt(availableAssets)}</span></div>
                  <div className="text-emerald-600">Savings: <span className="montserrat-medium">{fmt(totalSavings)}</span></div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button onClick={() => { setTxForm({ ...emptyTx, type: 'expense' }); setShowTxModal(true) }} className="flex-1 py-2 rounded-sm bg-[#2282e3] hover:bg-[#1a6bc2] montserrat-medium text-[11px] text-white shadow-sm flex items-center justify-center gap-1.5">
                    <Plus size={12} /> Log Expense
                  </button>
                </div>
              </div>

              {/* Budget Tracker sorted desc */}
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm lg:col-span-2 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Target Utilization</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs montserrat-medium text-slate-900">{fmt(totalBudgetSpent)}</span>
                    <span className="text-[11px] text-slate-400"> / {fmt(totalBudgetLimit)} spent</span>
                  </div>
                </div>

                <div className="flex gap-0.5 h-3 rounded-sm overflow-hidden bg-slate-100 mb-4">
                  {Array.from({ length: 45 }).map((_, idx) => {
                    const barValue = (idx / 45) * 100
                    const isActive = barValue <= overallBudgetPercent
                    let bgStyle = 'bg-slate-200'
                    if (isActive) {
                      if (barValue < 50) bgStyle = 'bg-emerald-400'
                      else if (barValue < 80) bgStyle = 'bg-amber-400'
                      else bgStyle = 'bg-rose-500'
                    }
                    return <div key={idx} className={`flex-1 h-full rounded-sm transition-all duration-300 ${bgStyle}`} />
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 overflow-y-auto max-h-[140px] pr-1">
                  {sortedBudgets.map(catName => {
                    const spent = categorySpending[catName] || 0
                    const limit = budgets[catName] || 0
                    const ratio = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0
                    const catMeta = CATEGORIES[catName] || CATEGORIES.Other
                    const CatIcon = catMeta.icon

                    return (
                      <div key={catName} className="flex items-center justify-between gap-3 text-[11px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: catMeta.color }}>
                            <CatIcon size={10} />
                          </div>
                          <span className="montserrat-medium text-slate-700 truncate">{catName}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-slate-400">{fmt(spent)} <span className="text-[9px]">/ {fmt(limit)}</span></span>
                          <span className={`montserrat-medium px-1.5 py-0.5 rounded-sm text-[9px] ${ratio >= 90 ? 'text-rose-600 bg-rose-50' : 'text-slate-600 bg-slate-100'}`}>
                            {ratio.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Ledger */}
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 space-y-3">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  <h3 className="text-xs montserrat-medium text-slate-800 uppercase tracking-wider">Transaction Ledger</h3>
                  <div className="flex gap-2">
                    <div className="relative flex-1 md:w-64">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search logs..."
                        className="w-full bg-white border-slate-200 border rounded-sm pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                      />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-sm border transition-colors ${showFilters ? 'bg-blue-50 border-[#2383e2]/30 text-[#2383e2]' : 'bg-white border-slate-200 text-slate-600'}`}>
                      <SlidersHorizontal size={13} />
                    </button>
                  </div>
                </div>
                {showFilters && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    {(['all', 'income', 'expense', 'transfer', 'save', 'withdraw'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`px-2.5 py-1 rounded-sm text-[10px] montserrat-medium capitalize transition-colors ${filterType === t ? 'bg-[#2383e2] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
                      >
                        {t}
                      </button>
                    ))}
                    <div className="w-px bg-slate-200 my-0.5 mx-1" />
                    <select
                      value={filterCat}
                      onChange={e => setFilterCat(e.target.value)}
                      className="bg-white border border-slate-200 text-slate-600 rounded-sm text-[10px] px-2 py-1 focus:outline-none"
                    >
                      <option value="all">All Categories</option>
                      {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {filteredTxs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-white">
                  <BarChart3 size={28} className="mx-auto mb-2 opacity-20 text-slate-900" />
                  <p className="text-[11px]">No transactions found.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {Array.from(grouped.entries()).map(([date, txs]) => (
                    <div key={date}>
                      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 border-y border-slate-200">
                        <span className="text-[9px] montserrat-medium text-slate-500 uppercase tracking-widest">
                          {new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'short' })}
                        </span>
                        <span className="text-[9px] montserrat-medium text-slate-500">
                          Day Spend: {fmt(txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
                        </span>
                      </div>
                      {txs.map(tx => <TxRow key={tx.id} tx={tx} accounts={accounts} onDelete={() => deleteTx(tx.id)} />)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ════════════ TAB: REPORTS ════════════ */}
        {activeTab === 'reports' && (
          <div className="space-y-4 md:space-y-6">
            
            {/* Reports Control Header */}
            <div className="bg-white p-4 rounded-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <PieChart className="text-[#2383e2]" size={20} />
                <div>
                  <h2 className="text-sm montserrat-medium text-slate-900">Analytics & Comparison</h2>
                  <p className="text-[10px] text-slate-500">Visual breakdown of your financial activities</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] montserrat-medium text-slate-500">Compare to:</span>
                <input
                  type="month"
                  value={compareMonth}
                  onChange={e => setCompareMonth(e.target.value)}
                  className="bg-slate-100 border-0 rounded-sm px-2 py-1 text-xs montserrat-medium text-slate-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Reports Key Performance Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Average Daily Spend</span>
                <p className="text-lg mt-1 text-slate-900 montserrat-medium">{fmt(reportKPIs.avgDailySpend)}</p>
                <span className="text-[9px] text-slate-400 block mt-0.5">Based on a 31-day cycle</span>
              </div>
              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Peak Expense Day</span>
                <p className="text-lg mt-1 text-slate-900 montserrat-medium">{fmt(reportKPIs.maxDaySpend)}</p>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  {reportKPIs.maxDaySpend > 0 ? `Day ${reportKPIs.maxDayIdx + 1} of the month` : 'No expenses logged'}
                </span>
              </div>
              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Savings Rate</span>
                <p className={`text-lg mt-1 montserrat-medium ${reportKPIs.savingsRate >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {reportKPIs.savingsRate.toFixed(1)}%
                </p>
                <span className="text-[9px] text-slate-400 block mt-0.5">Net income vs expenses</span>
              </div>
              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Top Budget Overrun</span>
                <p className="text-lg mt-1 text-slate-900 montserrat-medium truncate">
                  {reportKPIs.maxOverrunAmount > 0 ? reportKPIs.worstOverrunCategory : 'None'}
                </p>
                <span className="text-[9px] text-rose-500 block mt-0.5">
                  {reportKPIs.maxOverrunAmount > 0 ? `Exceeded by ${fmt(reportKPIs.maxOverrunAmount)}` : 'All budgets under control'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              
              {/* Cumulative Spending Trend */}
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm col-span-1 lg:col-span-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Cumulative Expense Trend</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[11px]">
                    <span className="flex items-center gap-1 montserrat-medium text-[#2383e2]"><span className="w-2 h-2 rounded-sm bg-[#2383e2]" /> Selected</span>
                    <span className="flex items-center gap-1 montserrat-medium text-slate-400"><span className="w-2 h-2 rounded-sm bg-slate-300" /> Comparison</span>
                  </div>
                </div>

                <div className="relative mt-2 h-48 sm:h-56 w-full">
                  {(() => {
                    const { thisMonthDays, compareMonthDays } = chartData
                    const maxVal = Math.max(...thisMonthDays, ...compareMonthDays, 1000)
                    const width = 1000, height = 200

                    const getCoords = (data: number[]) => data.map((val, idx) => ({ x: (idx / 30) * width, y: height - (val / maxVal) * (height - 15) }))
                    const coordsThis = getCoords(thisMonthDays)
                    const coordsComp = getCoords(compareMonthDays)

                    const pathThis = coordsThis.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
                    const pathComp = coordsComp.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
                    const areaThis = `${pathThis} L ${width} ${height} L 0 ${height} Z`

                    return (
                      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradThis" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2383e2" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#2383e2" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <line key={idx} x1="0" y1={(idx / 3) * (height - 15) + 10} x2={width} y2={(idx / 3) * (height - 15) + 10} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                        ))}
                        <path d={pathComp} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" strokeLinecap="square" />
                        <path d={areaThis} fill="url(#gradThis)" />
                        <path d={pathThis} fill="none" stroke="#2383e2" strokeWidth="2.5" strokeLinecap="square" />
                        
                        {hoveredChartDay !== null && (
                          <>
                            <line x1={(hoveredChartDay / 30) * width} y1="0" x2={(hoveredChartDay / 30) * width} y2={height} stroke="#2383e2" strokeWidth="1.5" strokeDasharray="2" />
                            <rect x={(hoveredChartDay / 30) * width - 4} y={coordsThis[hoveredChartDay].y - 4} width="8" height="8" fill="#2383e2" stroke="#fff" strokeWidth="2" />
                          </>
                        )}
                        {coordsThis.map((c, i) => (
                          <rect key={i} x={((i - 0.5) / 30) * width} y="0" width={width / 30} height={height} fill="transparent" className="cursor-pointer" onMouseEnter={() => setHoveredChartDay(i)} onMouseLeave={() => setHoveredChartDay(null)} />
                        ))}
                      </svg>
                    )
                  })()}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] md:text-xs mt-3 bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-sm gap-2">
                  <span className="text-slate-500 montserrat-medium">{hoveredChartDay !== null ? `Day ${hoveredChartDay + 1} details:` : 'Hover cumulative graph line to view daily parameters'}</span>
                  {hoveredChartDay !== null && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-[11px]">
                      <span className="text-[#2383e2] montserrat-medium">
                        Selected: Cumulative {fmt(chartData.thisMonthDays[hoveredChartDay])} <span className="text-slate-400">(Day: {fmt(chartData.dailyExpense[hoveredChartDay])})</span>
                      </span>
                      <span className="text-slate-400 montserrat-medium">
                        Comparison: Cumulative {fmt(chartData.compareMonthDays[hoveredChartDay])} <span className="text-slate-500">(Day: {fmt(chartData.dailyCompareExpense[hoveredChartDay])})</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expense Distribution Pie Chart */}
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 flex-shrink-0 relative flex justify-center items-center">
                  <svg viewBox="0 0 42 42" className="w-48 h-48 transform -rotate-90">
                    <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#f1f5f9" strokeWidth="6"></circle>
                    {subCategoryData.map((slice, i) => {
                      const catName = slice.name.split(' - ')[0]
                      const color = CATEGORIES[catName]?.color || '#cbd5e1'
                      return (
                        <circle key={i} cx="21" cy="21" r="15.9155" fill="transparent" stroke={color} strokeWidth="6" strokeDasharray={slice.dashArray} strokeDashoffset={slice.dashOffset} className="transition-all duration-500 hover:stroke-[8] cursor-pointer" />
                      )
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] montserrat-medium text-slate-400">Total Spent</span>
                    <span className="text-sm montserrat-medium text-slate-800">{fmt(chartData.thisMonthDays[30])}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-2 max-h-48 overflow-y-auto pr-1">
                  <h3 className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider mb-2">Sub-category Breakdown</h3>
                  {subCategoryData.length === 0 && <p className="text-xs text-slate-400">No expenses logged.</p>}
                  {subCategoryData.map(slice => {
                    const main = slice.name.split(' - ')[0]
                    const color = CATEGORIES[main]?.color || '#cbd5e1'
                    return (
                      <div key={slice.name} className="flex justify-between items-center text-[10px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                          <span className="truncate montserrat-medium text-slate-700">{slice.name}</span>
                        </div>
                        <span className="montserrat-medium flex-shrink-0">{fmt(slice.amount)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Spend vs Income Daily Bar Chart */}
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block mb-4">Daily Spend vs Income</span>
                <div className="h-48 w-full flex items-end gap-1 px-1">
                  {(() => {
                    const { dailyExpense, dailyIncome } = chartData
                    const maxVal = Math.max(...dailyExpense, ...dailyIncome, 100)
                    return dailyExpense.map((exp, i) => {
                      const inc = dailyIncome[i]
                      const expHeight = (exp / maxVal) * 100
                      const incHeight = (inc / maxVal) * 100
                      return (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 group relative">
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] p-1 rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                            Day {i+1} | +{fmt(inc)} | -{fmt(exp)}
                          </div>
                          <div className="w-full bg-emerald-400 rounded-t-sm" style={{ height: `${incHeight}%`, minHeight: inc > 0 ? '2px' : '0' }} />
                          <div className="w-full bg-rose-400 rounded-t-sm" style={{ height: `${expHeight}%`, minHeight: exp > 0 ? '2px' : '0' }} />
                        </div>
                      )
                    })
                  })()}
                </div>
                <div className="flex justify-center gap-4 mt-3 text-[10px] montserrat-medium">
                  <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 bg-emerald-400 rounded-sm" /> Income</span>
                  <span className="flex items-center gap-1 text-rose-500"><span className="w-2 h-2 bg-rose-400 rounded-sm" /> Expense</span>
                </div>
              </div>

              {/* Savings Accumulation Graph */}
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-6 shadow-sm col-span-1 lg:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Savings Accumulation</span>
                    <p className="text-[10px] text-slate-400">Total cumulative savings allocated over the month</p>
                  </div>
                  <PiggyBank size={20} className="text-emerald-500" />
                </div>
                
                <div className="h-32 w-full mt-4">
                  {(() => {
                    const { dailySavings } = chartData
                    const maxVal = Math.max(...dailySavings, 100)
                    const width = 1000, height = 100
                    const coords = dailySavings.map((val, idx) => ({ x: (idx / 30) * width, y: height - (val / maxVal) * (height - 5) }))
                    const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
                    const area = `${path} L ${width} ${height} L 0 ${height} Z`

                    return (
                      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradSavings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={area} fill="url(#gradSavings)" />
                        <path d={path} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  })()}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ════════════ ADD TRANSACTION / SAVINGS MODAL ════════════ */}
      {showTxModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xs montserrat-medium text-slate-800 uppercase tracking-wider">Record Ledger Entry</h2>
              <button onClick={() => { setShowTxModal(false); setTxError('') }} className="p-1 hover:bg-slate-200 rounded-sm text-slate-400 transition-colors"><X size={14} /></button>
            </div>

            <div className="px-4 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Type Switcher */}
              <div className="flex bg-slate-100 rounded-sm p-0.5 gap-0.5 flex-wrap">
                {(['expense', 'income', 'transfer', 'save', 'withdraw'] as TxType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTxForm(f => ({ 
                      ...f, type: t, 
                      mainCategory: t === 'income' ? 'Income' : ['transfer', 'save', 'withdraw'].includes(t) ? 'Other' : 'Food' 
                    }))}
                    className={`flex-1 min-w-[70px] py-1.5 rounded-sm text-[10px] montserrat-medium capitalize transition-all ${txForm.type === t ? 'bg-[#2383e2] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 montserrat-medium text-base">₹</span>
                  <input
                    type="number" placeholder="0" value={txForm.amount}
                    onChange={e => setTxForm(f => ({ ...f, amount: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-8 pr-3 py-2 text-base montserrat-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Date</label>
                  <input type="date" value={txForm.date} onChange={e => setTxForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]" />
                </div>
                {!['save', 'withdraw'].includes(txForm.type) && (
                  <div>
                    <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">
                      {txForm.type === 'income' ? 'Source' : txForm.type === 'transfer' ? 'Reference' : 'Payee'}
                    </label>
                    <input type="text" placeholder="Entity Name" value={txForm.payee} onChange={e => setTxForm(f => ({ ...f, payee: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300" />
                  </div>
                )}
              </div>

              {txForm.type === 'expense' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Category</label>
                    <select value={txForm.mainCategory} onChange={e => setTxForm(f => ({ ...f, mainCategory: e.target.value, subCategory: '' }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]">
                      {txCats.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Sub-category</label>
                    <select value={txForm.subCategory} onChange={e => setTxForm(f => ({ ...f, subCategory: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]">
                      <option value="">None</option>
                      {(CATEGORIES[txForm.mainCategory]?.subs || []).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {accounts.length > 0 && (
                <div className={`grid gap-2 ${txForm.type === 'transfer' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  <div>
                    <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">
                      {txForm.type === 'transfer' ? 'From Account' : txForm.type === 'save' ? 'Allocate From' : txForm.type === 'withdraw' ? 'Withdraw To' : 'Account'}
                    </label>
                    <select value={txForm.accountId} onChange={e => setTxForm(f => ({ ...f, accountId: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]">
                      <option value="">Select account...</option>
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.name} ({fmt(txForm.type === 'withdraw' ? a.savingsBalance : (a.balance - (a.savingsBalance || 0)))})</option>)}
                    </select>
                  </div>
                  {txForm.type === 'transfer' && (
                    <div>
                      <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">To Account</label>
                      <select value={txForm.toAccountId} onChange={e => setTxForm(f => ({ ...f, toAccountId: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]">
                        <option value="">Select destination...</option>
                        {accounts.filter(a => a.id !== txForm.accountId).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Note input removed, only Tags logic kept */}
              <div>
                <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1"><Tag size={10} /> Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text" placeholder="New tag..." value={tagInput}
                    onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300"
                  />
                  <button onClick={addTag} className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-sm text-xs montserrat-medium text-slate-700 transition-colors">+</button>
                </div>
                {txForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {txForm.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-100 text-[9px] rounded-sm montserrat-medium text-[#2383e2]">
                        {tag} <button onClick={() => setTxForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))} className="hover:text-blue-900"><X size={8} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {txError && (
                <div className="flex items-center gap-1.5 p-2 rounded-sm bg-rose-50 border border-rose-100 text-rose-600 text-[10px] montserrat-medium">
                  <AlertCircle size={12} /> {txError}
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button onClick={() => { setShowTxModal(false); setTxForm(emptyTx); setTxError('') }} className="flex-1 py-2 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-[11px] montserrat-medium text-slate-700 transition-colors">Cancel</button>
              <button onClick={saveTx} disabled={txSaving} className="flex-1 py-2 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-[11px] montserrat-medium text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1">
                {txSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ ADD ACCOUNT MODAL ════════════ */}
      {showAccModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xs montserrat-medium text-slate-800 uppercase tracking-wider">New Portfolio Account</h2>
              <button onClick={() => setShowAccModal(false)} className="p-1 hover:bg-slate-200 rounded-sm text-slate-400 transition-colors"><X size={14} /></button>
            </div>

            <div className="px-4 py-4 space-y-4">
              <div>
                <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Account Name</label>
                <input type="text" placeholder="SBI Savings, BOB Account..." value={accForm.name} onChange={e => setAccForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300" />
              </div>
              <div>
                <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Type</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['bank', 'card', 'cash', 'wallet'] as AccountType[]).map(t => {
                    const Icon = ACCOUNT_TYPE_META[t].icon
                    return (
                      <button key={t} onClick={() => setAccForm(f => ({ ...f, type: t }))} className={`flex flex-col items-center gap-1 py-2 rounded-sm text-[9px] montserrat-medium capitalize transition-colors border ${accForm.type === t ? 'bg-blue-50 border-[#2383e2]/30 text-[#2383e2]' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                        <Icon size={12} /> {ACCOUNT_TYPE_META[t].label.split(' ')[0]}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Total Starting Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 montserrat-medium text-xs">₹</span>
                  <input type="number" placeholder="0" value={accForm.balance} onChange={e => setAccForm(f => ({ ...f, balance: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2] placeholder-slate-300" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] montserrat-medium text-slate-400 uppercase tracking-wider mb-1">Card Color Theme</label>
                <div className="flex gap-1.5 flex-wrap">
                  {ACCOUNT_COLORS.map(c => (
                    <button key={c} onClick={() => setAccForm(f => ({ ...f, color: c }))} className={`w-8 h-8 rounded-full transition-all ${accForm.color === c ? 'scale-110 ring-2 ring-[#2383e2] ring-offset-2' : 'hover:scale-105 shadow-sm'}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button onClick={() => setShowAccModal(false)} className="flex-1 py-2 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-[11px] montserrat-medium text-slate-700 transition-colors">Cancel</button>
              <button onClick={saveAcc} disabled={accSaving || !accForm.name} className="flex-1 py-2 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-[11px] montserrat-medium text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1">
                {accSaving ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />} Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ BUDGETS MODAL ════════════ */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-sm border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xs montserrat-medium text-slate-800 uppercase tracking-wider">Target Parameters</h2>
              <button onClick={() => setShowBudgetModal(false)} className="p-1 hover:bg-slate-200 rounded-sm text-slate-400 transition-colors"><X size={14} /></button>
            </div>

            <div className="px-4 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                {Object.keys(CATEGORIES).filter(cat => cat !== 'Income' && cat !== 'Transfer' && cat !== 'Savings').map(cat => {
                  const catMeta = CATEGORIES[cat]
                  const CatIcon = catMeta.icon
                  return (
                    <div key={cat} className="flex items-center justify-between gap-3 p-2 bg-slate-50 rounded-sm border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: catMeta.color }}><CatIcon size={12} /></div>
                        <span className="text-xs montserrat-medium text-slate-700">{cat}</span>
                      </div>
                      <div className="relative w-28 sm:w-32">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 montserrat-medium text-xs">₹</span>
                        <input type="number" placeholder="No Limit" value={budgetEditorValues[cat] || ''} onChange={e => setBudgetEditorValues(prev => ({ ...prev, [cat]: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-sm pl-6 pr-2 py-1 text-xs text-slate-900 montserrat-medium text-right focus:outline-none focus:ring-1 focus:ring-[#2383e2]" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button onClick={() => setShowBudgetModal(false)} className="flex-1 py-2 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-[11px] montserrat-medium text-slate-700 transition-colors">Cancel</button>
              <button onClick={saveBudgets} disabled={budgetSaving} className="flex-1 py-2 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-[11px] montserrat-medium text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1">
                {budgetSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Apply Targets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}