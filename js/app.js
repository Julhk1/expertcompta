let currentModule = localStorage.getItem('ec_current_module') || 'mod1';

let gameState = {
    moduleType: currentModule,
    step: 1,
    xp: 100,
    journal: [],
    balances: {},
    bonusAwardedStep: null
};

function resetBalances() {
    gameState.balances = {
        "101": { debit: 0, credit: 0, label: "101 - Capital Social" },
        "164": { debit: 0, credit: 0, label: "164 - Emprunts Bancaires" },
        "203": { debit: 0, credit: 0, label: "203 - Frais de Recherche & Dév." },
        "215": { debit: 0, credit: 0, label: "215 - Matériel Industriel / Four" },
        "2815": { debit: 0, credit: 0, label: "2815 - Amortissement Matériel" },
        "311": { debit: 0, credit: 0, label: "311 - Stock Matières Premières" },
        "355": { debit: 0, credit: 0, label: "355 - Stock de Produits Finis" },
        "401": { debit: 0, credit: 0, label: "401 - Fournisseurs" },
        "411": { debit: 0, credit: 0, label: "411 - Clients" },
        "416": { debit: 0, credit: 0, label: "416 - Clients Douteux" },
        "421": { debit: 0, credit: 0, label: "421 - Personnel, Rémunérations Dues" },
        "431": { debit: 0, credit: 0, label: "431 - Organismes Sociaux (URSSAF)" },
        "444": { debit: 0, credit: 0, label: "444 - État, Impôt sur les Bénéfices" },
        "4441": { debit: 0, credit: 0, label: "4441 - État, Acomptes d'IS" },
        "44551": { debit: 0, credit: 0, label: "44551 - TVA à Décaisser" },
        "44566": { debit: 0, credit: 0, label: "44566 - TVA Déductible sur Biens" },
        "44571": { debit: 0, credit: 0, label: "44571 - TVA Collectée" },
        "487": { debit: 0, credit: 0, label: "487 - Produits Constatés d'Avance" },
        "512": { debit: 0, credit: 0, label: "512 - Banque" },
        "601": { debit: 0, credit: 0, label: "601 - Achats Consommations / Matières" },
        "6031": { debit: 0, credit: 0, label: "6031 - Variation de Stocks de Mat." },
        "641": { debit: 0, credit: 0, label: "641 - Salaires du Personnel" },
        "645": { debit: 0, credit: 0, label: "645 - Charges de Sécurité Sociale" },
        "656": { debit: 0, credit: 0, label: "656 - Dotations aux Dépréciations" },
        "666": { debit: 0, credit: 0, label: "666 - Pertes de Change" },
        "675": { debit: 0, credit: 0, label: "675 - VNC des Actifs Cédés" },
        "6811": { debit: 0, credit: 0, label: "6811 - Dotation aux Amortissements" },
        "695": { debit: 0, credit: 0, label: "695 - Impôts sur les Bénéfices (IS)" },
        "701": { debit: 0, credit: 0, label: "701 - Ventes de Produits / Prestations" },
        "713": { debit: 0, credit: 0, label: "713 - Variation des Stocks de Prod." },
        "721": { debit: 0, credit: 0, label: "721 - Production Immobilisée" },
        "775": { debit: 0, credit: 0, label: "775 - Produits des Cessions d'Actifs" }
    };
}

// Comptes dont le solde normal se lit à l'Actif du bilan (le reste va au Passif par défaut)
const ACTIF_ACCOUNTS = ["203", "215", "311", "355", "411", "416", "4441", "44566", "512"];

function initGame() {
    resetBalances();
    const localSave = localStorage.getItem('ec_active_save');
    if (localSave) {
        try {
            const parsed = JSON.parse(decodeURIComponent(escape(atob(localSave))));
            if (parsed && parsed.moduleType === currentModule) {
                const freshBalances = gameState.balances;
                gameState = parsed;
                // Forward-compatibility: fill in any chart-of-accounts entries the old save didn't have yet
                for (const code in freshBalances) {
                    if (!gameState.balances[code]) gameState.balances[code] = freshBalances[code];
                }
                if (typeof gameState.bonusAwardedStep === 'undefined') gameState.bonusAwardedStep = null;
            }
        } catch (e) { localStorage.removeItem('ec_active_save'); }
    }
    renderUI();
}

