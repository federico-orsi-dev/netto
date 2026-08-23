import type {
  AssumptionId,
  CalculationAmountId,
  CalculationComponentId,
  ExcludedRuleId,
  VerifiedRuleId,
} from "../domain";
import type { SalaryInputIssueCode } from "../features/calculator/input-parser";

interface AmountCopy {
  readonly label: string;
  readonly shortLabel: string;
}

interface ComponentCopy {
  readonly title: string;
  readonly summary: string;
  readonly institutionLabel: string;
  readonly institution: string;
  readonly meaning: string;
}

export const INPUT_ERROR_COPY: Record<SalaryInputIssueCode, string> = {
  required: "Inserisci la tua RAL per continuare.",
  invalid_format:
    "Usa solo cifre, con il punto per le migliaia: per esempio 35.000.",
  whole_euros_required:
    "Per questa stima la RAL deve essere inserita in euro interi.",
  below_supported_range: "La stima parte da una RAL di 10.000 €.",
  above_supported_range: "La stima supporta RAL fino a 120.000 €.",
};

export const AMOUNT_COPY = {
  annualGrossSalary: { label: "RAL annuale", shortLabel: "RAL" },
  contributableRemuneration: {
    label: "Retribuzione imponibile INPS stimata",
    shortLabel: "Base INPS",
  },
  pensionContributionBase: {
    label: "Base contributiva pensionistica",
    shortLabel: "Base pensione",
  },
  employeeIvsContribution: {
    label: "Contributi pensionistici IVS",
    shortLabel: "IVS",
  },
  additionalIvsContribution: {
    label: "Contributo IVS aggiuntivo",
    shortLabel: "IVS aggiuntivo",
  },
  employeeCigsContribution: {
    label: "Contributo CIGS",
    shortLabel: "CIGS",
  },
  employeeContributions: {
    label: "Contributi a carico del dipendente",
    shortLabel: "Contributi",
  },
  taxableIncome: {
    label: "Reddito imponibile IRPEF",
    shortLabel: "Imponibile",
  },
  grossIrpefBracket1: {
    label: "IRPEF lorda — primo scaglione",
    shortLabel: "IRPEF 1",
  },
  grossIrpefBracket2: {
    label: "IRPEF lorda — secondo scaglione",
    shortLabel: "IRPEF 2",
  },
  grossIrpefBracket3: {
    label: "IRPEF lorda — terzo scaglione",
    shortLabel: "IRPEF 3",
  },
  grossIrpef: { label: "IRPEF lorda", shortLabel: "IRPEF lorda" },
  employmentDeduction: {
    label: "Detrazione per lavoro dipendente",
    shortLabel: "Detrazione lavoro",
  },
  cuneoDeduction: {
    label: "Ulteriore detrazione sul cuneo fiscale",
    shortLabel: "Detrazione cuneo",
  },
  netIrpef: { label: "IRPEF netta", shortLabel: "IRPEF" },
  cuneoCashSum: {
    label: "Beneficio fiscale non imponibile",
    shortLabel: "Beneficio",
  },
  treatmentIntegrativo: {
    label: "Trattamento integrativo",
    shortLabel: "Tratt. integrativo",
  },
  lombardyTaxBracket1: {
    label: "Addizionale Lombardia — primo scaglione",
    shortLabel: "Lombardia 1",
  },
  lombardyTaxBracket2: {
    label: "Addizionale Lombardia — secondo scaglione",
    shortLabel: "Lombardia 2",
  },
  lombardyTaxBracket3: {
    label: "Addizionale Lombardia — terzo scaglione",
    shortLabel: "Lombardia 3",
  },
  lombardyTaxBracket4: {
    label: "Addizionale Lombardia — quarto scaglione",
    shortLabel: "Lombardia 4",
  },
  regionalTax: {
    label: "Addizionale regionale Lombardia",
    shortLabel: "Regione",
  },
  municipalTax: {
    label: "Addizionale comunale Milano",
    shortLabel: "Comune",
  },
  localTaxes: { label: "Addizionali locali", shortLabel: "Addizionali" },
  totalOutflows: { label: "Uscite modellate", shortLabel: "Uscite" },
  totalCashBenefits: {
    label: "Benefici fiscali in denaro",
    shortLabel: "Benefici",
  },
  modeledBurden: {
    label: "Impatto complessivo modellato",
    shortLabel: "Impatto",
  },
  annualNet: { label: "Netto annuale stimato", shortLabel: "Netto" },
  averageMonthlyNet: {
    label: "Netto mensile medio stimato",
    shortLabel: "Mensile",
  },
  averageSalaryPayment: {
    label: "Media per mensilità contrattuale",
    shortLabel: "Per mensilità",
  },
} as const satisfies Record<CalculationAmountId, AmountCopy>;

