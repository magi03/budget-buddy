import React, { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  Wallet, 
  PieChart, 
  List, 
  Settings, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Globe,
  PiggyBank,
  Edit2,
  Save,
  ArrowRightLeft,
  AlertTriangle,
  DownloadCloud,
  UploadCloud,
  Copy,
  Calendar,
  RefreshCw
} from 'lucide-react';

// --- Default Data & Utilities ---

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Groceries', type: 'expense', limit: 400, color: 'bg-orange-500' },
  { id: '2', name: 'Rent/Mortgage', type: 'expense', limit: 1200, color: 'bg-blue-500' },
  { id: '3', name: 'Entertainment', type: 'expense', limit: 150, color: 'bg-purple-500' },
  { id: '4', name: 'Salary', type: 'income', limit: 0, color: 'bg-green-500' },
  { id: '5', name: 'Freelance', type: 'income', limit: 0, color: 'bg-teal-500' },
  { id: '6', name: 'Transport', type: 'expense', limit: 100, color: 'bg-yellow-500' },
  { id: '7', name: 'Emergency Fund', type: 'savings', limit: 200, color: 'bg-indigo-500' },
];

const COLORS = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
  'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
  'bg-pink-500', 'bg-rose-500'
];

// --- Translations ---

const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    history: 'History',
    analysis: 'Analysis',
    categories: 'Categories',
    addNew: 'Add New',
    monthlyBalance: 'Monthly Balance',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses',
    budgetStatus: 'Budget Status',
    recentActivity: 'Recent Activity',
    allHistory: 'All History',
    addTransaction: 'Add Transaction',
    saveTransaction: 'Save Transaction',
    amount: 'Amount',
    category: 'Category',
    description: 'Description (Optional)',
    expense: 'Expense',
    income: 'Income',
    savings: 'Savings',
    spent: 'Spent',
    saved: 'Saved',
    limit: 'Limit',
    goal: 'Goal',
    left: 'Left',
    overBy: 'Over by',
    manageCategories: 'Manage Categories',
    createNewCategory: 'Create New Category',
    editCategory: 'Edit Category',
    update: 'Update',
    name: 'Name',
    type: 'Type',
    monthlyLimit: 'Monthly Limit',
    monthlyGoal: 'Monthly Goal',
    add: 'Add',
    noRecords: 'No records found.',
    noCategories: 'No categories set up yet.',
    noTransactionsMonth: 'No transactions for this month.',
    yearlyOverview: 'Yearly Overview',
    breakdown: 'Breakdown for',
    unknown: 'Unknown',
    settings: 'Settings',
    home: 'Home',
    totalSavings: 'Total Savings',
    lifetimeStats: 'Lifetime Stats',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    initialSavings: 'Initial Savings',
    setInitial: 'Set Initial Balance',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    withdrewFrom: 'Withdrew from',
    depositedTo: 'Deposited to',
    cannotDelete: 'Cannot delete category with existing transactions.',
    deleteConfirmTitle: 'Delete Item?',
    deleteConfirmMsg: 'Are you sure you want to delete this? This cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    successTx: 'Transaction saved successfully',
    successCat: 'Category added successfully',
    deletedItem: 'Item deleted successfully',
    dataManagement: 'Data Backup & Sync',
    exportData: 'Export Data (Copy)',
    importData: 'Import Data (Restore)',
    pasteData: 'Paste your data code here...',
    restore: 'Restore Data',
    dataCopied: 'Data copied to clipboard! Send it to your other device.',
    dataRestored: 'Data restored successfully!',
    invalidData: 'Invalid data format.',
    exportDesc: 'Copy this code to move your data to another device.',
    importDesc: 'Paste code from another device to overwrite data here.',
    date: 'Date',
    clearAllData: 'Clear All Data',
    clearConfirm: 'Are you sure? This deletes EVERYTHING!',
  },
  bg: {
    dashboard: 'Табло',
    history: 'История',
    analysis: 'Анализ',
    categories: 'Категории',
    addNew: 'Добави',
    monthlyBalance: 'Месечен Баланс',
    monthlyIncome: 'Месечен Приход',
    monthlyExpenses: 'Месечен Разход',
    budgetStatus: 'Бюджетен Статус',
    recentActivity: 'Скорошна Дейност',
    allHistory: 'Цялата История',
    addTransaction: 'Добави Транзакция',
    saveTransaction: 'Запази',
    amount: 'Сума',
    category: 'Категория',
    description: 'Описание (Опция)',
    expense: 'Разход',
    income: 'Приход',
    savings: 'Спестявания',
    spent: 'Изхарчени',
    saved: 'Спестени',
    limit: 'Лимит',
    goal: 'Цел',
    left: 'Остават',
    overBy: 'Над лимита с',
    manageCategories: 'Управление на Категории',
    createNewCategory: 'Създай Нова Категория',
    editCategory: 'Редактиране на Категория',
    update: 'Обнови',
    name: 'Име',
    type: 'Тип',
    monthlyLimit: 'Месечен Лимит',
    monthlyGoal: 'Месечна Цел',
    add: 'Добави',
    noRecords: 'Няма намерени записи.',
    noCategories: 'Няма настроени категории.',
    noTransactionsMonth: 'Няма транзакции за този месец.',
    yearlyOverview: 'Годишен Преглед',
    breakdown: 'Разбивка за',
    unknown: 'Неизвестно',
    settings: 'Настройки',
    home: 'Начало',
    totalSavings: 'Общи Спестявания',
    lifetimeStats: 'Обща Статистика',
    totalIncome: 'Общ Приход',
    totalExpenses: 'Общ Разход',
    initialSavings: 'Начални Спестявания',
    setInitial: 'Задай Начален Баланс',
    deposit: 'Внеси',
    withdraw: 'Изтегли',
    withdrewFrom: 'Изтеглено от',
    depositedTo: 'Внесено в',
    cannotDelete: 'Не може да се изтрие категория с налични транзакции.',
    deleteConfirmTitle: 'Изтриване?',
    deleteConfirmMsg: 'Сигурни ли сте, че искате да изтриете това? Това не може да бъде отменено.',
    cancel: 'Отказ',
    delete: 'Изтрий',
    successTx: 'Транзакцията е запазена успешно',
    successCat: 'Категорията е добавена успешно',
    deletedItem: 'Елементът е изтрит успешно',
    dataManagement: 'Архивиране и Синхронизация',
    exportData: 'Експорт (Копирай)',
    importData: 'Импорт (Възстанови)',
    pasteData: 'Поставете кода тук...',
    restore: 'Възстанови',
    dataCopied: 'Данните са копирани! Изпратете ги на другото устройство.',
    dataRestored: 'Данните са възстановени успешно!',
    invalidData: 'Невалиден формат на данните.',
    exportDesc: 'Копирайте този код, за да прехвърлите данните.',
    importDesc: 'Поставете код от друго устройство, за да презапишете данните.',
    date: 'Дата',
    clearAllData: 'Изчисти Всички Данни',
    clearConfirm: 'Сигурни ли сте? Това изтрива ВСИЧКО!',
  },
  de: {
    dashboard: 'Dashboard',
    history: 'Verlauf',
    analysis: 'Analyse',
    categories: 'Kategorien',
    addNew: 'Neu',
    monthlyBalance: 'Monatssaldo',
    monthlyIncome: 'Monatseinkommen',
    monthlyExpenses: 'Monatsausgaben',
    budgetStatus: 'Budgetstatus',
    recentActivity: 'Letzte Aktivitäten',
    allHistory: 'Gesamter Verlauf',
    addTransaction: 'Transaktion hinzufügen',
    saveTransaction: 'Speichern',
    amount: 'Betrag',
    category: 'Kategorie',
    description: 'Beschreibung (Optional)',
    expense: 'Ausgabe',
    income: 'Einkommen',
    savings: 'Sparen',
    spent: 'Ausgegeben',
    saved: 'Gespart',
    limit: 'Limit',
    goal: 'Ziel',
    left: 'Übrig',
    overBy: 'Drüber um',
    manageCategories: 'Kategorien verwalten',
    createNewCategory: 'Neue Kategorie erstellen',
    editCategory: 'Kategorie bearbeiten',
    update: 'Aktualisieren',
    name: 'Name',
    type: 'Typ',
    monthlyLimit: 'Monatslimit',
    monthlyGoal: 'Monatsziel',
    add: 'Hinzufügen',
    noRecords: 'Keine Einträge gefunden.',
    noCategories: 'Noch keine Kategorien eingerichtet.',
    noTransactionsMonth: 'Keine Transaktionen für diesen Monat.',
    yearlyOverview: 'Jahresübersicht',
    breakdown: 'Aufschlüsselung für',
    unknown: 'Unbekannt',
    settings: 'Einstellungen',
    home: 'Start',
    totalSavings: 'Gesamtsparvermögen',
    lifetimeStats: 'Gesamtstatistik',
    totalIncome: 'Gesamteinkommen',
    totalExpenses: 'Gesamtausgaben',
    initialSavings: 'Anfangsbestand',
    setInitial: 'Anfangsbestand setzen',
    deposit: 'Einzahlen',
    withdraw: 'Abheben',
    withdrewFrom: 'Abgehoben von',
    depositedTo: 'Eingezahlt auf',
    cannotDelete: 'Kategorie mit existierenden Transaktionen kann nicht gelöscht werden.',
    deleteConfirmTitle: 'Löschen?',
    deleteConfirmMsg: 'Sind Sie sicher? Dies kann nicht rückgängig gemacht werden.',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    successTx: 'Transaktion erfolgreich gespeichert',
    successCat: 'Kategorie erfolgreich hinzugefügt',
    deletedItem: 'Element erfolgreich gelöscht',
    dataManagement: 'Datensicherung & Sync',
    exportData: 'Daten exportieren (Kopieren)',
    importData: 'Daten importieren (Wiederherstellen)',
    pasteData: 'Fügen Sie hier Ihren Datencode ein...',
    restore: 'Wiederherstellen',
    dataCopied: 'Daten kopiert! Senden Sie sie an Ihr anderes Gerät.',
    dataRestored: 'Daten erfolgreich wiederhergestellt!',
    invalidData: 'Ungültiges Datenformat.',
    exportDesc: 'Kopieren Sie diesen Code, um Daten zu übertragen.',
    importDesc: 'Code hier einfügen, um Daten zu überschreiben.',
    date: 'Datum',
    clearAllData: 'Alle Daten löschen',
    clearConfirm: 'Sind Sie sicher? Dies löscht ALLES!',
  },
  it: {
    dashboard: 'Dashboard',
    history: 'Cronologia',
    analysis: 'Analisi',
    categories: 'Categorie',
    addNew: 'Aggiungi',
    monthlyBalance: 'Saldo Mensile',
    monthlyIncome: 'Entrate Mensili',
    monthlyExpenses: 'Uscite Mensili',
    budgetStatus: 'Stato Budget',
    recentActivity: 'Attività Recente',
    allHistory: 'Tutta la Cronologia',
    addTransaction: 'Aggiungi Transazione',
    saveTransaction: 'Salva Transazione',
    amount: 'Importo',
    category: 'Categoria',
    description: 'Descrizione (Opzionale)',
    expense: 'Spesa',
    income: 'Entrata',
    savings: 'Risparmi',
    spent: 'Speso',
    saved: 'Salvato',
    limit: 'Limite',
    goal: 'Obiettivo',
    left: 'Rimanente',
    overBy: 'Oltre di',
    manageCategories: 'Gestisci Categorie',
    createNewCategory: 'Crea Nuova Categoria',
    editCategory: 'Modifica Categoria',
    update: 'Aggiorna',
    name: 'Nome',
    type: 'Tipo',
    monthlyLimit: 'Limite Mensile',
    monthlyGoal: 'Obiettivo Mensile',
    add: 'Aggiungi',
    noRecords: 'Nessun record trovato.',
    noCategories: 'Nessuna categoria impostata.',
    noTransactionsMonth: 'Nessuna transazione per questo mese.',
    yearlyOverview: 'Panoramica Annuale',
    breakdown: 'Dettaglio per',
    unknown: 'Sconosciuto',
    settings: 'Impostazioni',
    home: 'Home',
    totalSavings: 'Risparmi Totali',
    lifetimeStats: 'Statistiche Totali',
    totalIncome: 'Entrate Totali',
    totalExpenses: 'Uscite Totali',
    initialSavings: 'Risparmio Iniziale',
    setInitial: 'Imposta Saldo Iniziale',
    deposit: 'Deposita',
    withdraw: 'Preleva',
    withdrewFrom: 'Prelevato da',
    depositedTo: 'Depositato su',
    cannotDelete: 'Impossibile eliminare categoria con transazioni esistenti.',
    deleteConfirmTitle: 'Eliminare?',
    deleteConfirmMsg: 'Sei sicuro di voler eliminare? Non può essere annullato.',
    cancel: 'Annulla',
    delete: 'Elimina',
    successTx: 'Transazione salvata con successo',
    successCat: 'Categoria aggiunta con successo',
    deletedItem: 'Elemento eliminato con successo',
    dataManagement: 'Backup e Sincronizzazione',
    exportData: 'Esporta Dati (Copia)',
    importData: 'Importa Dati (Ripristina)',
    pasteData: 'Incolla qui il codice dati...',
    restore: 'Ripristina',
    dataCopied: 'Dati copiati! Inviali all\'altro dispositivo.',
    dataRestored: 'Dati ripristinati con successo!',
    invalidData: 'Formato dati non valido.',
    exportDesc: 'Copia questo codice per spostare i dati.',
    importDesc: 'Incolla il codice per sovrascrivere i dati qui.',
    date: 'Data',
    clearAllData: 'Cancella tutti i dati',
    clearConfirm: 'Sei sicuro? Questo cancellerà TUTTO!',
  }
};

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' }
];

