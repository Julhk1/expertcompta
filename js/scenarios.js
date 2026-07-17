const academyScenarios = {
    // ==========================================
    // MODULE 1 : LICENCE 1 - LES FONDATIONS COMPTABLES
    // ==========================================
    mod1: {
        1: {
            title: "L1 - Étape 1 : Qu'est-ce que la comptabilité et le Bilan ?",
            theory: "La comptabilité est un système d'information normalisé permettant de mesurer le patrimoine d'une entité. Tout commence par le <strong>Bilan</strong>, une photographie de ce patrimoine à un instant T. Il est divisé en deux : l'<strong>Actif</strong> (ce que l'entreprise possède : banque, immobilisations, stocks) et le <strong>Passif</strong> (l'origine des fonds, ce que l'entreprise doit : capital social, emprunts bancaires). La règle d'or absolue est l'équilibre parfait : Actif = Passif.",
            exercise: {
                instruction: "Constituez la société en enregistrant l'apport en capital initial des associés pour un montant de 50 000 € déposé sur le compte en banque.",
                accountsAllowed: ["512", "101"],
                expectedEntries: { "512": { debit: 50000 }, "101": { credit: 50000 } }
            },
            explanation: { success: "Félicitations. Les fonds proviennent du Capital Social (Crédit du passif 101) et se matérialisent en Banque (Débit de l'actif 512). Le bilan initial est équilibré." }
        },
        2: {
            title: "L1 - Étape 2 : Le Compte de Résultat & Flux de Charges",
            theory: "Alors que le bilan montre la situation patrimoniale, le <strong>Compte de Résultat</strong> mesure la performance économique sur une période (l'exercice). Il oppose les <strong>Charges</strong> (classe 6, dépenses qui appauvrissent l'entreprise) aux <strong>Produits</strong> (classe 7, ventes qui l'enrichissent). Les charges augmentent toujours au <strong>Débit</strong>.",
            exercise: {
                instruction: "L'entreprise règle immédiatement par virement bancaire son premier mois de loyer commercial pour un montant de 3 000 €.",
                accountsAllowed: ["601", "512"],
                expectedEntries: { "601": { debit: 3000 }, "512": { credit: 3000 } }
            },
            explanation: { success: "Correct. Le loyer est une charge (Débit 601) qui vient réduire directement le résultat de l'exercice, et la Banque (Crédit 512) diminue à l'Actif." }
        },
        3: {
            title: "L1 - Étape 3 : Le Mécanisme des Flux de Produits",
            theory: "Les <strong>Produits</strong> (classe 7) constatent l'enrichissement issu de l'activité commerciale (Chiffre d'Affaires). Ils s'enregistrent historiquement au <strong>Crédit</strong>. Ils augmentent le résultat net de l'exercice et viendront, lors de la clôture, gonfler les capitaux propres au passif du bilan.",
            exercise: {
                instruction: "Facturez et encaissez immédiatement en banque une vente de prestations de services d'un montant de 8 000 € HT.",
                accountsAllowed: ["512", "701"],
                expectedEntries: { "512": { debit: 8000 }, "701": { credit: 8000 } }
            },
            explanation: { success: "Magnifique. Le produit de vente augmente au Crédit (701) tandis que le flux de trésorerie entre au Débit de la Banque (512)." }
        },
        4: {
            title: "L1 - Étape 4 : Le Principe Fondamental de la Partie Double",
            theory: "Chaque transaction comptable nécessite au moins deux comptes. Le total des montants inscrits au <strong>Débit</strong> doit être rigoureusement ÉGAL au total des montants inscrits au <strong>Crédit</strong>. C'est ce mécanisme de balance permanente qui assure la cohérence des états financiers.",
            exercise: {
                instruction: "Pour financer un futur projet, l'entreprise contracte un emprunt de 20 000 € auprès de sa banque. Enregistrez la réception des fonds.",
                accountsAllowed: ["512", "164"],
                expectedEntries: { "512": { debit: 20000 }, "164": { credit: 20000 } }
            },
            explanation: { success: "Écriture validée. La dette financière est actée au crédit du passif (164) et la trésorerie est renforcée au débit de l'actif (512)." }
        },
        5: {
            title: "L1 - Étape 5 : Le Grand Livre et la Balance comptable",
            theory: "Après avoir saisi les écritures au Journal, les mouvements sont reportés dans le <strong>Grand Livre</strong> (compte par compte, sous forme de T) puis synthétisés dans la <strong>Balance</strong>. La balance liste tous les comptes avec leurs totaux débits/crédits et leurs soldes.",
            exercise: {
                instruction: "Afin de valider la bonne compréhension de la structure des comptes, passez une écriture technique neutre de 0 € sur le compte Banque (512) pour clore le cycle d'initiation.",
                accountsAllowed: ["512"],
                expectedEntries: { "512": { debit: 0 } }
            },
            explanation: { success: "Excellent ! Tu as validé le Module 1 et posé les bases indispensables de ton parcours d'expert." }
        }
    },

    // ==========================================
    // MODULE 2 : LICENCE 2 - COMPTABILITÉ GÉNÉRALE INTERMÉDIAIRE
    // ==========================================
    mod2: {
        1: {
            title: "L2 - Étape 1 : Le Rôle de Collecteur de la TVA Collectée",
            theory: "La Taxe sur la Valeur Ajoutée (TVA) est neutre pour l'entreprise. Sur ses ventes, l'entité applique le taux légal (20%). Le client paie le prix TTC (Toutes Taxes Comprises). L'entreprise comptabilise sa richesse réelle en HT sur un compte de produit (701) et isole la TVA collectée (44571), qui constitue une dette stricte envers l'État.",
            exercise: {
                instruction: "Facturez une vente de marchandises d'un montant de 10 000 € HT soumise à une TVA de 20% (soit 2 000 €). Le client paie l'intégralité au comptant en banque.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 12000 }, "701": { credit: 10000 }, "44571": { credit: 2000 } }
            },
            explanation: { success: "Exact. Le client décaisse le TTC au débit de la banque (12 000 €), le Chiffre d'Affaires s'établit à 10 000 € HT au crédit du 701, et la dette d'État prend 2 000 € au crédit." }
        },
        2: {
            title: "L2 - Étape 2 : Le Droit à Déduction de la TVA sur Achats",
            theory: "Lorsqu'une entreprise réalise des dépenses nécessaires à son exploitation, elle paie la TVA à ses fournisseurs mais détient le droit de la récupérer auprès du Trésor Public. Cette créance fiscale se comptabilise au débit du compte 44566 (TVA Déductible sur biens et services).",
            exercise: {
                instruction: "Comptabilisez l'achat de matières premières d'exploitation pour 5 000 € HT, avec une TVA déductible de 1 000 € (20%), réglé par chèque bancaire.",
                accountsAllowed: ["601", "44566", "512"],
                expectedEntries: { "601": { debit: 5000 }, "44566": { debit: 1000 }, "512": { credit: 6000 } }
            },
            explanation: { success: "Parfait. La charge nette est de 5 000 € (Débit 601), la créance de TVA est de 1 000 € (Débit 44566) et le compte en banque subit le décaissement TTC de 6 000 € (Crédit 512)." }
        },
        3: {
            title: "L2 - Étape 3 : Distinction entre Charge et Immobilisation",
            theory: "Un achat qui augmente durablement la valeur du patrimoine de l'entreprise (durée de service supérieure à un an) ne doit pas être enregistré en charge, mais à l'actif du bilan en classe 2 (Immobilisations). C'est le cas des machines, ordinateurs ou véhicules.",
            exercise: {
                instruction: "Achetez au comptant par virement bancaire un équipement de production pour une valeur de 15 000 € HT (par simplification, on ne traite pas la TVA sur cette étape).",
                accountsAllowed: ["215", "512"],
                expectedEntries: { "215": { debit: 15000 }, "512": { credit: 15000 } }
            },
            explanation: { success: "Très bien. L'équipement entre à l'actif (Débit 215) pour sa valeur d'origine et la banque diminue (Crédit 512). Aucun impact sur le compte de résultat pour le moment." }
        },
        4: {
            title: "L2 - Étape 4 : Consommation de Richesse - L'Amortissement",
            theory: "Une immobilisation s'use avec le temps. À chaque clôture, on enregistre cette dépréciation irréversible pour respecter le principe d'image fidèle. On débite une Dotation aux Amortissements (6811 - charge) et on crédite le compte d'Amortissement associé (2815 - diminution de la valeur de l'actif).",
            exercise: {
                instruction: "Constatez l'amortissement annuel en fin d'exercice de la machine achetée 15 000 € et amortissable en linéaire sur 5 ans (soit une dotation de 3 000 €).",
                accountsAllowed: ["6811", "2815"],
                expectedEntries: { "6811": { debit: 3000 }, "2815": { credit: 3000 } }
            },
            explanation: { success: "Écriture enregistrée. Cela permet d'étaler le coût économique de l'investissement sur sa durée réelle d'utilisation." }
        },
        5: {
            title: "L2 - Étape 5 : Le Principe d'Indépendance des Exercices (Variation de Stock)",
            theory: "Un exercice comptable est étanche. Pour calculer un résultat juste, on ne doit laisser en charges que les matières réellement consommées. Les matières achetées mais non utilisées en fin d'année doivent être stockées à l'actif (311) par le crédit d'une Variation de Stock (6031) qui vient réduire les charges.",
            exercise: {
                instruction: "L'inventaire physique de fin d'année prouve qu'il reste l'équivalent de 4 000 € de matières premières inutilisées en réserve. Enregistrez ce stock final.",
                accountsAllowed: ["311", "6031"],
                expectedEntries: { "311": { debit: 4000 }, "6031": { credit: 4000 } }
            },
            explanation: { success: "Correct. Le stock apparaît à l'actif du bilan et la variation vient corriger le compte de résultat pour refléter la consommation réelle." }
        }
    },

    // ==========================================
    // MODULE 3 : LICENCE 3 / MASTER 1 - COMPTABILITÉ APPROFONDIE
    // ==========================================
    mod3: {
        1: {
            title: "L3/M1 - Étape 1 : Consolidation - Élimination des Flux Internes",
            theory: "Dans les grands groupes, les filiales réalisent fréquemment des opérations commerciales entre elles. Au niveau consolidé (le bilan unique du groupe), ces flux réciproques n'ont aucune réalité économique vis-à-vis des tiers. Il faut impérativement annuler les produits et charges réciproques.",
            exercise: {
                instruction: "Éliminez une transaction de vente intra-groupe d'un montant de 15 000 € effectuée entre la société mère et sa filiale intégrée (Débitez le compte de produit 701 pour l'annuler).",
                accountsAllowed: ["701", "101"],
                expectedEntries: { "701": { debit: 15000 }, "101": { credit: 15000 } }
            },
            explanation: { success: "Excellent. Débiter le compte 701 permet de faire disparaître cette vente interne du Chiffre d'Affaires consolidé global." }
        },
        2: {
            title: "L3/M1 - Étape 2 : Opérations en Devises & Perte de Change",
            theory: "Lors de transactions hors zone Euro, la fluctuation des monnaies modifie la valeur des créances. Si au moment du règlement effectif d'un client étranger, le taux de change a évolué en notre défaveur, l'écart se solde par une Perte de Change réelle (compte financier 666).",
            exercise: {
                instruction: "Un client export règle sa facture. Suite à la baisse du Dollar, vous ne recevez que 9 500 € en banque pour solder une créance historique enregistrée pour 10 000 €. Enregistrez la transaction.",
                accountsAllowed: ["512", "666", "411"],
                expectedEntries: { "512": { debit: 9500 }, "666": { debit: 500 }, "411": { credit: 10000 } }
            },
            explanation: { success: "Écriture d'expert validée. La créance d'origine est apurée (Crédit 411 pour 10 000 €), la banque prend le cash réel et la perte de change est matérialisée au débit du 666." }
        },
        3: {
            title: "L3/M1 - Étape 3 : Clients Douteux et Dépréciations de Créances",
            theory: "En vertu du principe de prudence, si un client rencontre de graves difficultés financières (redressement judiciaire), sa créance devient incertaine. On doit la reclasser en compte 'Clients douteux' (416) puis constater le risque de perte par une dotation aux dépréciations (656).",
            exercise: {
                instruction: "Un client qui vous doit 5 000 € est déclaré en défaut. Reclassez immédiatement sa créance du compte client standard (411) vers le compte client douteux (416).",
                accountsAllowed: ["416", "411"],
                expectedEntries: { "416": { debit: 5000 }, "411": { credit: 5000 } }
            },
            explanation: { success: "Écriture de reclassement parfaite ! Le risque est désormais tracé et isolé dans la balance." }
        }
    },

    // ==========================================
    // MODULE 4 : MASTER 2 - FISCALITÉ AVANCÉE DES ENTREPRISES
    // ==========================================
    mod4: {
        1: {
            title: "M2 - Étape 1 : Liquidation Annuelle de l'Impôt sur les Sociétés",
            theory: "L'Impôt sur les Sociétés (IS) est calculé sur le résultat fiscal de l'entité. C'est une charge obligatoire qui vient grever le résultat comptable de l'année (compte 695) et fait naître une dette exigible à court terme envers le Trésor Public (compte 401).",
            exercise: {
                instruction: "Calculez et passez l'écriture de constatation de l'IS annuel de l'entreprise s'élevant à 8 500 € pour l'exercice clos.",
                accountsAllowed: ["695", "401"],
                expectedEntries: { "695": { debit: 8500 }, "401": { credit: 8500 } }
            },
            explanation: { success: "Exact. L'impôt réduit le bénéfice net distribuable (Débit 695) et la dette fiscale est actée au passif avant son règlement." }
        },
        2: {
            title: "M2 - Étape 2 : Déclaration de TVA - Liquidation Mensuelle",
            theory: "Chaque mois, le comptable fait la synthèse de la TVA. Il solde la TVA collectée (44571) et la TVA déductible (44566). Si la TVA collectée est supérieure, la différence constitue une TVA à payer (44551) à l'État.",
            exercise: {
                instruction: "Liquidez la TVA du mois : soldez 2 000 € de TVA Collectée (Débit) et 1 000 € de TVA Déductible (Crédit) puis constatez le montant dû au Trésor Public.",
                accountsAllowed: ["44571", "44566", "44551"],
                expectedEntries: { "44571": { debit: 2000 }, "44566": { credit: 1000 }, "44551": { credit: 1000 } }
            },
            explanation: { success: "Félicitations, l'écriture de liquidation est équilibrée. Les comptes transitoires de TVA sont remis à zéro pour le mois suivant." }
        }
    },

    // ==========================================
    // MODULE 5 : MASTER 2 - GESTION SOCIALE ET DE LA PAIE
    // ==========================================
    mod5: {
        1: {
            title: "M2 - Étape 1 : Enregistrement de la Masse Salariale Brute",
            theory: "La gestion sociale exige une rigueur absolue. Le salaire brut représente l'obligation contractuelle globale de l'employeur. Il s'enregistre au débit du compte de charge 641. En contrepartie, on enregistre l'engagement de payer le net aux employés au crédit du compte de tiers 411.",
            exercise: {
                instruction: "Passez l'écriture de centralisation des salaires du mois : Salaire brut de 5 000 € pour une dette nette de rémunération de 4 000 € envers l'équipe.",
                accountsAllowed: ["641", "411"],
                expectedEntries: { "641": { debit: 5000 }, "411": { credit: 4000 } }
            },
            explanation: { success: "Parfait. L'écart de 1 000 € correspond aux retenues pour charges salariales qui seront reversées aux organismes sociaux." }
        },
        2: {
            title: "M2 - Étape 2 : Intégration des Charges Patronales (URSSAF)",
            theory: "Au-delà du brut, l'entreprise doit s'acquitter de sa quote-part de cotisations patronales pour financer la protection sociale. C'est un coût direct d'exploitation à débiter au compte 645 (Charges de sécurité sociale) augmentant la dette envers l'URSSAF (Crédit du compte 431).",
            exercise: {
                instruction: "Comptabilisez les charges patronales du mois notifiées par les organismes sociaux pour un montant de 1 200 €.",
                accountsAllowed: ["645", "431"],
                expectedEntries: { "645": { debit: 1200 }, "431": { credit: 1200 } }
            },
            explanation: { success: "Magnifique. Ton écriture sociale est complète. Les charges augmentent (645) et le passif social est acté (431)." }
        }
    },

    // ==========================================
    // SIMULATEURS DE SYNTHÈSE (OUVERTURE À CLÔTURE)
    // ==========================================
    boulangerie: {
        1: {
            title: "Mois 1 : Financement & Apport",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Dépôt du capital social de 20 000 € et déblocage de l'emprunt bancaire de 30 000 €.",
                accountsAllowed: ["512", "101", "164"],
                expectedEntries: { "512": { debit: 50000 }, "101": { credit: 20000 }, "164": { credit: 30000 } }
            },
            explanation: { success: "Fonds d'ouverture disponibles en banque." }
        },
        2: {
            title: "Mois 2 : Acquisition du Four",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Achat d'un four professionnel d'une valeur de 15 000 € HT payé au comptant par la banque.",
                accountsAllowed: ["215", "512"],
                expectedEntries: { "215": { debit: 15000 }, "512": { credit: 15000 } }
            },
            explanation: { success: "Le matériel industriel lourd entre à l'actif." }
        },
        3: {
            title: "Mois 3 à 10 : Ventes récurrentes de pains",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Enregistrement des ventes de l'année pour 40 000 € HT (+ 2 200 € de TVA Collectée). Reçu en banque.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 42200 }, "701": { credit: 40000 }, "44571": { credit: 2200 } }
            },
            explanation: { success: "Chiffre d'affaires annuel enregistré." }
        },
        4: {
            title: "Mois 11 : Achat de farine",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Achat de farine pour 10 000 € HT (+ 550 € de TVA déductible) facturés à crédit par le fournisseur.",
                accountsAllowed: ["601", "44566", "401"],
                expectedEntries: { "601": { debit: 10000 }, "44566": { debit: 550 }, "401": { credit: 10550 } }
            },
            explanation: { success: "Dette fournisseur et charge constatées." }
        },
        5: {
            title: "Mois 11 : Règlement du meunier",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Paiement par virement bancaire de la totalité de la facture du fournisseur pour 10 550 €.",
                accountsAllowed: ["401", "512"],
                expectedEntries: { "401": { debit: 10550 }, "512": { credit: 10550 } }
            },
            explanation: { success: "Dette fournisseur apurée." }
        },
        6: {
            title: "Mois 12 : Salaire de l'apprenti",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Enregistrez le salaire brut de l'apprenti pour 2 000 € et la dette nette due de 1 600 € (compte 411).",
                accountsAllowed: ["641", "411"],
                expectedEntries: { "641": { debit: 2000 }, "411": { credit: 1600 } }
            },
            explanation: { success: "Salaire enregistré (reliquat temporaire d'équilibre)." }
        },
        7: {
            title: "Mois 12 : Charges patronales URSSAF",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Saisissez les cotisations patronales associées au salaire pour un montant de 400 € due à l'URSSAF (431).",
                accountsAllowed: ["645", "431"],
                expectedEntries: { "645": { debit: 400 }, "431": { credit: 400 } }
            },
            explanation: { success: "Charges sociales d'usine ajustées, le bilan s'équilibre à nouveau !" }
        },
        8: {
            title: "Mois 12 : Virement de l'apprenti",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Solder le compte de dette nette du personnel pour verser les 1 600 € par virement bancaire.",
                accountsAllowed: ["411", "512"],
                expectedEntries: { "411": { debit: 1600 }, "512": { credit: 1600 } }
            },
            explanation: { success: "Salaire décaissé." }
        },
        9: {
            title: "Inventaire : Vente d'un vieux pétrin",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Cession d'une ancienne machine d'occasion facturée à un confrère à crédit pour 10 000 € (Compte 411).",
                accountsAllowed: ["411", "775"],
                expectedEntries: { "411": { debit: 10000 }, "775": { credit: 10000 } }
            },
            explanation: { success: "Produit exceptionnel de cession enregistré." }
        },
        10: {
            title: "Inventaire : Sortie de l'actif cédé",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Sortez la valeur d'origine comptable du pétrin cédé (10 000 €) du patrimoine de l'actif.",
                accountsAllowed: ["675", "215"],
                expectedEntries: { "675": { debit: 10000 }, "215": { credit: 10000 } }
            },
            explanation: { success: "Actif sorti du grand livre." }
        },
        11: {
            title: "Inventaire : Déclaration de TVA",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Soldez la TVA collectée (2 200 €) et la TVA déductible (550 €) pour fixer la TVA nette à payer (44551).",
                accountsAllowed: ["44571", "44566", "44551"],
                expectedEntries: { "44571": { debit: 2200 }, "44566": { credit: 550 }, "44551": { credit: 1650 } }
            },
            explanation: { success: "Opération d'inventaire de TVA bouclée." }
        },
        12: {
            title: "Inventaire : Amortissement du four",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Passez la dotation annuelle linéaire de 20% sur la valeur du four de 15 000 € (soit 3 000 €).",
                accountsAllowed: ["6811", "2815"],
                expectedEntries: { "6811": { debit: 3000 }, "2815": { credit: 3000 } }
            },
            explanation: { success: "Dépréciation annuelle calculée." }
        },
        13: {
            title: "Inventaire : Stock de farine restant",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Constatez le stock final de matières premières évalué à l'inventaire physique pour 2 000 €.",
                accountsAllowed: ["311", "6031"],
                expectedEntries: { "311": { debit: 2000 }, "6031": { credit: 2000 } }
            },
            explanation: { success: "Stock d'actif mis à jour." }
        },
        14: {
            title: "Fiscalité : Liquidation de l'IS",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Enregistrez la charge finale calculée d'Impôt sur les Sociétés s'élevant à 2 500 €.",
                accountsAllowed: ["695", "401"],
                expectedEntries: { "695": { debit: 2500 }, "401": { credit: 2500 } }
            },
            explanation: { success: "IS comptabilisé." }
        },
        15: {
            title: "Clôture annuelle définitive",
            theory: "Cas pratique Boulangerie.",
            exercise: {
                instruction: "Tout est parfait. Passez une ligne technique neutre à 0 € sur le compte 101 pour archiver.",
                accountsAllowed: ["101"],
                expectedEntries: { "101": { debit: 0 } }
            },
            explanation: { success: "Exercice validé avec succès !" }
        }
    },
    saas: {
        1: { title: "Frais de R&D Logiciel", theory: "Cas SaaS", exercise: { instruction: "Activation des développements à l'actif pour 25 000 €.", accountsAllowed: ["203", "721"], expectedEntries: { "203": { debit: 25000 }, "721": { credit: 25000 } } }, explanation: { success: "Immobilisation incorporelle générée." } }
    },
    industrie: {
        1: { title: "Lancement Ligne Robotique", theory: "Cas Usine", exercise: { instruction: "Emprunt d'infrastructure de 500 000 € encaissé en banque.", accountsAllowed: ["512", "164"], expectedEntries: { "512": { debit: 500000 }, "164": { credit: 500000 } } }, explanation: { success: "Financement usine validé." } }
    }
};