export const COMPONENT_COPY = {
  grossSalary: {
    title: "La RAL da cui partiamo",
    summary: "È la retribuzione annua lorda inserita nel calcolatore.",
    institutionLabel: "Da chi proviene?",
    institution: "Dal datore di lavoro, secondo il contratto.",
    meaning:
      "Netto la tratta come retribuzione ordinaria annuale interamente soggetta ai contributi del profilo V1.",
  },
  employeeIvs: {
    title: "Contributi pensionistici IVS",
    summary: "La quota pensionistica ordinaria a carico del dipendente.",
    institutionLabel: "Chi li gestisce?",
    institution: "INPS, nel sistema previdenziale dei lavoratori dipendenti.",
    meaning:
      "Riducono il lordo disponibile e sono distinti dalle imposte sul reddito.",
  },
  additionalIvs: {
    title: "Contributo IVS aggiuntivo",
    summary:
      "Una quota pensionistica aggiuntiva sulla parte di reddito oltre la soglia annuale.",
    institutionLabel: "Chi lo gestisce?",
    institution: "INPS, insieme alla contribuzione pensionistica ordinaria.",
    meaning:
      "Compare nel calcolo solo quando la base pensionistica supera la soglia prevista per il 2026.",
  },
  employeeCigs: {
    title: "Contributo CIGS",
    summary:
      "La quota a carico del dipendente prevista dal profilo industriale CIGS di Netto.",
    institutionLabel: "Chi lo gestisce?",
    institution:
      "INPS, nell'ambito della Cassa Integrazione Guadagni Straordinaria.",
    meaning:
      "Contribuisce al sistema CIGS e non si applica allo stesso modo a ogni rapporto di lavoro privato.",
  },
  employeeContributions: {
    title: "Contributi a tuo carico",
    summary:
      "L'insieme delle quote previdenziali e CIGS trattenute al dipendente nel profilo V1.",
    institutionLabel: "Chi li gestisce?",
    institution: "INPS.",
    meaning:
      "Vengono sottratti dalla RAL prima di determinare il reddito su cui calcolare l'IRPEF.",
  },
  grossIrpef: {
    title: "IRPEF lorda",
    summary: "L'imposta progressiva prima delle detrazioni applicabili.",
    institutionLabel: "A chi fa riferimento?",
    institution: "Allo Stato, come imposta nazionale sul reddito.",
    meaning:
      "È un valore intermedio: serve a capire l'imposta, ma non viene sottratto direttamente dal netto finale.",
  },
  employmentDeduction: {
    title: "Detrazione da lavoro dipendente",
    summary: "Riduce l'IRPEF lorda in base al reddito imponibile.",
    institutionLabel: "Da dove deriva?",
    institution: "Dalla disciplina nazionale dell'IRPEF.",
    meaning:
      "Abbassa l'imposta dovuta nel modello; non è un pagamento separato del datore di lavoro.",
  },
  cuneoDeduction: {
    title: "Ulteriore detrazione sul cuneo fiscale",
    summary: "Un'ulteriore riduzione dell'IRPEF nelle fasce previste.",
    institutionLabel: "Da dove deriva?",
    institution: "Dalla disciplina fiscale nazionale.",
    meaning:
      "È distinta dalle somme erogate in denaro e non può trasformare l'IRPEF netta in un valore negativo.",
  },
  netIrpef: {
    title: "IRPEF dopo le detrazioni",
    summary:
      "L'imposta nazionale sul reddito dopo le detrazioni incluse in V1.",
    institutionLabel: "A chi va?",
    institution: "Allo Stato, come entrata fiscale nazionale.",
    meaning:
      "È questa componente, non l'IRPEF lorda, che viene sottratta nel passaggio finale dal lordo al netto.",
  },
  regionalTax: {
    title: "Addizionale regionale Lombardia",
    summary: "L'imposta regionale calcolata sul reddito imponibile IRPEF.",
    institutionLabel: "A chi va?",
    institution: "Alla Regione Lombardia, come entrata fiscale regionale.",
    meaning:
      "Si aggiunge all'IRPEF nazionale secondo le fasce regionali previste per il profilo 2026.",
  },
  municipalTax: {
    title: "Addizionale comunale Milano",
    summary: "L'imposta comunale applicata oltre la soglia di esenzione.",
    institutionLabel: "A chi va?",
    institution: "Al Comune di Milano, come entrata fiscale comunale.",
    meaning:
      "Si aggiunge alle imposte nazionali e regionali quando il reddito supera la soglia del profilo V1.",
  },
  cuneoCashSum: {
    title: "Beneficio fiscale non imponibile",
    summary: "Un beneficio non imponibile che aumenta il netto stimato.",
    institutionLabel: "Da chi deriva?",
    institution: "Dalla disciplina fiscale nazionale.",
    meaning:
      "È un'aggiunta in denaro separata dalle detrazioni IRPEF e può aumentare il risultato oltre la sola RAL.",
  },
  treatmentIntegrativo: {
    title: "Trattamento integrativo",
    summary:
      "Un beneficio in denaro riconosciuto quando ricorrono le condizioni modellate.",
    institutionLabel: "Da chi deriva?",
    institution: "Dalla disciplina fiscale nazionale.",
    meaning:
      "Aumenta il risultato annuale stimato; V1 include solo il ramo ordinario supportato dal profilo.",
  },
  annualNet: {
    title: "Il netto annuale stimato",
    summary: "Il risultato finale dopo uscite e benefici inclusi nel modello.",
    institutionLabel: "Cosa rappresenta?",
    institution: "La sintesi annuale prodotta da Netto per il profilo V1.",
    meaning:
      "È una stima annuale trasparente, non la replica di singole buste paga o di un conguaglio ufficiale.",
  },
} as const satisfies Record<CalculationComponentId, ComponentCopy>;