const formatCurrency = (amount, locale = 'en-IE') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

const LOCALE_MAP = {
  en: 'en-IE',
  bg: 'bg-BG',
  de: 'de-DE',
  it: 'it-IT'
};

const getMonthName = (date, lang) => {
  return date.toLocaleString(LOCALE_MAP[lang] || 'en-IE', { month: 'long', year: 'numeric' });
};

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-5 ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = 'primary', className = "", type="button" }) => {
  const baseStyles = "px-4 py-3 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 shadow-lg",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 shadow-lg",
    savings: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 shadow-lg",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lang, setLang] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // UI State
  const [notification, setNotification] = useState(null); 
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: null, id: null });
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [isEditingInitial, setIsEditingInitial] = useState(false);
  const [tempInitial, setTempInitial] = useState('');

  const [initialSavings, setInitialSavings] = useState(() => {
    const saved = localStorage.getItem('budget_initial_savings');
    return saved ? parseFloat(saved) : 0;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('budget_transactions');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('budget_categories');
    try {
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch (e) {
      return DEFAULT_CATEGORIES;
    }
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('budget_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budget_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('budget_initial_savings', initialSavings.toString());
  }, [initialSavings]);

  // --- Helper Functions ---
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const initiateDelete = (type, id) => {
    if (type === 'category') {
      const hasTx = transactions.some(t => t.categoryId === id);
      if (hasTx) {
        showNotification('error', t('cannotDelete'));
        return;
      }
    }
    setConfirmModal({ isOpen: true, type, id });
  };

  const performDelete = () => {
    if (confirmModal.type === 'transaction') {
      setTransactions(transactions.filter(t => t.id !== confirmModal.id));
      showNotification('success', t('deletedItem'));
    } else if (confirmModal.type === 'category') {
      setCategories(categories.filter(c => c.id !== confirmModal.id));
      showNotification('success', t('deletedItem'));
    } else if (confirmModal.type === 'clearAll') {
      setTransactions([]);
      setCategories(DEFAULT_CATEGORIES);
      setInitialSavings(0);
      showNotification('success', 'All data cleared');
    }
    setConfirmModal({ isOpen: false, type: null, id: null });
  };

  const updateCategory = (id, newName, newLimit, newType) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, name: newName, limit: parseFloat(newLimit), type: newType } : c
    ));
    setEditingCategory(null);
    showNotification('success', 'Category updated');
  };

  // --- Actions ---
  const saveInitialSavings = () => {
    const val = parseFloat(tempInitial);
    if (!isNaN(val)) {
      setInitialSavings(val);
      setIsEditingInitial(false);
      showNotification('success', t('successTx'));
    }
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const addTransaction = (transaction) => {
    const newTx = { ...transaction, id: Date.now().toString() };
    setTransactions([newTx, ...transactions]);
    setActiveTab('dashboard');
    showNotification('success', t('successTx'));
  };

  const addCategory = (category) => {
    const newCat = { 
      ...category, 
      id: Date.now().toString(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    setCategories([...categories, newCat]);
    showNotification('success', t('successCat'));
  };

  const handleExport = () => {
    const data = { transactions, categories, initialSavings };
    const dataString = JSON.stringify(data);
    navigator.clipboard.writeText(dataString).then(() => {
      showNotification('success', t('dataCopied'));
    });
  };

  const handleImport = (e) => {
    e.preventDefault();
    const input = e.target.elements.importData.value;
    try {
      const data = JSON.parse(input);
      if (data.transactions && data.categories) {
        if(window.confirm('Overwrite current data?')) {
          setTransactions(data.transactions);
          setCategories(data.categories);
          if (data.initialSavings) setInitialSavings(data.initialSavings);
          showNotification('success', t('dataRestored'));
          e.target.reset();
        }
      }
    } catch (err) {
      showNotification('error', t('invalidData'));
    }
  };

  // --- Derived State (Calculations) ---
  
  const globalStats = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savingsTx = 0;
    
    transactions.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      else if (t.type === 'expense') expenses += Number(t.amount);
      else if (t.type === 'savings') savingsTx += Number(t.amount);
    });

    const balance = initialSavings + income - expenses;
    return { income, expenses, balance, savingsTx };
  }, [transactions, initialSavings]);

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === currentDate.getMonth() && 
             tDate.getFullYear() === currentDate.getFullYear();
    });
  }, [transactions, currentDate]);

  const stats = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savings = 0;
    
    monthlyTransactions.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      else if (t.type === 'expense') expenses += Number(t.amount);
      else if (t.type === 'savings') savings += Number(t.amount);
    });

    const balance = income - expenses;
    return { income, expenses, savings, balance };
  }, [monthlyTransactions]);

  const categoryStats = useMemo(() => {
    const stats = {};
    categories.forEach(c => {
      stats[c.id] = { ...c, spent: 0 };
    });

    transactions.forEach(t => {
      if (t.type === 'expense') {
        const tDate = new Date(t.date);
        const isCurrentMonth = tDate.getMonth() === currentDate.getMonth() && 
                               tDate.getFullYear() === currentDate.getFullYear();
        if (isCurrentMonth && stats[t.categoryId]) {
          stats[t.categoryId].spent += Number(t.amount);
        }
      } 
      else if (t.type === 'savings' && stats[t.categoryId]) {
        stats[t.categoryId].spent += Number(t.amount);
      }
    });

    return Object.values(stats).filter(c => c.type === 'expense' || c.type === 'savings');
  }, [transactions, categories, currentDate]);

  const yearlyStats = useMemo(() => {
    const year = currentDate.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(year, i).toLocaleString(LOCALE_MAP[lang] || 'en-IE', { month: 'short' }),
      income: 0,
      expense: 0
    }));

    transactions.forEach(t => {
      const tDate = new Date(t.date);
      if (tDate.getFullYear() === year) {
        if (t.type === 'income') months[tDate.getMonth()].income += Number(t.amount);
        else if (t.type === 'expense') months[tDate.getMonth()].expense += Number(t.amount);
      }
    });

    return months;
  }, [transactions, currentDate, lang]);

  // --- Sub-Components ---

  const NotificationToast = () => {
    if (!notification) return null;
    return (
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in ${notification.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'}`}>
        {notification.type === 'success' ? <CheckCircle size={20} className="text-emerald-400" /> : <AlertCircle size={20} className="text-white" />}
        <span className="font-medium">{notification.message}</span>
      </div>
    );
  };

  const ConfirmationModal = () => {
    if (!confirmModal.isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setConfirmModal({isOpen: false, type: null, id: null})}></div>
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-fade-in">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-red-100 rounded-full text-red-600">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{confirmModal.type === 'clearAll' ? 'Reset App?' : t('deleteConfirmTitle')}</h3>
              <p className="text-slate-500">{confirmModal.type === 'clearAll' ? t('clearConfirm') : t('deleteConfirmMsg')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full mt-2">
              <Button variant="secondary" onClick={() => setConfirmModal({isOpen: false, type: null, id: null})}>
                {t('cancel')}
              </Button>
              <Button variant="danger" onClick={performDelete}>
                {t('delete')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EditCategoryModal = () => {
    if (!editingCategory) return null;
    
    // Local state for the form inside modal
    const [name, setName] = useState(editingCategory.name);
    const [limit, setLimit] = useState(editingCategory.limit);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setEditingCategory(null)}></div>
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800 mb-4">{t('editCategory')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('name')}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg" />
            </div>
            {editingCategory.type !== 'income' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  {editingCategory.type === 'savings' ? t('monthlyGoal') : t('monthlyLimit')}
                </label>
                <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => setEditingCategory(null)}>{t('cancel')}</Button>
              <Button onClick={() => updateCategory(editingCategory.id, name, limit, editingCategory.type)}>{t('update')}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6 pb-24 md:pb-0 animate-fade-in">
      
      {/* GLOBAL SAVINGS CARD */}
      <Card className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <PiggyBank size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="text-yellow-400" size={24} />
              <h2 className="text-yellow-400 font-bold uppercase tracking-wider text-sm">{t('totalSavings')}</h2>
            </div>
            
            <button 
              onClick={() => { 
                setTempInitial(initialSavings.toString()); 
                setIsEditingInitial(true); 
              }}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-xs flex items-center gap-1"
            >
              <Edit2 size={12} /> {t('setInitial')}
            </button>
          </div>

          {isEditingInitial ? (
            <div className="flex items-center gap-2 mb-6 mt-2">
              <input 
                type="number"
                value={tempInitial}
                onChange={(e) => setTempInitial(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-2xl font-bold w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
              <button onClick={saveInitialSavings} className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white">
                <Save size={20} />
              </button>
              <button onClick={() => setIsEditingInitial(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white">
                <X size={20} />
              </button>
            </div>
          ) : (
            <p className="text-4xl md:text-5xl font-bold mb-6 break-all">{formatCurrency(globalStats.balance, LOCALE_MAP[lang])}</p>
          )}
          
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold">{t('totalIncome')}</p>
              <p className="font-semibold text-emerald-400">{formatCurrency(globalStats.income, LOCALE_MAP[lang])}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold">{t('totalExpenses')}</p>
              <p className="font-semibold text-rose-400">{formatCurrency(globalStats.expenses, LOCALE_MAP[lang])}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Month Selector */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <Button variant="ghost" onClick={() => changeMonth(-1)} className="!p-2">
          <ChevronLeft size={24} />
        </Button>
        <h2 className="text-lg font-bold text-slate-800 capitalize">{getMonthName(currentDate, lang)}</h2>
        <Button variant="ghost" onClick={() => changeMonth(1)} className="!p-2">
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Monthly Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-200 text-sm font-medium">{t('monthlyBalance')}</p>
              <h2 className="text-3xl font-bold mt-1">{formatCurrency(stats.balance, LOCALE_MAP[lang])}</h2>
              <p className="text-xs text-blue-200 mt-1 opacity-80">(Cash left to spend)</p>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet size={24} className="text-white" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">{t('monthlyIncome')}</p>
              <p className="text-xl font-bold text-slate-800">{formatCurrency(stats.income, LOCALE_MAP[lang])}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 rounded-full text-rose-600">
              <TrendingDown size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">{t('monthlyExpenses')}</p>
              <p className="text-xl font-bold text-slate-800">{formatCurrency(stats.expenses, LOCALE_MAP[lang])}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Budget Limits / Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <PieChart size={20} /> {t('budgetStatus')}
          </h3>
          {categoryStats.length === 0 ? (
            <div className="text-center p-8 text-slate-400 bg-slate-50 rounded-xl">
              {t('noCategories')}
            </div>
          ) : (
            categoryStats.map(cat => {
              const percentage = cat.limit > 0 ? Math.min((Math.max(0, cat.spent) / cat.limit) * 100, 100) : 0;
              const isSavings = cat.type === 'savings';
              const isOver = cat.spent > cat.limit;
              const remaining = cat.limit - cat.spent;
              
              const barColor = isSavings 
                ? (percentage >= 100 ? 'bg-emerald-500' : cat.color) 
                : (isOver ? 'bg-red-500' : cat.color);

              return (
                <Card key={cat.id} className="py-4">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${cat.color} inline-block`}>
                          {cat.name}
                        </span>
                        {isSavings && <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{t('savings')}</span>}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">
                        {isSavings ? t('saved') : t('spent')}: <span className="font-semibold text-slate-700">{formatCurrency(cat.spent, LOCALE_MAP[lang])}</span>
                        <span className="mx-1">/</span>
                        {isSavings ? t('goal') : t('limit')}: {formatCurrency(cat.limit, LOCALE_MAP[lang])}
                      </div>
                    </div>
                    <div className="text-right">
                      {isSavings ? (
                         <div className={`font-bold ${remaining <= 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                           {remaining <= 0 ? 'Goal Reached!' : `${t('left')}: ${formatCurrency(remaining, LOCALE_MAP[lang])}`}
                         </div>
                      ) : (
                        <div className={`font-bold ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {remaining < 0 ? `${t('overBy')} ` : `${t('left')}: `}
                          {formatCurrency(Math.abs(remaining), LOCALE_MAP[lang])}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Recent Transactions Preview */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <List size={20} /> {t('recentActivity')}
            </h3>
            <button onClick={() => setActiveTab('history')} className="text-sm text-blue-600 font-medium hover:underline">
              {t('allHistory')}
            </button>
          </div>
          <div className="space-y-3">
            {monthlyTransactions.slice(0, 5).map(t => {
              const cat = categories.find(c => c.id === t.categoryId);
              return (
                <div key={t.id} className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-10 rounded-full ${cat?.color || 'bg-gray-300'}`}></div>
                    <div>
                      <p className="font-medium text-slate-800">{t.description || cat?.name || t('unknown')}</p>
                      <p className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString(LOCALE_MAP[lang])}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : t.amount < 0 ? 'text-orange-600' : 'text-slate-800'}`}>
                    {t.type === 'income' ? '+' : ''}{formatCurrency(t.amount, LOCALE_MAP[lang])}
                  </span>
                </div>
              );
            })}
            {monthlyTransactions.length === 0 && (
              <div className="text-center p-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                {t('noTransactionsMonth')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const AnalysisView = () => {
    const maxVal = Math.max(...yearlyStats.map(m => Math.max(m.income, m.expense)), 100);

    return (
      <div className="space-y-8 pb-24 md:pb-0 animate-fade-in">
        {/* Yearly Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xl font-bold text-slate-800">{t('yearlyOverview')} ({currentDate.getFullYear()})</h3>
             <div className="flex gap-4 text-xs font-medium">
               <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> {t('income')}</div>
               <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-800 rounded-sm"></div> {t('expense')}</div>
             </div>
          </div>
          <Card className="overflow-x-auto">
            <div className="h-64 flex items-end gap-2 md:gap-4 min-w-[600px]">
              {yearlyStats.map((month, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex justify-center items-end h-full gap-1 px-1">
                    {/* Income Bar */}
                    <div 
                      className="w-full bg-emerald-500 rounded-t-sm transition-all hover:opacity-80 relative group/bar"
                      style={{ height: `${(month.income / maxVal) * 100}%` }}
                    >
                      {month.income > 0 && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none whitespace-nowrap z-10">
                          {formatCurrency(month.income, LOCALE_MAP[lang])}
                        </span>
                      )}
                    </div>
                    {/* Expense Bar */}
                    <div 
                      className="w-full bg-slate-800 rounded-t-sm transition-all hover:opacity-80 relative group/bar"
                      style={{ height: `${(month.expense / maxVal) * 100}%` }}
                    >
                      {month.expense > 0 && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none whitespace-nowrap z-10">
                          {formatCurrency(month.expense, LOCALE_MAP[lang])}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium capitalize ${month.name === getMonthName(currentDate, lang).substring(0,3) ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                    {month.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Monthly Breakdown */}
        <div>
           <h3 className="text-xl font-bold text-slate-800 mb-4 capitalize">{t('breakdown')} {getMonthName(currentDate, lang)}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {categoryStats.length === 0 ? (
               <div className="col-span-full text-center p-8 text-slate-400 bg-slate-50 rounded-xl">{t('noRecords')}</div>
             ) : (
               categoryStats
                .sort((a, b) => b.spent - a.spent)
                .map(cat => (
                  <Card key={cat.id} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm ${cat.color}`}>
                       {Math.round((Math.max(0, cat.spent) / (stats.expenses + Math.max(0, stats.savings))) * 100)}%
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">{cat.name}</h4>
                        <span className="font-bold text-slate-800">{formatCurrency(cat.spent, LOCALE_MAP[lang])}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full ${cat.color}`} style={{ width: `${(Math.max(0, cat.spent) / (stats.expenses + Math.max(0, stats.savings))) * 100}%` }}></div>
                      </div>
                    </div>
                  </Card>
               ))
             )}
           </div>
        </div>
      </div>
    );
  };

  const AddTransactionView = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('expense');
    const [categoryId, setCategoryId] = useState('');
    const [isWithdrawal, setIsWithdrawal] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!amount || !categoryId) return;
      
      let finalAmount = parseFloat(amount);
      if (type === 'savings' && isWithdrawal) {
        finalAmount = -finalAmount;
      }

      addTransaction({
        amount: finalAmount,
        description,
        type,
        categoryId,
        date: new Date(date).toISOString()
      });
    };

    const filteredCategories = categories.filter(c => c.type === type);

    return (
      <div className="max-w-md mx-auto animate-fade-in pb-24 md:pb-0">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">{t('addTransaction')}</h2>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => { setType('expense'); setCategoryId(''); setIsWithdrawal(false); }}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t('expense')}
              </button>
              <button
                type="button"
                onClick={() => { setType('income'); setCategoryId(''); setIsWithdrawal(false); }}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t('income')}
              </button>
              <button
                type="button"
                onClick={() => { setType('savings'); setCategoryId(''); }}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'savings' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t('savings')}
              </button>
            </div>

            {/* Savings Direction Toggle */}
            {type === 'savings' && (
              <div className="flex bg-slate-100 p-1 rounded-lg">
                 <button
                   type="button"
                   onClick={() => setIsWithdrawal(false)}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isWithdrawal ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500'}`}
                 >
                   {t('deposit')}
                 </button>
                 <button
                   type="button"
                   onClick={() => setIsWithdrawal(true)}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isWithdrawal ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-500'}`}
                 >
                   {t('withdraw')}
                 </button>
              </div>
            )}

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('date')}</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('amount')}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">€</span>
                <input 
                  type="number" 
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 text-3xl font-bold text-slate-800 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('category')}</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                {filteredCategories.map(cat => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategoryId(cat.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${categoryId === cat.id ? `border-${cat.color.replace('bg-', '')} bg-slate-50` : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <div className={`w-full h-1 rounded-full ${cat.color} mb-2`}></div>
                    <span className={`font-medium text-sm ${categoryId === cat.id ? 'text-slate-900' : 'text-slate-600'}`}>{cat.name}</span>
                  </button>
                ))}
                <button 
                  type="button" 
                  onClick={() => setActiveTab('categories')}
                  className="p-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex flex-col items-center justify-center gap-1"
                >
                  <PlusCircle size={20} />
                  <span className="text-xs font-medium">{t('createNewCategory')}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('description')}</label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Vacation Fund"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>

            <Button 
              type="submit" 
              variant={type === 'income' ? 'success' : (type === 'savings' ? 'savings' : 'primary')} 
              className={`w-full py-4 text-lg ${isWithdrawal ? '!bg-orange-500 !hover:bg-orange-600 !shadow-orange-200' : ''}`}
            >
              <CheckCircle size={20} /> {isWithdrawal ? t('withdraw') : t('saveTransaction')}
            </Button>
          </form>
        </Card>
      </div>
    );
  };

  const HistoryView = () => (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-0 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800">{t('allHistory')}</h2>
      <div className="space-y-3">
        {transactions.length === 0 ? (
           <div className="text-center p-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
             <List size={48} className="mx-auto mb-4 opacity-50" />
             <p>{t('noRecords')}</p>
           </div>
        ) : (
          transactions.sort((a,b) => {
             const dateA = new Date(a.date || 0);
             const dateB = new Date(b.date || 0);
             return dateB - dateA;
          }).map(t => {
            const cat = categories.find(c => c.id === t.categoryId);
            
            // Determine sign/color based on type
            let amountClass = 'text-slate-800';
            let prefix = '-';
            let label = t.description || cat?.name;

            if (t.type === 'income') { 
              amountClass = 'text-emerald-600'; 
              prefix = '+'; 
            } else if (t.type === 'savings') { 
              if (t.amount < 0) {
                 amountClass = 'text-orange-500'; 
                 prefix = ''; // Negative already in amount
                 label = `${t('withdrewFrom')} ${cat?.name}`;
              } else {
                 amountClass = 'text-indigo-600'; 
                 prefix = '';
                 label = `${t('depositedTo')} ${cat?.name}`;
              }
            }

            return (
              <Card key={t.id} className="flex justify-between items-center group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm ${cat?.color || 'bg-gray-400'}`}>
                    {cat?.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{label}</h4>
                    <p className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString(LOCALE_MAP[lang])} • {new Date(t.date).toLocaleTimeString(LOCALE_MAP[lang], {hour: '2-digit', minute:'2-digit'})}</p>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{cat?.name}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className={`text-lg font-bold ${amountClass}`}>
                    {prefix}{formatCurrency(t.amount, LOCALE_MAP[lang])}
                  </span>
                  <button 
                    onClick={() => initiateDelete('transaction', t.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  );

  const CategoriesView = () => {
    const [newCatName, setNewCatName] = useState('');
    const [newCatLimit, setNewCatLimit] = useState('');
    const [newCatType, setNewCatType] = useState('expense');

    const handleAdd = (e) => {
      e.preventDefault();
      if (!newCatName) return;
      addCategory({
        name: newCatName,
        limit: parseFloat(newCatLimit) || 0,
        type: newCatType
      });
      setNewCatName('');
      setNewCatLimit('');
    };

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-24 md:pb-0 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800">{t('manageCategories')}</h2>
        
        <Card className="bg-slate-50 border-dashed border-2 border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">{t('createNewCategory')}</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4">
              <label className="text-xs text-slate-400 mb-1 block">{t('name')}</label>
              <input 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Gym"
                className="w-full p-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>
            <div className="md:col-span-3">
               <label className="text-xs text-slate-400 mb-1 block">{t('type')}</label>
               <select 
                value={newCatType} 
                onChange={(e) => setNewCatType(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-sm bg-white"
               >
                 <option value="expense">{t('expense')}</option>
                 <option value="income">{t('income')}</option>
                 <option value="savings">{t('savings')}</option>
               </select>
            </div>
            {newCatType !== 'income' && (
              <div className="md:col-span-3">
                <label className="text-xs text-slate-400 mb-1 block">
                  {newCatType === 'savings' ? t('monthlyGoal') : t('monthlyLimit')}
                </label>
                <input 
                  type="number"
                  value={newCatLimit}
                  onChange={(e) => setNewCatLimit(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>
            )}
            <div className="md:col-span-2">
              <Button type="submit" variant="primary" className="w-full py-2 text-sm">{t('add')}</Button>
            </div>
          </form>
        </Card>

        <div className="my-8 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Settings size={20} /> {t('dataManagement')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-100">
              <div className="flex items-center gap-3 mb-2 text-blue-800 font-bold">
                <DownloadCloud size={20} /> {t('exportData')}
              </div>
              <p className="text-sm text-blue-600 mb-4">{t('exportDesc')}</p>
              <Button onClick={handleExport} variant="primary" className="w-full text-sm bg-blue-600 hover:bg-blue-700">
                <Copy size={16} /> {t('exportData')}
              </Button>
            </Card>

            <Card className="bg-slate-50 border-slate-200">
              <div className="flex items-center gap-3 mb-2 text-slate-800 font-bold">
                <UploadCloud size={20} /> {t('importData')}
              </div>
              <p className="text-sm text-slate-500 mb-4">{t('importDesc')}</p>
              <form onSubmit={handleImport} className="space-y-3">
                <textarea 
                  name="importData"
                  placeholder={t('pasteData')}
                  className="w-full p-3 rounded-lg border border-slate-200 text-xs font-mono h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <Button type="submit" variant="secondary" className="w-full text-sm">
                  <UploadCloud size={16} /> {t('restore')}
                </Button>
              </form>
            </Card>
          </div>

          <div className="mt-8 text-center">
             <button 
                onClick={() => setConfirmModal({isOpen: true, type: 'clearAll'})}
                className="text-red-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg mx-auto transition-colors"
             >
                <RefreshCw size={16} /> {t('clearAllData')}
             </button>
          </div>
        </div>

        <div className="space-y-2">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${cat.color}`}></div>
                <div>
                  <p className="font-bold text-slate-800">{cat.name}</p>
                  <p className="text-xs text-slate-400 capitalize">
                    {cat.type} {(cat.type === 'expense' || cat.type === 'savings') && cat.limit > 0 ? `• ${cat.type === 'savings' ? t('goal') : t('limit')}: ${formatCurrency(cat.limit, LOCALE_MAP[lang])}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {/* FIX: Edit Category Button */}
                <button 
                  onClick={() => setEditingCategory(cat)}
                  className="text-slate-300 hover:text-blue-500 transition-colors p-2"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => initiateDelete('category', cat.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NavIcon = ({ tab, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} />
      <span className="text-[10px] font-medium hidden md:block">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      <NotificationToast />
      <ConfirmationModal />
      <EditCategoryModal /> {/* FIX: Render Edit Modal */}

      {/* Desktop Navigation (Sidebar) / Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <PieChart size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Budget<span className="text-blue-600">Buddy</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Globe size={18} />
                <span className="uppercase">{lang}</span>
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)}></div>
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-20 w-48 animate-fade-in">
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 hover:bg-slate-50 ${lang === l.code ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-600'}`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t('dashboard')}
              </button>
              <button 
                onClick={() => setActiveTab('analysis')} 
                className={`text-sm font-medium transition-colors ${activeTab === 'analysis' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t('analysis')}
              </button>
              <button 
                onClick={() => setActiveTab('history')} 
                className={`text-sm font-medium transition-colors ${activeTab === 'history' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t('history')}
              </button>
               <button 
                onClick={() => setActiveTab('categories')} 
                className={`text-sm font-medium transition-colors ${activeTab === 'categories' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t('categories')}
              </button>
              <Button onClick={() => setActiveTab('add')} variant="primary" className="py-2 px-4 text-sm">
                <PlusCircle size={16} /> {t('addNew')}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'add' && <AddTransactionView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'categories' && <CategoriesView />}
        {activeTab === 'analysis' && <AnalysisView />}
      </main>

      {/* Mobile Navigation (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 pb-6 shadow-2xl z-40 flex justify-between items-center">
        <NavIcon tab="dashboard" icon={Wallet} label={t('home')} />
        <NavIcon tab="analysis" icon={BarChart3} label={t('analysis')} />
        
        {/* Floating Add Button for Mobile */}
        <div className="relative -top-8">
          <button 
            onClick={() => setActiveTab('add')}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 transition-transform active:scale-95 ${activeTab === 'add' ? 'bg-slate-800' : 'bg-blue-600'}`}
          >
            <PlusCircle size={28} />
          </button>
        </div>

        <NavIcon tab="history" icon={List} label={t('history')} />
        <NavIcon tab="categories" icon={Settings} label={t('settings')} />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