function renderUI() {
    if (typeof academyScenarios === 'undefined') return;
    const pool = academyScenarios[currentModule];
    const stepData = pool ? pool[gameState.step] : null;

    if (!stepData) {
        let currentLevel = parseInt(localStorage.getItem('ec_highest_level')) || 1;
        if (currentModule.startsWith('mod')) {
            const modNumber = parseInt(currentModule.replace('mod', ''));
            if (modNumber === currentLevel) {
                localStorage.setItem('ec_highest_level', modNumber + 1);
            }
        }
        document.getElementById('module-title').innerText = "Félicitations !";
        document.getElementById('step-title').innerText = "🏆 Niveau Validé !";
        document.getElementById('step-theory').innerHTML = `<p>Tu as validé avec succès l'ensemble du programme pratique de cette section.</p><br><button onclick="exitToMenu()" class="btn-main">Retourner au catalogue</button>`;
        document.getElementById('exercise-instruction').innerText = "Session terminée — aucune écriture supplémentaire requise.";
        document.getElementById('account-select').innerHTML = '';
        document.getElementById('xp-bar').style.width = "100%";
        renderFinancials();
        return;
    }

    const totalStepsInModule = Object.keys(pool).length;
    document.getElementById('module-title').innerText = `Filière : ${currentModule.toUpperCase()} | Progression : Étape ${gameState.step}/${totalStepsInModule}`;

    document.getElementById('step-title').innerText = stepData.title;
    document.getElementById('step-theory').innerHTML = stepData.theory;
    document.getElementById('exercise-instruction').innerText = `🎯 ${stepData.exercise.instruction}`;
    document.getElementById('xp-display').innerText = gameState.xp;
    document.getElementById('xp-bar').style.width = ((gameState.step - 1) * (100 / totalStepsInModule)) + "%";

    const select = document.getElementById('account-select');
    select.innerHTML = '';
    stepData.exercise.accountsAllowed.forEach(code => {
        if (gameState.balances[code]) select.innerHTML += `<option value="${code}">${gameState.balances[code].label}</option>`;
    });

    const tbody = document.getElementById('journal-body');
    tbody.innerHTML = '';
    gameState.journal.forEach((item, index) => {
        const label = (gameState.balances[item.account] && gameState.balances[item.account].label) || item.account;
        tbody.innerHTML += `<tr>
            <td><strong>${item.account}</strong> <span style="color:var(--text-faint); font-size:11px;">${label.split(' - ')[1] || ''}</span></td>
            <td>${item.debit || '-'}</td>
            <td>${item.credit || '-'}</td>
            <td><button onclick="removeLine(${index})" class="btn-danger">✕</button></td>
        </tr>`;
    });

    hideError();
    renderFinancials();
}

function handleSaisie() {
    if (typeof academyScenarios === 'undefined') return;
    const pool = academyScenarios[currentModule];
    const stepData = pool[gameState.step];
    if (!stepData) return;

    const account = document.getElementById('account-select').value;
    const debit = parseFloat(document.getElementById('input-debit').value) || 0;
    const credit = parseFloat(document.getElementById('input-credit').value) || 0;

    if (debit === 0 && credit === 0) return alert("Saisis un montant.");
    if (debit > 0 && credit > 0) return alert("Double saisie Débit/Crédit interdite sur la même ligne.");

    const expected = stepData.exercise.expectedEntries[account];
    if (!expected) {
        showError(`⚠️ Le compte ${account} n'est pas cohérent pour remplir l'énoncé actuel.`);
        return;
    }

    if ((expected.debit && debit !== expected.debit) || (expected.credit && credit !== expected.credit) || (expected.debit && credit > 0) || (expected.credit && debit > 0)) {
        gameState.xp = Math.max(0, gameState.xp - 10);
        showError("❌ Erreur de sens (Débit/Crédit) ou montant erroné. Revois l'impact du flux.");
        document.getElementById('xp-display').innerText = gameState.xp;
        return;
    }

    hideError();
    gameState.journal.push({ account, debit, credit });
    gameState.balances[account].debit += debit;
    gameState.balances[account].credit += credit;

    document.getElementById('input-debit').value = 0;
    document.getElementById('input-credit').value = 0;

    autoSave();
    renderUI();
}

