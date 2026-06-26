/**
 * report.js — Expense Tracker Report Page Logic
 * -----------------------------------------------
 * Reads per-user data from localStorage (set by Tracker.html + auth.js).
 * All keys are namespaced by username so multiple users stay isolated.
 *
 * IDs populated:
 *   #reportName     — username in header
 *   #greetName      — username in greeting banner
 *   #reportIncome   — total income
 *   #reportExpense  — total expense
 *   #reportBalance  — current balance
 *   #reportStatus   — auto-generated financial status message
 */

window.onload = function () {
  loadReportData();
};

/* ── Format number with Indian Rupee symbol ── */
function formatIndianCurrency(num) {
  return "₹ " + num.toLocaleString("en-IN");
}

/* ── Safely read a stored integer; return null if missing ── */
function getStoredNumber(key) {
  const val = localStorage.getItem(key);
  if (val === null || val === "") return null;
  const n = parseInt(val);
  return isNaN(n) ? null : n;
}

/* ── Determine status message + color from income/balance ── */
function getFinancialStatus(income, balance) {
  if (income === null || balance === null) {
    return { message: "No transaction data found.", color: "#6b7280" };
  }
  if (income === 0) {
    return { message: "😐 No income recorded yet. Add some transactions!", color: "#6b7280" };
  }

  const ratio = balance / income;

  if (balance < 0) {
    return {
      message: "🚨 Warning! Your expenses exceed your income.",
      color: "#dc2626"   // Red
    };
  }
  if (balance === 0) {
    return {
      message: "😐 You're breaking even. Consider building some savings.",
      color: "#6b7280"   // Gray
    };
  }
  if (ratio <= 0.20) {
    return {
      message: "⚠️ You're spending most of your income. Try saving more.",
      color: "#f97316"   // Orange
    };
  }
  if (ratio <= 0.50) {
    return {
      message: "✅ Good! Your expenses are under control.",
      color: "#2563eb"   // Blue
    };
  }
  return {
    message: "🌟 Excellent! You're saving money consistently. Keep it up!",
    color: "#16a34a"     // Green
  };
}

/* ── Main: populate all report IDs ── */
function loadReportData() {
  const noData = "No Data Available";

  // Read logged-in user (set by auth.js on login)
  const username = localStorage.getItem("et_currentUser");

  // If not logged in, redirect back to login
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  // Per-user storage keys (same pattern as Tracker.html)
  const income  = getStoredNumber("et_totalIncome_"  + username);
  const expense = getStoredNumber("et_totalExpense_" + username);
  const balance = getStoredNumber("et_balance_"      + username);

  // Populate header name
  const nameEl = document.getElementById("reportName");
  if (nameEl) nameEl.innerText = username;

  // Populate greeting banner name
  const greetEl = document.getElementById("greetName");
  if (greetEl) greetEl.innerText = username;

  // Populate income
  const incomeEl = document.getElementById("reportIncome");
  if (incomeEl) incomeEl.innerText = income !== null ? formatIndianCurrency(income) : noData;

  // Populate expense
  const expenseEl = document.getElementById("reportExpense");
  if (expenseEl) expenseEl.innerText = expense !== null ? formatIndianCurrency(expense) : noData;

  // Populate balance
  const balanceEl = document.getElementById("reportBalance");
  if (balanceEl) balanceEl.innerText = balance !== null ? formatIndianCurrency(balance) : noData;

  // Populate status
  const statusEl = document.getElementById("reportStatus");
  if (statusEl) {
    const status = getFinancialStatus(income, balance);
    statusEl.innerText             = status.message;
    statusEl.style.color           = status.color;
    statusEl.style.fontWeight      = "700";
    statusEl.style.borderLeftColor = status.color;
  }
}