import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'income') {
        accumulator += currentValue.value;
      }
      return accumulator;
    });

    const outcome = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'outcome') {
        accumulator += currentValue.value;
      }
      return accumulator;
    });

    const total = income - outcome;

    this.balance = {
      income,
      outcome,
      total,
    };
    return this.balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