function showError(msg) {
    const box = document.getElementById('error-message');
    box.classList.add('visible');
    box.innerText = msg;
}

function hideError() {
    const box = document.getElementById('error-message');
    box.classList.remove('visible');
}

function renderFinancials() {
    const actifList = document.getElementById('actif-list');
    const passifList = document.getElementById('passif-list');
    const chargesList = document.getElementById('charges-list');
    const produitsList = document.getElementById('produits-list');

    if (!actifList || !passifList || !chargesList || !produitsList) return;

    actifList.innerHTML = ''; passifList.innerHTML = ''; chargesList.innerHTML = ''; produitsList.innerHTML = '';
    let tActif = 0; let tPassif = 0; let tCharges = 0; let tProduits = 0;

    for (let acc in gameState.balances) {
        const d = gameState.balances[acc].debit;
        const c = gameState.balances[acc].credit;
        const label = gameState.balances[acc].label;

        if (acc.startsWith('6')) {
            const solde = d - c;
            if (solde !== 0) { chargesList.innerHTML += `<div class="financial-line"><span>${label}</span><strong>${solde} €</strong></div>`; tCharges += solde; }
        } else if (acc.startsWith('7')) {
            const solde = c - d;
            if (solde !== 0) { produitsList.innerHTML += `<div class="financial-line"><span>${label}</span><strong>${solde} €</strong></div>`; tProduits += solde; }
        } else {
            if (ACTIF_ACCOUNTS.includes(acc)) {
                const soldeActif = d - c;
                if (soldeActif !== 0) { actifList.innerHTML += `<div class="financial-line"><span>${label}</span><strong>${soldeActif} €</strong></div>`; tActif += soldeActif; }
            } else {
                const soldePassif = c - d;
                if (soldePassif !== 0) { passifList.innerHTML += `<div class="financial-line"><span>${label}</span><strong>${soldePassif} €</strong></div>`; tPassif += soldePassif; }
            }
        }
    }

    const net = tProduits - tCharges;
    if (net > 0) {
        passifList.innerHTML += `<div class="financial-line" style="color:var(--emerald-bright)"><span>120 - Bénéfice de l'exercice</span><strong>${net} €</strong></div>`; tPassif += net;
    } else if (net < 0) {
        passifList.innerHTML += `<div class="financial-line" style="color:var(--debit-red-bright)"><span>129 - Perte de l'exercice</span><strong>${net} €</strong></div>`; tPassif += net;
    }

    document.getElementById('total-actif').innerText = tActif;
    document.getElementById('total-passif').innerText = tPassif;
    document.getElementById('total-charges').innerText = tCharges;
    document.getElementById('total-produits').innerText = tProduits;
    document.getElementById('resultat-net').innerText = net;

    if (typeof academyScenarios === 'undefined') return;
    const pool = academyScenarios[currentModule];
    const stepData = pool ? pool[gameState.step] : null;
    if (!stepData) return;

    const linesRequired = Object.keys(stepData.exercise.expectedEntries).length;
    let valid = true;
    for (let acc in stepData.exercise.expectedEntries) {
        const target = stepData.exercise.expectedEntries[acc];
        const match = gameState.journal.some(item =>
            item.account === acc &&
            (target.debit ? item.debit === target.debit : true) &&
            (target.credit ? item.credit === target.credit : true)
        );
        if (!match) { valid = false; break; }
    }

    if (gameState.journal.length !== linesRequired) { valid = false; }

    if (valid) {
        document.getElementById('success-panel').style.display = 'block';
        document.getElementById('success-explanation').innerHTML = stepData.explanation.success;

        if (gameState.bonusAwardedStep !== gameState.step) {
            gameState.xp = Math.min(100, gameState.xp + 15);
            gameState.bonusAwardedStep = gameState.step;
            document.getElementById('xp-display').innerText = gameState.xp;
            autoSave();
        }
    } else {
        document.getElementById('success-panel').style.display = 'none';
    }
}

function genererLiasseFiscalePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFillColor(15, 22, 19);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(232, 199, 102);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("EXPERTCOMPTA — LIASSE FISCALE", 15, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Formulaire de synthèse pédagogique — Conforme aux normes du PCG", 15, 32);

    const totalActif = document.getElementById('total-actif').innerText + " €";
    const totalPassif = document.getElementById('total-passif').innerText + " €";
    const totalCharges = document.getElementById('total-charges').innerText + " €";
    const totalProduits = document.getElementById('total-produits').innerText + " €";
    const resultatNet = document.getElementById('resultat-net').innerText + " €";
    const moduleName = currentModule.toUpperCase();

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text(`CURSUS : ${moduleName} - ÉTAPE ${gameState.step}`, 15, 55);
    doc.setFont("Helvetica", "normal");
    doc.text(`Date d'exportation : ${new Date().toLocaleDateString()}`, 130, 55);

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 65, 180, 8, 'F');
    doc.setFont("Helvetica", "bold");
    doc.text("⚖️ BILAN COMPTABLE SIMPLIFIÉ (Patrimoine)", 18, 71);

    doc.setFont("Helvetica", "normal");
    doc.rect(15, 73, 180, 30);
    doc.line(105, 73, 105, 103);

    doc.text("TOTAL ACTIF (Emplois) :", 18, 85);
    doc.setFont("Helvetica", "bold");
    doc.text(totalActif, 70, 85);

    doc.setFont("Helvetica", "normal");
    doc.text("TOTAL PASSIF (Ressources) :", 108, 85);
    doc.setFont("Helvetica", "bold");
    doc.text(totalPassif, 165, 85);

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 115, 180, 8, 'F');
    doc.setFont("Helvetica", "bold");
    doc.text("📊 COMPTE DE RÉSULTAT (Activité de la période)", 18, 121);

    doc.setFont("Helvetica", "normal");
    doc.rect(15, 123, 180, 45);
    doc.line(15, 138, 195, 138);
    doc.line(15, 153, 195, 153);

    doc.text("Total des Charges (Classe 6) :", 18, 132);
    doc.text(totalCharges, 150, 132);

    doc.text("Total des Produits (Classe 7) :", 18, 147);
    doc.text(totalProduits, 150, 147);

    doc.setFont("Helvetica", "bold");
    doc.setTextColor(31, 138, 95);
    doc.text("RÉSULTAT NET DE L'EXERCICE :", 18, 162);
    doc.text(resultatNet, 150, 162);

    doc.rect(120, 185, 75, 30);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.text("Visa de conformité", 123, 191);
    doc.setFont("Helvetica", "bold");
    doc.text("EXPERTCOMPTA ACCREDITED", 123, 205);

    doc.setFontSize(8);
    doc.text("Ce document synthétique certifie la réussite et l'équilibre de la balance comptable de l'étudiant.", 15, 285);

    doc.save(`Liasse_Fiscale_${moduleName}_Etape_${gameState.step}.pdf`);
}

function removeLine(index) {
    const item = gameState.journal[index];
    gameState.balances[item.account].debit -= item.debit;
    gameState.balances[item.account].credit -= item.credit;
    gameState.journal.splice(index, 1);
    autoSave(); renderUI();
}

function autoSave() {
    localStorage.setItem('ec_active_save', btoa(unescape(encodeURIComponent(JSON.stringify(gameState)))));
}

function nextStep() {
    gameState.step += 1;
    gameState.journal = [];
    autoSave();
    renderUI();
}

function exitToMenu() {
    localStorage.removeItem('ec_active_save');
    window.location.href = 'index.html';
}

function skipStepTesting() {
    if (typeof academyScenarios === 'undefined') return;
    const pool = academyScenarios[currentModule];
    const stepData = pool[gameState.step];
    if (!stepData) return;
    gameState.journal = [];
    for (let acc in stepData.exercise.expectedEntries) {
        const exp = stepData.exercise.expectedEntries[acc];
        const d = exp.debit || 0; const c = exp.credit || 0;
        gameState.journal.push({ account: acc, debit: d, credit: c });
        gameState.balances[acc].debit += d; gameState.balances[acc].credit += c;
    }
    autoSave(); renderUI();
}

window.onload = initGame;
