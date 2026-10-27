
/* =========================================
   SPETIME CREATOR WALLET
   SAFE SETUP MODE
   Real payments are not connected.
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("current-year");

    const depositButton = document.getElementById("deposit-button");
    const withdrawButton = document.getElementById("withdraw-button");
    const logoutButton = document.getElementById("logout-button");

    const actionPanel = document.getElementById("wallet-action-panel");
    const actionTitle = document.getElementById("action-panel-title");
    const actionDescription = document.getElementById("action-panel-description");
    const actionForm = document.getElementById("wallet-action-form");
    const amountInput = document.getElementById("wallet-amount");
    const payoutDetails = document.getElementById("payout-details");
    const payoutMethod = document.getElementById("payout-method");
    const closePanelButton = document.getElementById("close-panel-button");
    const actionMessage = document.getElementById("wallet-action-message");
    const submitButton = document.getElementById("submit-wallet-action");

    const transactionFilter = document.getElementById("transaction-filter");
    const transactionList = document.getElementById("transaction-list");
    const transactionCount = document.getElementById("transaction-count");

    let currentAction = "";

    // Update the footer year.
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // No financial records are stored in this preview.
    // Do not use browser storage as a real wallet ledger.
    const transactions = [];

    function showActionPanel(action) {
        if (!actionPanel || !actionTitle || !actionDescription) {
            return;
        }

        currentAction = action;

        actionPanel.hidden = false;

        if (action === "deposit") {
            actionTitle.textContent = "Deposit funds";
            actionDescription.textContent =
                "Deposits are unavailable while Spetime's payment provider is being configured.";

            if (payoutDetails) {
                payoutDetails.hidden = true;
            }

            if (submitButton) {
                submitButton.textContent = "Deposits unavailable";
            }
        } else {
            actionTitle.textContent = "Withdraw earnings";
            actionDescription.textContent =
                "Withdrawals will be available after account verification and payment-provider approval.";

            if (payoutDetails) {
                payoutDetails.hidden = false;
            }

            if (submitButton) {
                submitButton.textContent = "Withdrawals unavailable";
            }
        }

        if (actionForm) {
            actionForm.reset();
        }

        if (actionMessage) {
            actionMessage.textContent =
                "Setup mode: no money will be moved or recorded.";
        }

        if (amountInput) {
            amountInput.value = "";
        }

        actionPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function closeActionPanel() {
        if (actionPanel) {
            actionPanel.hidden = true;
        }

        if (actionMessage) {
            actionMessage.textContent = "";
        }

        currentAction = "";
    }

    if (depositButton) {
        depositButton.addEventListener("click", function () {
            showActionPanel("deposit");
        });
    }

    if (withdrawButton) {
        withdrawButton.addEventListener("click", function () {
            showActionPanel("withdrawal");
        });
    }

    if (closePanelButton) {
        closePanelButton.addEventListener("click", closeActionPanel);
    }

    // Explicitly prevent all deposit and withdrawal submissions.
    if (actionForm) {
        actionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (actionMessage) {
                actionMessage.textContent =
                    currentAction === "deposit"
                        ? "Deposits are disabled. No payment was initiated and your balance has not changed."
                        : "Withdrawals are disabled. No payout was requested and your balance has not changed.";
            }
        });
    }

    // Keep the logout control inactive until real authentication is connected.
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            window.alert(
                "Login and logout are not connected yet. We will enable logout after connecting Spetime authentication."
            );
        });
    }

    // Render transaction history from the current data source.
    // The preview contains no transactions and does not invent records.
    function renderTransactions() {
        if (!transactionList || !transactionCount || !transactionFilter) {
            return;
        }

        const selectedType = transactionFilter.value;

        const filteredTransactions = transactions.filter(function (transaction) {
            return selectedType === "all" || transaction.type === selectedType;
        });

        transactionCount.textContent =
            filteredTransactions.length +
            (filteredTransactions.length === 1 ? " record" : " records");

        transactionList.replaceChildren();

        if (filteredTransactions.length === 0) {
            const emptyState = document.createElement("div");
            emptyState.className = "empty-transactions";

            const icon = document.createElement("div");
            icon.className = "empty-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = "↔";

            const heading = document.createElement("h3");
            heading.textContent = "No transactions yet";

            const description = document.createElement("p");
            description.textContent =
                "Verified wallet transactions will appear here when the secure backend is connected.";

            emptyState.append(icon, heading, description);
            transactionList.appendChild(emptyState);
            return;
        }

        // Transaction records will be rendered here after the secure
        // backend and verified ledger are connected.
        filteredTransactions.forEach(function (transaction) {
            const row = document.createElement("article");
            row.className = "transaction-row";

            const title = document.createElement("strong");
            title.textContent = transaction.description;

            const amount = document.createElement("span");
            amount.textContent = transaction.amount;

            row.append(title, amount);
            transactionList.appendChild(row);
        });
    }

    if (transactionFilter) {
        transactionFilter.addEventListener("change", renderTransactions);
    }

    renderTransactions();
});
