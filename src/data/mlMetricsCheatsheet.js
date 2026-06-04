/**
 * Cheatsheet complète des métriques essentielles en Machine Learning
 * Couvre : Régression, Classification, Clustering, et métriques avancées
 */

const ML_METRICS_CHEATSHEET = {
  id: 'ml-metrics',
  title: 'Métriques Machine Learning',
  icon: '🤖',
  description: 'Toutes les métriques essentielles pour évaluer vos modèles ML',
  sections: [
    // ═══════════════════════════════════════════════════════════════
    // RÉGRESSION
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'regression',
      title: '📈 Régression',
      description: 'Prédiction de valeurs continues (prix, température, ventes...)',
      colorHex: '#60a5fa',
      metrics: [
        {
          name: 'MAE (Mean Absolute Error)',
          formula: 'MAE = (1/n) × Σ|yᵢ - ŷᵢ|',
          formulaLatex: '\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^{n} |y_i - \\hat{y}_i|',
          interpretation: "Erreur moyenne absolue entre prédictions et valeurs réelles. S'interprète dans l'unité de la variable cible.",
          range: '[0, +∞) — Plus bas = meilleur',
          useCases: [
            'Quand toutes les erreurs ont la même importance',
            'Prédiction de prix immobilier',
            'Estimation de délais de livraison',
            'Quand on veut une métrique facilement interprétable'
          ],
          pros: ['Robuste aux outliers', 'Interprétation intuitive', 'Même unité que la cible'],
          cons: ['Ne pénalise pas assez les grosses erreurs', 'Non différentiable en 0'],
          example: 'Si MAE = 5000€ pour prédire des prix de maisons, en moyenne on se trompe de 5000€'
        },
        {
          name: 'MSE (Mean Squared Error)',
          formula: 'MSE = (1/n) × Σ(yᵢ - ŷᵢ)²',
          formulaLatex: '\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2',
          interpretation: 'Moyenne des erreurs au carré. Pénalise fortement les grandes erreurs.',
          range: '[0, +∞) — Plus bas = meilleur',
          useCases: [
            'Quand les grandes erreurs sont coûteuses',
            'Optimisation de modèles (fonction de perte)',
            'Comparaison de modèles sur le même dataset'
          ],
          pros: ['Différentiable partout', 'Pénalise les outliers', 'Standard en optimisation'],
          cons: ['Unité au carré (difficile à interpréter)', 'Très sensible aux outliers'],
          example: 'MSE = 25000000 pour des prix → RMSE = 5000€ est plus parlant'
        },
        {
          name: 'RMSE (Root Mean Squared Error)',
          formula: 'RMSE = √MSE = √[(1/n) × Σ(yᵢ - ŷᵢ)²]',
          formulaLatex: '\\text{RMSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}',
          interpretation: 'Racine carrée de MSE, revient dans l\'unité de la cible tout en pénalisant les grandes erreurs.',
          range: '[0, +∞) — Plus bas = meilleur',
          useCases: [
            'Métrique de référence en régression',
            'Compétitions Kaggle',
            'Quand on veut pénaliser les erreurs importantes',
            'Reporting avec unité interprétable'
          ],
          pros: ['Même unité que la cible', 'Pénalise les grandes erreurs', 'Standard industriel'],
          cons: ['Sensible aux outliers', 'Moins robuste que MAE'],
          example: 'RMSE = 5000€ signifie une erreur "typique" de 5000€, mais les grandes erreurs pèsent plus'
        },
        {
          name: 'R² (Coefficient de détermination)',
          formula: 'R² = 1 - [Σ(yᵢ - ŷᵢ)² / Σ(yᵢ - ȳ)²]',
          formulaLatex: 'R^2 = 1 - \\frac{\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2}{\\sum_{i=1}^{n}(y_i - \\bar{y})^2}',
          interpretation: 'Proportion de variance expliquée par le modèle. 1 = parfait, 0 = aussi bon que la moyenne.',
          range: '(-∞, 1] — 1 = parfait, 0 = modèle naïf',
          useCases: [
            'Comparer des modèles sur différents datasets',
            'Évaluer la qualité globale d\'un modèle',
            'Communication avec des non-techniciens'
          ],
          pros: ['Sans unité (comparable entre datasets)', 'Intuitif (% de variance expliquée)', 'Standard statistique'],
          cons: ['Peut être négatif (pire que la moyenne)', 'Augmente artificiellement avec plus de features', 'Pas adapté aux modèles non-linéaires simples'],
          example: 'R² = 0.85 signifie que le modèle explique 85% de la variance des données'
        },
        {
          name: 'R² Ajusté',
          formula: 'R²ₐdj = 1 - [(1-R²)(n-1) / (n-p-1)]',
          formulaLatex: 'R^2_{adj} = 1 - \\frac{(1-R^2)(n-1)}{n-p-1}',
          interpretation: 'R² corrigé pour le nombre de features (p). Pénalise l\'ajout de variables inutiles.',
          range: '(-∞, 1] — 1 = parfait',
          useCases: [
            'Sélection de features',
            'Comparer des modèles avec différents nombres de variables',
            'Éviter l\'overfitting par ajout de features'
          ],
          pros: ['Pénalise la complexité', 'Plus fiable que R² simple'],
          cons: ['Moins intuitif', 'Pas toujours disponible'],
          example: 'Si R² = 0.90 mais R²_adj = 0.75, le modèle a trop de features inutiles'
        },
        {
          name: 'MAPE (Mean Absolute Percentage Error)',
          formula: 'MAPE = (100/n) × Σ|(yᵢ - ŷᵢ)/yᵢ|',
          formulaLatex: '\\text{MAPE} = \\frac{100}{n} \\sum_{i=1}^{n} \\left| \\frac{y_i - \\hat{y}_i}{y_i} \\right|',
          interpretation: 'Erreur moyenne en pourcentage. Indépendante de l\'échelle.',
          range: '[0, +∞) % — Plus bas = meilleur',
          useCases: [
            'Prévision de ventes / demande',
            'Comparer des prédictions à différentes échelles',
            'Reporting business (% compréhensible)'
          ],
          pros: ['Interprétation en %', 'Indépendant de l\'échelle'],
          cons: ['Problème si y = 0', 'Asymétrique (sur/sous-estimation)', 'Favorise les sous-estimations'],
          example: 'MAPE = 10% signifie qu\'en moyenne on se trompe de 10% par rapport à la vraie valeur'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CLASSIFICATION BINAIRE
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'classification-binary',
      title: '🎯 Classification Binaire',
      description: 'Prédiction de deux classes (spam/non-spam, malade/sain, fraude/légitime...)',
      colorHex: '#34d399',
      metrics: [
        {
          name: 'Accuracy (Exactitude)',
          formula: 'Accuracy = (TP + TN) / (TP + TN + FP + FN)',
          formulaLatex: '\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}',
          interpretation: 'Proportion de prédictions correctes parmi toutes les prédictions.',
          range: '[0, 1] — 1 = parfait',
          useCases: [
            'Classes équilibrées uniquement',
            'Vue d\'ensemble rapide',
            'Quand les deux types d\'erreurs ont le même coût'
          ],
          pros: ['Simple à comprendre', 'Vue globale'],
          cons: ['TROMPEUR sur classes déséquilibrées', 'Ne distingue pas les types d\'erreurs'],
          example: '⚠️ Si 95% de mails sont légitimes, un modèle qui dit toujours "légitime" a 95% accuracy mais rate tous les spams!'
        },
        {
          name: 'Precision (Précision)',
          formula: 'Precision = TP / (TP + FP)',
          formulaLatex: '\\text{Precision} = \\frac{TP}{TP + FP}',
          interpretation: 'Parmi les prédictions positives, combien sont vraiment positives ? "Quand je dis oui, ai-je raison ?"',
          range: '[0, 1] — 1 = aucun faux positif',
          useCases: [
            'Quand les faux positifs sont coûteux',
            'Détection de spam (ne pas perdre de vrais mails)',
            'Recommandation (ne pas ennuyer l\'utilisateur)',
            'Recrutement (ne pas convoquer de mauvais candidats)'
          ],
          pros: ['Focus sur la qualité des positifs détectés'],
          cons: ['Ignore les faux négatifs', 'Peut être maximisée en ne prédisant qu\'un seul cas sûr'],
          example: 'Precision = 0.9 → 90% des alertes de fraude sont de vraies fraudes'
        },
        {
          name: 'Recall / Sensibilité (TPR)',
          formula: 'Recall = TP / (TP + FN)',
          formulaLatex: '\\text{Recall} = \\frac{TP}{TP + FN}',
          interpretation: 'Parmi tous les vrais positifs, combien ai-je détectés ? "Combien de cas positifs ai-je trouvés ?"',
          range: '[0, 1] — 1 = aucun faux négatif',
          useCases: [
            'Quand les faux négatifs sont coûteux',
            'Diagnostic médical (ne pas rater de malades)',
            'Détection de fraude (attraper tous les fraudeurs)',
            'Sécurité (détecter toutes les menaces)'
          ],
          pros: ['Focus sur la détection exhaustive'],
          cons: ['Ignore les faux positifs', 'Peut être maximisée en disant toujours "positif"'],
          example: 'Recall = 0.95 → On détecte 95% des patients malades'
        },
        {
          name: 'F1-Score',
          formula: 'F1 = 2 × (Precision × Recall) / (Precision + Recall)',
          formulaLatex: 'F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
          interpretation: 'Moyenne harmonique de Precision et Recall. Équilibre entre les deux.',
          range: '[0, 1] — 1 = parfait équilibre',
          useCases: [
            'Classes déséquilibrées',
            'Quand Precision et Recall sont tous deux importants',
            'Comparaison de modèles sur données déséquilibrées',
            'Détection d\'anomalies'
          ],
          pros: ['Équilibre precision/recall', 'Robuste aux classes déséquilibrées'],
          cons: ['Ignore les vrais négatifs', 'Suppose que precision = recall en importance'],
          example: 'F1 = 0.8 avec Precision=0.75 et Recall=0.86 → bon compromis'
        },
        {
          name: 'Specificity (Spécificité / TNR)',
          formula: 'Specificity = TN / (TN + FP)',
          formulaLatex: '\\text{Specificity} = \\frac{TN}{TN + FP}',
          interpretation: 'Parmi tous les vrais négatifs, combien sont bien identifiés ? "Quand c\'est non, suis-je sûr ?"',
          range: '[0, 1] — 1 = aucun faux positif',
          useCases: [
            'Tests médicaux (confirmer l\'absence de maladie)',
            'Quand les faux positifs stressent (tests de dépistage)',
            'Justice (ne pas condamner d\'innocents)'
          ],
          pros: ['Focus sur les négatifs corrects', 'Complémentaire au Recall'],
          cons: ['Moins utilisée seule'],
          example: 'Specificity = 0.98 → On évite 98% des fausses alertes'
        },
        {
          name: 'AUC-ROC',
          formula: 'AUC = ∫ ROC curve = P(score(+) > score(-))',
          formulaLatex: '\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR}^{-1}(x)) dx',
          interpretation: 'Capacité du modèle à distinguer les classes. Probabilité qu\'un positif ait un score plus élevé qu\'un négatif.',
          range: '[0, 1] — 0.5 = aléatoire, 1 = parfait',
          useCases: [
            'Comparer des modèles indépendamment du seuil',
            'Quand le seuil optimal n\'est pas connu',
            'Évaluation globale de la capacité discriminante',
            'Classes relativement équilibrées'
          ],
          pros: ['Indépendant du seuil', 'Interprétation probabiliste', 'Standard'],
          cons: ['Peut être trompeur sur classes très déséquilibrées', 'Ne dit pas où placer le seuil'],
          example: 'AUC = 0.92 → Le modèle distingue très bien les classes'
        },
        {
          name: 'AUC-PR (Precision-Recall AUC)',
          formula: 'AUC-PR = ∫ Precision(Recall) dRecall',
          formulaLatex: '\\text{AUC-PR} = \\int_0^1 \\text{Precision}(r) dr',
          interpretation: 'Aire sous la courbe Precision-Recall. Plus adapté aux classes déséquilibrées.',
          range: '[0, 1] — baseline = ratio de positifs',
          useCases: [
            'Classes très déséquilibrées (fraude, maladies rares)',
            'Quand la classe positive est minoritaire et importante',
            'Alternative à AUC-ROC sur données skewed'
          ],
          pros: ['Mieux pour classes déséquilibrées', 'Focus sur la classe positive'],
          cons: ['Baseline dépend du ratio de classes', 'Moins connu'],
          example: 'Sur 1% de fraudes, AUC-PR est plus informatif que AUC-ROC'
        },
        {
          name: 'Log Loss (Cross-Entropy)',
          formula: 'LogLoss = -(1/n) × Σ[yᵢ log(pᵢ) + (1-yᵢ) log(1-pᵢ)]',
          formulaLatex: '\\text{LogLoss} = -\\frac{1}{n} \\sum_{i=1}^{n} [y_i \\log(p_i) + (1-y_i) \\log(1-p_i)]',
          interpretation: 'Pénalise les prédictions confiantes mais fausses. Mesure la qualité des probabilités.',
          range: '[0, +∞) — Plus bas = meilleur',
          useCases: [
            'Quand les probabilités sont importantes (pas juste la classe)',
            'Calibration de modèles',
            'Compétitions ML',
            'Quand on veut pénaliser la sur-confiance'
          ],
          pros: ['Évalue les probabilités', 'Pénalise la sur-confiance', 'Différentiable'],
          cons: ['Difficile à interpréter', 'Sensible aux outliers de probabilité'],
          example: 'LogLoss = 0.3 est bon, LogLoss = 2+ est mauvais'
        },
        {
          name: 'MCC (Matthews Correlation Coefficient)',
          formula: 'MCC = (TP×TN - FP×FN) / √[(TP+FP)(TP+FN)(TN+FP)(TN+FN)]',
          formulaLatex: '\\text{MCC} = \\frac{TP \\times TN - FP \\times FN}{\\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}',
          interpretation: 'Corrélation entre prédictions et réalité. Considère les 4 cases de la matrice de confusion.',
          range: '[-1, 1] — 1 = parfait, 0 = aléatoire, -1 = inversé',
          useCases: [
            'Classes très déséquilibrées',
            'Quand on veut une métrique unique équilibrée',
            'Alternative robuste à l\'accuracy'
          ],
          pros: ['Utilise toute la matrice de confusion', 'Robuste au déséquilibre', 'Symétrique'],
          cons: ['Moins intuitif', 'Undefined si une ligne/colonne est zéro'],
          example: 'MCC = 0.7 sur données déséquilibrées est très bon'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CLASSIFICATION MULTICLASSE
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'classification-multiclass',
      title: '🏷️ Classification Multiclasse',
      description: 'Prédiction parmi plusieurs classes (reconnaissance d\'images, catégorisation de texte...)',
      colorHex: '#a78bfa',
      metrics: [
        {
          name: 'Macro-Average',
          formula: 'Macro = (1/K) × Σ Metricₖ',
          formulaLatex: '\\text{Macro-Avg} = \\frac{1}{K} \\sum_{k=1}^{K} \\text{Metric}_k',
          interpretation: 'Moyenne simple des métriques par classe. Chaque classe a le même poids.',
          range: 'Dépend de la métrique sous-jacente',
          useCases: [
            'Quand toutes les classes sont également importantes',
            'Classes minoritaires importantes',
            'Évaluation équitable entre classes'
          ],
          pros: ['Traite toutes les classes équitablement', 'Met en valeur les performances sur classes rares'],
          cons: ['Peut être tiré vers le bas par une classe difficile'],
          example: 'Macro-F1 = moyenne des F1 de chaque classe'
        },
        {
          name: 'Micro-Average',
          formula: 'Micro = ΣTPₖ / (ΣTPₖ + ΣFPₖ)',
          formulaLatex: '\\text{Micro-Avg} = \\frac{\\sum_k TP_k}{\\sum_k TP_k + \\sum_k FP_k}',
          interpretation: 'Agrège toutes les prédictions puis calcule la métrique. Pondéré par fréquence.',
          range: 'Dépend de la métrique sous-jacente',
          useCases: [
            'Quand les classes fréquentes sont plus importantes',
            'Grosse quantité de données',
            'Performance globale brute'
          ],
          pros: ['Reflète la performance globale', 'Pondéré naturellement'],
          cons: ['Dominé par les classes majoritaires', 'Peut masquer les problèmes sur classes rares'],
          example: 'Micro-F1 = accuracy pour classification multiclasse exclusive'
        },
        {
          name: 'Weighted-Average',
          formula: 'Weighted = Σ(nₖ × Metricₖ) / Σnₖ',
          formulaLatex: '\\text{Weighted-Avg} = \\frac{\\sum_k n_k \\times \\text{Metric}_k}{\\sum_k n_k}',
          interpretation: 'Moyenne pondérée par le support (nombre d\'exemples) de chaque classe.',
          range: 'Dépend de la métrique sous-jacente',
          useCases: [
            'Compromis entre macro et micro',
            'Quand le déséquilibre reflète l\'importance réelle',
            'Reporting standard'
          ],
          pros: ['Compromis raisonnable', 'Tient compte du support'],
          cons: ['Peut masquer les problèmes sur petites classes'],
          example: 'Classification de sentiments avec 70% neutre, 20% positif, 10% négatif'
        },
        {
          name: 'Top-K Accuracy',
          formula: 'Top-K = (1/n) × Σ 𝟙(yᵢ ∈ top-K predictions)',
          formulaLatex: '\\text{Top-K Acc} = \\frac{1}{n} \\sum_{i=1}^{n} \\mathbb{1}(y_i \\in \\text{top-K})',
          interpretation: 'La vraie classe est-elle dans les K premières prédictions ?',
          range: '[0, 1] — 1 = toujours dans le top-K',
          useCases: [
            'Beaucoup de classes (ImageNet)',
            'Suggestions multiples acceptables',
            'Recherche et recommandation'
          ],
          pros: ['Plus permissif', 'Réaliste pour beaucoup de classes'],
          cons: ['Ne dit pas la position exacte'],
          example: 'Top-5 Accuracy = 0.94 sur ImageNet (1000 classes)'
        },
        {
          name: 'Cohen\'s Kappa',
          formula: 'κ = (pₒ - pₑ) / (1 - pₑ)',
          formulaLatex: '\\kappa = \\frac{p_o - p_e}{1 - p_e}',
          interpretation: 'Accord au-delà du hasard. Corrige l\'accuracy pour la distribution des classes.',
          range: '[-1, 1] — 1 = accord parfait, 0 = hasard',
          useCases: [
            'Annotation manuelle (accord inter-annotateurs)',
            'Classes déséquilibrées',
            'Comparer à un modèle aléatoire'
          ],
          pros: ['Corrige pour le hasard', 'Robuste au déséquilibre'],
          cons: ['Interprétation délicate', 'Peut être négatif'],
          example: 'κ = 0.7 → accord substantiel au-delà du hasard'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CLUSTERING
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'clustering',
      title: '🔮 Clustering',
      description: 'Regroupement non supervisé (segmentation clients, détection d\'anomalies...)',
      colorHex: '#f472b6',
      metrics: [
        {
          name: 'Silhouette Score',
          formula: 's(i) = (b(i) - a(i)) / max(a(i), b(i))',
          formulaLatex: 's(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}',
          interpretation: 'a(i) = distance moyenne intra-cluster, b(i) = distance au cluster le plus proche. Mesure la cohésion et séparation.',
          range: '[-1, 1] — 1 = clusters bien séparés, 0 = chevauchement, -1 = mal assigné',
          useCases: [
            'Choisir le nombre de clusters (méthode elbow)',
            'Évaluer la qualité globale du clustering',
            'Comparer différents algorithmes'
          ],
          pros: ['Pas besoin de labels', 'Interprétable', 'Détecte les outliers'],
          cons: ['Coûteux en calcul (O(n²))', 'Sensible à la forme des clusters'],
          example: 'Silhouette = 0.6 → Bons clusters, 0.2 → clusters flous'
        },
        {
          name: 'Inertie (Within-Cluster Sum of Squares)',
          formula: 'Inertia = Σₖ Σᵢ∈Cₖ ||xᵢ - μₖ||²',
          formulaLatex: '\\text{Inertia} = \\sum_{k=1}^{K} \\sum_{i \\in C_k} ||x_i - \\mu_k||^2',
          interpretation: 'Somme des distances au carré de chaque point à son centroïde. Mesure la compacité.',
          range: '[0, +∞) — Plus bas = clusters plus compacts',
          useCases: [
            'Méthode du coude (elbow method)',
            'K-Means',
            'Suivre la convergence'
          ],
          pros: ['Simple', 'Rapide', 'Native à K-Means'],
          cons: ['Diminue toujours avec plus de K', 'Favorise les clusters sphériques'],
          example: 'Tracer inertie vs K, chercher le "coude"'
        },
        {
          name: 'Davies-Bouldin Index',
          formula: 'DB = (1/K) × Σₖ maxⱼ≠ₖ [(σₖ + σⱼ) / d(cₖ, cⱼ)]',
          formulaLatex: '\\text{DB} = \\frac{1}{K} \\sum_{k=1}^{K} \\max_{j \\neq k} \\frac{\\sigma_k + \\sigma_j}{d(c_k, c_j)}',
          interpretation: 'Ratio moyen entre dispersion intra-cluster et distance inter-cluster.',
          range: '[0, +∞) — Plus bas = meilleur',
          useCases: [
            'Choisir K automatiquement',
            'Comparer des clusterings',
            'Alternative à Silhouette (plus rapide)'
          ],
          pros: ['Plus rapide que Silhouette', 'Pas besoin de labels'],
          cons: ['Suppose des clusters convexes', 'Sensible aux outliers'],
          example: 'DB = 0.5 est bon, DB > 1 indique des problèmes'
        },
        {
          name: 'Calinski-Harabasz Index',
          formula: 'CH = [BSS/(K-1)] / [WSS/(n-K)]',
          formulaLatex: '\\text{CH} = \\frac{\\text{BSS}/(K-1)}{\\text{WSS}/(n-K)}',
          interpretation: 'Ratio variance inter-cluster / variance intra-cluster. Plus haut = clusters denses et bien séparés.',
          range: '[0, +∞) — Plus haut = meilleur',
          useCases: [
            'Sélection rapide de K',
            'Grands datasets',
            'Alternative efficace à Silhouette'
          ],
          pros: ['Très rapide O(n)', 'Efficace sur gros datasets'],
          cons: ['Favorise les clusters convexes et denses'],
          example: 'Chercher le K qui maximise CH'
        },
        {
          name: 'Adjusted Rand Index (ARI)',
          formula: 'ARI = (RI - Expected_RI) / (max_RI - Expected_RI)',
          formulaLatex: '\\text{ARI} = \\frac{\\text{RI} - E[\\text{RI}]}{\\max(\\text{RI}) - E[\\text{RI}]}',
          interpretation: 'Similarité entre clustering et labels réels, ajustée pour le hasard.',
          range: '[-1, 1] — 1 = identique aux labels, 0 = aléatoire',
          useCases: [
            'Quand on a les vrais labels (validation)',
            'Comparer un clustering à une référence',
            'Benchmark d\'algorithmes'
          ],
          pros: ['Ajusté pour le hasard', 'Standard de référence'],
          cons: ['Nécessite les vrais labels'],
          example: 'ARI = 0.8 → Le clustering correspond bien aux classes réelles'
        },
        {
          name: 'Normalized Mutual Information (NMI)',
          formula: 'NMI = 2 × I(U,V) / [H(U) + H(V)]',
          formulaLatex: '\\text{NMI} = \\frac{2 \\times I(U,V)}{H(U) + H(V)}',
          interpretation: 'Information partagée entre clustering et labels, normalisée par entropie.',
          range: '[0, 1] — 1 = parfaite correspondance',
          useCases: [
            'Comparaison avec ground truth',
            'Quand le nombre de clusters diffère',
            'Alternative à ARI'
          ],
          pros: ['Normalisé [0,1]', 'Fonctionne avec K différents'],
          cons: ['Nécessite les vrais labels', 'Peut être biaisé vers plus de clusters'],
          example: 'NMI = 0.9 → Très bonne correspondance'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // RANKING & RECOMMANDATION
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'ranking',
      title: '📊 Ranking & Recommandation',
      description: 'Classement et systèmes de recommandation (moteurs de recherche, suggestions...)',
      colorHex: '#fbbf24',
      metrics: [
        {
          name: 'Precision@K',
          formula: 'P@K = (items pertinents dans top-K) / K',
          formulaLatex: 'P@K = \\frac{|\\{\\text{relevant}\\} \\cap \\{\\text{top-K}\\}|}{K}',
          interpretation: 'Proportion d\'items pertinents parmi les K premiers recommandés.',
          range: '[0, 1] — 1 = tous pertinents',
          useCases: [
            'Recommandation (top-10 suggestions)',
            'Moteurs de recherche',
            'Quand l\'utilisateur voit peu de résultats'
          ],
          pros: ['Simple', 'Intuitif', 'Focus sur le haut du ranking'],
          cons: ['Ignore la position dans le top-K', 'Dépend de K choisi'],
          example: 'P@5 = 0.6 → 3 items pertinents sur les 5 premiers'
        },
        {
          name: 'Recall@K',
          formula: 'R@K = (items pertinents dans top-K) / (total pertinents)',
          formulaLatex: 'R@K = \\frac{|\\{\\text{relevant}\\} \\cap \\{\\text{top-K}\\}|}{|\\{\\text{relevant}\\}|}',
          interpretation: 'Proportion des items pertinents qui sont dans le top-K.',
          range: '[0, 1] — 1 = tous trouvés',
          useCases: [
            'Quand il faut tout retrouver',
            'Systèmes de recherche exhaustive',
            'Combiné avec Precision@K'
          ],
          pros: ['Focus sur la couverture', 'Complémente Precision'],
          cons: ['Peut être trompeur si peu d\'items pertinents'],
          example: 'R@10 = 0.8 → 80% des items pertinents sont dans le top-10'
        },
        {
          name: 'MAP (Mean Average Precision)',
          formula: 'MAP = (1/Q) × Σ AP(q)',
          formulaLatex: '\\text{MAP} = \\frac{1}{Q} \\sum_{q=1}^{Q} \\text{AP}(q)',
          interpretation: 'Moyenne des Average Precision sur plusieurs requêtes. Standard pour la recherche d\'information.',
          range: '[0, 1] — 1 = parfait',
          useCases: [
            'Évaluation de moteurs de recherche',
            'Plusieurs requêtes à évaluer',
            'Benchmark standard (TREC)'
          ],
          pros: ['Tient compte de la position', 'Standard académique'],
          cons: ['Nécessite des relevance labels binaires'],
          example: 'MAP = 0.7 → Bonne performance globale du moteur de recherche'
        },
        {
          name: 'NDCG (Normalized Discounted Cumulative Gain)',
          formula: 'NDCG@K = DCG@K / IDCG@K',
          formulaLatex: '\\text{NDCG}@K = \\frac{\\sum_{i=1}^{K} \\frac{rel_i}{\\log_2(i+1)}}{\\text{IDCG}@K}',
          interpretation: 'Gain cumulé pondéré par position, normalisé par le classement idéal. Supporte la pertinence graduée.',
          range: '[0, 1] — 1 = ordre parfait',
          useCases: [
            'Pertinence graduée (pas binaire)',
            'Moteurs de recherche commerciaux',
            'Quand la position exacte compte'
          ],
          pros: ['Supporte les relevances graduées', 'Pénalise les items pertinents mal classés'],
          cons: ['Plus complexe', 'Choix du gain function'],
          example: 'NDCG@10 = 0.85 → Le ranking est proche de l\'idéal'
        },
        {
          name: 'MRR (Mean Reciprocal Rank)',
          formula: 'MRR = (1/Q) × Σ (1/rankₖ)',
          formulaLatex: '\\text{MRR} = \\frac{1}{Q} \\sum_{q=1}^{Q} \\frac{1}{\\text{rank}_q}',
          interpretation: 'Inverse du rang du premier item pertinent, moyenné sur les requêtes.',
          range: '[0, 1] — 1 = toujours premier',
          useCases: [
            'Un seul item pertinent par requête',
            'Question-answering',
            'Recherche de la "bonne" réponse'
          ],
          pros: ['Simple', 'Focus sur la première réponse correcte'],
          cons: ['Ignore les autres items pertinents'],
          example: 'MRR = 0.5 → En moyenne, la bonne réponse est en position 2'
        },
        {
          name: 'Hit Rate (HR@K)',
          formula: 'HR@K = (1/n) × Σ 𝟙(item pertinent dans top-K)',
          formulaLatex: '\\text{HR}@K = \\frac{1}{n} \\sum_{i=1}^{n} \\mathbb{1}(\\text{relevant}_i \\in \\text{top-K})',
          interpretation: 'Proportion des utilisateurs pour qui au moins un item pertinent est dans le top-K.',
          range: '[0, 1] — 1 = tous ont au moins 1 bon',
          useCases: [
            'Recommandation',
            'Quand un seul bon item suffit',
            'Métrique business simple'
          ],
          pros: ['Très simple', 'Aligné avec l\'expérience utilisateur'],
          cons: ['Binaire (trouve ou non)', 'Ignore la position'],
          example: 'HR@10 = 0.95 → 95% des utilisateurs ont un bon item dans le top-10'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MÉTRIQUES PROBABILISTES & CALIBRATION
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'probabilistic',
      title: '🎲 Calibration & Probabilités',
      description: 'Qualité des probabilités prédites (fiabilité des confiances)',
      colorHex: '#fb923c',
      metrics: [
        {
          name: 'Brier Score',
          formula: 'Brier = (1/n) × Σ(pᵢ - yᵢ)²',
          formulaLatex: '\\text{Brier} = \\frac{1}{n} \\sum_{i=1}^{n} (p_i - y_i)^2',
          interpretation: 'MSE entre probabilités prédites et outcomes réels. Mesure calibration + discrimination.',
          range: '[0, 1] — 0 = parfait',
          useCases: [
            'Prévisions météo',
            'Diagnostic médical probabiliste',
            'Quand la confiance compte autant que la décision'
          ],
          pros: ['Proper scoring rule', 'Évalue calibration + discrimination'],
          cons: ['Ne distingue pas calibration de discrimination'],
          example: 'Brier = 0.15 est bon pour des prévisions binaires'
        },
        {
          name: 'Expected Calibration Error (ECE)',
          formula: 'ECE = Σₘ (nₘ/n) × |acc(Bₘ) - conf(Bₘ)|',
          formulaLatex: '\\text{ECE} = \\sum_{m=1}^{M} \\frac{n_m}{n} |\\text{acc}(B_m) - \\text{conf}(B_m)|',
          interpretation: 'Écart moyen entre confiance prédite et accuracy réelle, par bins de confiance.',
          range: '[0, 1] — 0 = parfaitement calibré',
          useCases: [
            'Évaluer si les probabilités sont fiables',
            'Systèmes critiques (médical, juridique)',
            'Avant déploiement de modèles'
          ],
          pros: ['Mesure directe de la calibration', 'Visualisable (reliability diagram)'],
          cons: ['Dépend du nombre de bins', 'Pas de consensus sur le calcul exact'],
          example: 'ECE = 0.05 → Quand le modèle dit 80%, il a raison ~80% du temps'
        },
        {
          name: 'Calibration Curve (Reliability Diagram)',
          formula: 'Pour chaque bin: accuracy vs predicted probability',
          formulaLatex: '\\text{Pour bin } m: \\text{accuracy}(B_m) \\text{ vs } \\text{mean\\_confidence}(B_m)',
          interpretation: 'Graphique comparant confiance moyenne à accuracy réelle par bins. Diagonale = calibration parfaite.',
          range: 'Visuel — proche de la diagonale = bien calibré',
          useCases: [
            'Diagnostic visuel de calibration',
            'Identifier sur/sous-confiance',
            'Communication des résultats'
          ],
          pros: ['Intuitif visuellement', 'Montre où le modèle se trompe'],
          cons: ['Qualitatif', 'Dépend des bins'],
          example: 'Courbe au-dessus de la diagonale → sur-confiant'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MÉTRIQUES NLP SPÉCIFIQUES
    // ═══════════════════════════════════════════════════════════════
    {
      category: 'nlp',
      title: '📝 NLP & Génération de texte',
      description: 'Métriques spécifiques au traitement du langage naturel',
      colorHex: '#14b8a6',
      metrics: [
        {
          name: 'BLEU (Bilingual Evaluation Understudy)',
          formula: 'BLEU = BP × exp(Σₙ wₙ log pₙ)',
          formulaLatex: '\\text{BLEU} = BP \\times \\exp\\left(\\sum_{n=1}^{N} w_n \\log p_n\\right)',
          interpretation: 'Mesure le chevauchement de n-grams entre texte généré et références. Standard en traduction.',
          range: '[0, 1] — 1 = identique à la référence',
          useCases: [
            'Traduction automatique',
            'Génération de texte',
            'Résumé automatique'
          ],
          pros: ['Standard historique', 'Rapide', 'Corrélé avec jugements humains (traduction)'],
          cons: ['Ignore la sémantique', 'Pénalise les reformulations valides', 'Peu fiable pour les textes courts'],
          example: 'BLEU = 0.4 est considéré comme une bonne traduction'
        },
        {
          name: 'ROUGE (Recall-Oriented Understudy for Gisting Evaluation)',
          formula: 'ROUGE-N = overlap n-grams / n-grams dans référence',
          formulaLatex: '\\text{ROUGE-N} = \\frac{\\sum_{S \\in \\text{Ref}} \\sum_{\\text{gram}_n} \\text{Count}_{\\text{match}}(\\text{gram}_n)}{\\sum_{S \\in \\text{Ref}} \\sum_{\\text{gram}_n} \\text{Count}(\\text{gram}_n)}',
          interpretation: 'Recall de n-grams entre texte généré et référence. ROUGE-L utilise la plus longue sous-séquence commune.',
          range: '[0, 1] — 1 = couverture parfaite',
          useCases: [
            'Résumé automatique',
            'Génération de texte',
            'Évaluation de chatbots'
          ],
          pros: ['Standard pour le résumé', 'Plusieurs variantes (1, 2, L)'],
          cons: ['Ignore la sémantique', 'Nécessite des références'],
          example: 'ROUGE-L = 0.5 → 50% de la référence couverte'
        },
        {
          name: 'Perplexité',
          formula: 'PPL = exp(-(1/N) × Σ log P(wᵢ|w<ᵢ))',
          formulaLatex: '\\text{PPL} = \\exp\\left(-\\frac{1}{N} \\sum_{i=1}^{N} \\log P(w_i | w_{<i})\\right)',
          interpretation: 'Inverse de la probabilité moyenne par mot. Mesure la "surprise" du modèle.',
          range: '[1, +∞) — Plus bas = meilleur',
          useCases: [
            'Évaluation de modèles de langage',
            'Comparaison de LLMs',
            'Sélection de modèles'
          ],
          pros: ['Standard pour LMs', 'Pas besoin de références'],
          cons: ['Dépend du vocabulaire', 'Ne mesure pas la qualité du contenu'],
          example: 'PPL = 20 signifie que le modèle hésite en moyenne entre 20 mots'
        },
        {
          name: 'BERTScore',
          formula: 'BERTScore = F1 des similarités d\'embeddings BERT',
          formulaLatex: '\\text{BERTScore} = F_1(\\text{Precision}_{\\text{BERT}}, \\text{Recall}_{\\text{BERT}})',
          interpretation: 'Similarité sémantique via embeddings contextuels BERT.',
          range: '[0, 1] — 1 = sémantiquement identique',
          useCases: [
            'Quand BLEU/ROUGE échouent (paraphrases)',
            'Génération de texte moderne',
            'Évaluation de reformulations'
          ],
          pros: ['Capture la sémantique', 'Tolère les paraphrases'],
          cons: ['Plus lent', 'Dépend du modèle BERT utilisé'],
          example: 'BERTScore = 0.9 même si les mots exacts diffèrent'
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════
  // GUIDE DE SÉLECTION
  // ═══════════════════════════════════════════════════════════════
  selectionGuide: {
    title: '🧭 Guide de sélection des métriques',
    scenarios: [
      {
        question: 'Classes déséquilibrées ?',
        answer: 'Éviter Accuracy → Utiliser F1, AUC-PR, MCC'
      },
      {
        question: 'Faux positifs coûteux ?',
        answer: 'Optimiser Precision'
      },
      {
        question: 'Faux négatifs coûteux ?',
        answer: 'Optimiser Recall'
      },
      {
        question: 'Probabilités importantes ?',
        answer: 'Log Loss, Brier Score, Calibration'
      },
      {
        question: 'Grandes erreurs à éviter ?',
        answer: 'RMSE plutôt que MAE'
      },
      {
        question: 'Comparer différentes échelles ?',
        answer: 'MAPE, R²'
      },
      {
        question: 'Pas de labels (clustering) ?',
        answer: 'Silhouette, Davies-Bouldin, Calinski-Harabasz'
      },
      {
        question: 'Ranking / Recommandation ?',
        answer: 'NDCG, MAP, Precision@K'
      }
    ]
  },

  // Confusion Matrix reminder
  confusionMatrix: {
    title: '📋 Rappel : Matrice de Confusion',
    layout: [
      ['', 'Prédit Positif', 'Prédit Négatif'],
      ['Réel Positif', 'TP (Vrai Positif)', 'FN (Faux Négatif)'],
      ['Réel Négatif', 'FP (Faux Positif)', 'TN (Vrai Négatif)']
    ],
    definitions: [
      { term: 'TP', def: 'Bien prédit positif (✓ malade → malade)' },
      { term: 'TN', def: 'Bien prédit négatif (✓ sain → sain)' },
      { term: 'FP', def: 'Fausse alerte (✗ sain → malade) - Type I' },
      { term: 'FN', def: 'Manqué (✗ malade → sain) - Type II' }
    ]
  }
};

export default ML_METRICS_CHEATSHEET;