export const ASSUMPTION_COPY = {
  "ASSUMPTION-RAL-CONTRIBUTION-BASE-V1":
    "La RAL inserita rappresenta retribuzione ordinaria annuale interamente soggetta a contribuzione nel profilo V1.",
  "ASSUMPTION-FULL-YEAR-ORDINARY-EMPLOYMENT":
    "Rapporto di lavoro dipendente ordinario per l'intero anno fiscale 2026.",
  "ASSUMPTION-INDUSTRIAL-CIGS-NO-SECTOR-FUND":
    "Datore industriale in ambito CIGO/CIGS, oltre 15 dipendenti, senza fondo settoriale aggiuntivo a carico del lavoratore.",
  "ASSUMPTION-MILAN-LOMBARDY-DOMICILE":
    "Domicilio fiscale a Milano, in Lombardia, per l'intero periodo considerato.",
  "ASSUMPTION-NO-PERSONAL-OR-SPECIAL-CIRCUMSTANCES":
    "Nessun altro reddito, familiare a carico, agevolazione personale o componente retributiva speciale.",
} as const satisfies Record<AssumptionId, string>;

export const EXCLUSION_COPY = {
  "RULE-INPS-2026-006":
    "Verifica dei minimi contributivi e della conformità CCNL.",
  "RULE-INPS-2026-007":
    "Arrotondamento normativo di un risultato contributivo annuale.",
  "RULE-INPS-2026-008":
    "Riproduzione esatta degli arrotondamenti delle singole buste paga.",
  "RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026":
    "Ramo condizionale del trattamento integrativo legato a detrazioni personali pregresse.",
  "RULE-NAT-SPECIAL-PAY-2026":
    "Regimi sostitutivi per premi, lavoro notturno o altre componenti speciali.",
  "RULE-NAT-PERSONAL-RELIEFS-2026":
    "Detrazioni familiari, spese personali, altri redditi e crediti individuali.",
  "RULE-LOCAL-2026-001":
    "Il bordo IRPEF dovuta/de-minimis fuori dall'effettivo intervallo V1.",
  "RULE-LOCAL-2026-ROUNDING":
    "Arrotondamenti propri di dichiarazioni fiscali o processi paghe locali.",
  "RULE-LOCAL-2026-WITHHOLDING":
    "Calendario di acconti, saldi e trattenute nelle singole mensilità.",
} as const satisfies Record<ExcludedRuleId, string>;

export const TRACE_STATUS_COPY = {
  applied: "Applicata",
  not_applicable: "Non applicabile",
  inactive_in_supported_range: "Inattiva nell'intervallo V1",
} as const;

interface RuleChangeCopy {
  readonly activated: string;
  readonly deactivated: string;
}

export const RULE_CHANGE_COPY: Partial<Record<VerifiedRuleId, RuleChangeCopy>> =
  {
    "RULE-INPS-2026-003": {
      activated:
        "Si attiva il contributo IVS aggiuntivo sulla quota oltre la soglia 2026.",
      deactivated:
        "La nuova RAL non raggiunge più la soglia del contributo IVS aggiuntivo.",
    },
    "RULE-NAT-EMPLOYMENT-DEDUCTION-2026": {
      activated: "Torna applicabile la detrazione per lavoro dipendente.",
      deactivated:
        "La detrazione per lavoro dipendente si azzera oltre questa fascia.",
    },
    "RULE-NAT-CUNEO-SUM-2026": {
      activated: "Si attiva il beneficio fiscale non imponibile modellato.",
      deactivated:
        "Il beneficio fiscale non imponibile termina oltre questa fascia.",
    },
    "RULE-NAT-CUNEO-DEDUCTION-2026": {
      activated: "Si attiva l'ulteriore detrazione sul cuneo fiscale.",
      deactivated:
        "L'ulteriore detrazione sul cuneo fiscale non si applica più.",
    },
    "RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026": {
      activated:
        "Si attiva il trattamento integrativo per la fascia supportata.",
      deactivated: "Il trattamento integrativo termina oltre questa fascia.",
    },
    "RULE-MILAN-2026-001": {
      activated:
        "Si supera la soglia modellata dell'addizionale comunale Milano.",
      deactivated:
        "La nuova RAL rientra sotto la soglia modellata dell'addizionale comunale.",
    },
  };
