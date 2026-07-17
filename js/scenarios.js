const academyScenarios = {
    // ==========================================
    // MODULE 1 : LICENCE 1 - LES FONDATIONS
    // ==========================================
    mod1: {
        1: {
            title: "L1 - Étape 1 : Qu'est-ce que le Bilan ?",
            theory: "La comptabilité mesure la situation patrimoniale de l'entreprise à l'aide du <strong>Bilan</strong>. Il se compose du <strong>Passif</strong> (l'origine de l'argent : apports, emprunts) et de l'<strong>Actif</strong> (l'emploi des fonds : banque, stocks, immobilisations). Une règle d'or universelle s'applique : Actif = Passif.",
            exercise: {
                instruction: "Lancez la structure en enregistrant l'apport en capital initial des associés pour un montant de 50 000 € déposé sur le compte en banque.",
                accountsAllowed: ["512", "101"],
                expectedEntries: { "512": { debit: 50000 }, "101": { credit: 50000 } }
            },
            explanation: { success: "Parfait ! Le capital (Crédit du passif 101) finance l'ouverture de la Trésorerie (Débit de l'actif 512). Le bilan initial est équilibré." }
        },
        2: {
            title: "L1 - Étape 2 : Le Compte de Résultat & Flux de Charges",
            theory: "Contrairement au bilan qui est une image fixe, le <strong>Compte de Résultat</strong> mesure l'activité. Les <strong>Charges</strong> (classe 6) appauvrissent l'entreprise (dépenses consommées) et s'enregistrent toujours au <strong>Débit</strong> selon la partie double.",
            exercise: {
                instruction: "Enregistrez le virement bancaire immédiat pour le paiement du premier mois de loyer commercial s'élevant à 3 000 €.",
                accountsAllowed: ["601", "512"],
                expectedEntries: { "601": { debit: 3000 }, "512": { credit: 3000 } }
            },
            explanation: { success: "Correct ! Le loyer (Débit 601) impute le résultat de l'exercice tandis que le compte Banque (Crédit 512) constate la sortie de trésorerie." }
        },
        3: {
            title: "L1 - Étape 3 : La Saisie des Produits",
            theory: "Les <strong>Produits</strong> (classe 7) mesurent l'enrichissement lié à l'activité commerciale (Chiffre d'Affaires). Ils s'inscrivent historiquement au <strong>Crédit</strong> pour augmenter le bénéfice net.",
            exercise: {
                instruction: "Facturez et encaissez immédiatement en banque une vente de prestations de services d'un montant de 8 000 € (Hors Taxes).",
                accountsAllowed: ["512", "701"],
                expectedEntries: { "512": { debit: 8000 }, "701": { credit: 8000 } }
            },
            explanation: { success: "Excellent ! Le produit augmente au crédit (701) et vient gonfler ton résultat net, parallèlement à l'entrée de cash au débit de la banque (512)." }
        },
        4: {
            title: "L1 - Étape 4 : Le Financement Externe (L'Emprunt)",
            theory: "Quand les fonds propres ne suffisent pas, l'entité sollicite un emprunt. Cela génère une dette à long terme au passif (164) et alimente instantanément l'actif (512).",
            exercise: {
                instruction: "Enregistrez le déblocage et la réception en banque des fonds d'un emprunt à long terme de 20 000 €.",
                accountsAllowed: ["512", "164"],
                expectedEntries: { "512": { debit: 20000 }, "164": { credit: 20000 } }
            },
            explanation: { success: "Écriture validée ! Dette financière créée au passif, et liquidités renforcées à l'actif." }
        }
    },

    // ==========================================
    // MODULE 2 : LICENCE 2 - COMPTABILITÉ GÉNÉRALE
    // ==========================================
    mod2: {
        1: {
            title: "L2 - Étape 1 : Le Mécanisme de la TVA Collectée",
            theory: "La TVA est neutre pour les entreprises. Lors d'une vente, l'entité collecte la taxe pour le compte de l'État : le prix facturé est TTC. L'entreprise isole le Chiffre d'Affaires HT (701) et met la taxe en compte 44571 (Dette fiscale au passif).",
            exercise: {
                instruction: "Enregistrez une vente de marchandises de 10 000 € HT avec une TVA de 20% (soit 2 000 €). Le client paie l'intégralité du montant TTC au comptant.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 12000 }, "701": { credit: 10000 }, "44571": { credit: 2000 } }
            },
            explanation: { success: "Exact ! La banque encaisse le TTC (12 000 €), la richesse réelle HT va au produit (10 000 €) et les 2 000 € forment une dette d'État." }
        },
        2: {
            title: "L2 - Étape 2 : La TVA Déductible sur Achats",
            theory: "Sur ses dépenses professionnelles, une entreprise paie le TTC à son fournisseur mais dispose du droit de récupérer cette TVA auprès de l'État. C'est une créance fiscale de TVA déductible au débit du compte 44566.",
            exercise: {
                instruction: "Passez l'écriture d'achat de matières premières pour un montant de 5 000 € HT (+ 1 000 € de TVA déductible à 20%), payé par virement bancaire.",
                accountsAllowed: ["601", "44566", "512"],
                expectedEntries: { "601": { debit: 5000 }, "44566": { debit: 1000 }, "512": { credit: 6000 } }
            },
            explanation: { success: "Parfait ! La charge nette reste à 5 000 € (Débit 601), l'État nous doit 1 000 € (Débit 44566), et la banque est créditée du TTC (6 000 €)." }
        },
        3: {
            title: "L2 - Étape 3 : L'Amortissement Linéaire d'Actif",
            theory: "Une immobilisation (classe 2) s'use avec le temps. À la clôture, on constate cette perte de valeur irréversible en débitant une Dotation (6811) et en créditant un Amortissement (2815) pour ajuster la valeur nette de l'actif.",
            exercise: {
                instruction: "Calculez et passez la dotation aux amortissements annuels d'une machine d'origine de 15 000 € amortissable sur 5 ans (soit 3 000 € par an).",
                accountsAllowed: ["6811", "2815"],
                expectedEntries: { "6811": { debit: 3000 }, "2815": { credit: 3000 } }
            },
            explanation: { success: "Validé ! Le coût d'utilisation de la machine est correctement étalé sur l'exercice en charge." }
        },
        4: {
            title: "L2 - Étape 4 : Régularisation des Stocks Finaux",
            theory: "En vertu du principe d'indépendance des exercices, seules les matières consommées doivent être passées en charges. Le stock restant en magasin en fin d'année doit être réintégré à l'actif (311) via le compte de variation de stock (6031).",
            exercise: {
                instruction: "L'inventaire physique comptabilise 4 000 € de matières premières inutilisées en réserve. Enregistrez ce stock final au bilan.",
                accountsAllowed: ["311", "6031"],
                expectedEntries: { "311": { debit: 4000 }, "6031": { credit: 4000 } }
            },
            explanation: { success: "Correct ! Le stock augmente à l'actif du bilan et le crédit du 6031 vient diminuer le total des charges d'achats consommées." }
        }
    },

    // ==========================================
    // MODULE 3 : L3 / M1 - COMPTABILITÉ APPROFONDIE
    // ==========================================
    mod3: {
        1: {
            title: "L3/M1 - Étape 1 : Consolidation - Retraitement Réciproque",
            theory: "Dans un groupe, les ventes internes entre filiales et maison mère n'apportent aucune valeur externe. En consolidation, il est impératif d'annuler ces flux réciproques pour ne pas fausser le chiffre d'affaires combiné du groupe.",
            exercise: {
                instruction: "Annulez une facture de vente intra-groupe de 15 000 € passée entre la société mère et sa filiale intégrée (annulez le produit au débit).",
                accountsAllowed: ["701", "101"],
                expectedEntries: { "701": { debit: 15000 }, "101": { credit: 15000 } }
            },
            explanation: { success: "Félicitations, élimination validée ! Le produit fictif à l'échelle du groupe est neutralisé." }
        },
        2: {
            title: "L3/M1 - Étape 2 : Différences de Change Réalisées",
            theory: "Les factures en devises fluctuant avec les taux de change, le règlement final peut engendrer un écart monétaire réel. Si l'on reçoit moins d'Euros que prévu à cause des cours, on enregistre une perte de change définitive (666).",
            exercise: {
                instruction: "Un client export solde sa facture. Suite à la baisse du dollar, la banque ne crédite que 9 500 € pour clore une créance d'origine de 10 000 €. Enregistrez la perte.",
                accountsAllowed: ["512", "666", "411"],
                expectedEntries: { "512": { debit: 9500 }, "666": { debit: 500 }, "411": { credit: 10000 } }
            },
            explanation: { success: "Écriture d'expert ! La créance est apurée pour sa valeur historique (10 000 €) et la perte financière est actée." }
        }
    },

    // ==========================================
    // MODULE 4 : MASTER 2 - FISCALITÉ DES SOCIÉTÉS
    // ==========================================
    mod4: {
        1: {
            title: "M2 - Étape 1 : Liquidation de l'Impôt sur les Sociétés",
            theory: "L'Impôt sur les Sociétés (IS) frappe le bénéfice fiscal net de clôture. Il matérialise une charge d'exercice obligatoire (695) et fait naître une dette court terme envers le fisc (401).",
            exercise: {
                instruction: "Constatez le montant annuel calculé au titre de l'IS de l'exercice pour un montant dû de 8 500 €.",
                accountsAllowed: ["695", "401"],
                expectedEntries: { "695": { debit: 8500 }, "401": { credit: 8500 } }
            },
            explanation: { success: "Validé ! La charge fiscale ampute légitimement le bénéfice net disponible de clôture." }
        }
    },

    // ==========================================
    // MODULE 5 : MASTER 2 - PAIE ET COMPTA SOCIALE
    // ==========================================
    mod5: {
        1: {
            title: "M2 - Étape 2 : Centralisation de la Masse Salariale Brute",
            theory: "Le salaire brut contractuel représente la charge d'exploitation brute pour l'employeur (641). En contrepartie, il enregistre le net à verser au personnel sur le compte tiers 411.",
            exercise: {
                instruction: "Enregistrez le journal des salaires : Masse salariale brute de 5 000 € entraînant un salaire net à payer de 4 000 €.",
                accountsAllowed: ["641", "411"],
                expectedEntries: { "641": { debit: 5000 }, "411": { credit: 4000 } }
            },
            explanation: { success: "Parfait ! Les 1 000 € d'écart représentent les charges salariales retenues à la source." }
        },
        2: {
            title: "M2 - Étape 3 : Comptabilisation des Charges Patronales",
            theory: "En plus du brut, l'entreprise finance la protection sociale via ses charges patronales. C'est un coût additionnel à débiter au compte 645 en créant une dette URSSAF au crédit du compte 431.",
            exercise: {
                instruction: "Enregistrez la quote-part des charges patronales du mois notifiées pour un montant de 1 200 €.",
                accountsAllowed: ["645", "431"],
                expectedEntries: { "645": { debit: 1200 }, "431": { credit: 1200 } }
            },
            explanation: { success: "Parfait ! Vos flux de charges sociales et dettes d'exploitation sont d'équerre." }
        }
    },

    // ==========================================
    // SYNTHÈSES : OUVERTURE À CLÔTURE
    // ==========================================
    boulangerie: {
        1: { title: "Ouverture et Financement", theory: "Cas Boulanger - Étape 1", exercise: { instruction: "Apport de capital de 20 000 € et emprunt de 30 000 € déposés en banque.", accountsAllowed: ["512", "101", "164"], expectedEntries: { "512": { debit: 50000 }, "101": { credit: 20000 }, "164": { credit: 30000 } } }, explanation: { success: "Fonds injectés." } }
    },
    saas: {
        1: { title: "R&D et Incorporel", theory: "Cas SaaS - Étape 1", exercise: { instruction: "Activation des développements technologiques internes à l'actif pour 25 000 €.", accountsAllowed: ["203", "721"], expectedEntries: { "203": { debit: 25000 }, "721": { credit: 25000 } } }, explanation: { success: "Actif incorporel valorisé." } }
    },
    industrie: {
        1: { title: "Financement Infrastructure Usine", theory: "Cas Usine - Étape 1", exercise: { instruction: "Emprunt bancaire d'équipement industriel de 500 000 € débloqué.", accountsAllowed: ["512", "164"], expectedEntries: { "512": { debit: 500000 }, "164": { credit: 500000 } } }, explanation: { success: "Trésorerie industrielle opérationnelle." } }
    }
};
