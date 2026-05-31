const CBM_POINTS = {
  correct: {
    low: 1,
    medium: 2,
    high: 3,
  },
  partial: {
    low: 0,
    medium: 1,
    high: 1,
  },
  incorrect: {
    low: 0,
    medium: -1,
    high: -3,
  },
};

export function scoreCbm(outcome, confidence) {
  return CBM_POINTS[outcome]?.[confidence] ?? 0;
}

export function normalizeCbm(raw, max = 3, min = -3) {
  return Math.round(((raw - min) / (max - min)) * 100);
}

export function confidenceLabel(confidence) {
  if (confidence === 'high') {
    return 'Strongly supported by the evidence';
  }
  if (confidence === 'medium') {
    return 'Supported, but with meaningful caveats';
  }
  return 'Plausible, but I am not certain';
}

export function scoreClassToOutcome(scoreClass) {
  if (scoreClass === 'correct') {
    return 'correct';
  }
  if (scoreClass === 'partial') {
    return 'partial';
  }
  return 'incorrect';
}

export function summarizeCaseScore({
  decisionOutcome,
  confidence,
  keyEvidenceCount,
  keyEvidenceTotal = 3,
}) {
  const cbmRaw = scoreCbm(decisionOutcome, confidence);
  const calibrationScore = normalizeCbm(cbmRaw);
  const decisionScore =
    decisionOutcome === 'correct' ? 100 : decisionOutcome === 'partial' ? 65 : 20;
  const evidenceScore = Math.min(
    100,
    Math.round((keyEvidenceCount / Math.max(1, keyEvidenceTotal)) * 100),
  );
  const totalScore = Math.round(
    decisionScore * 0.35 + evidenceScore * 0.25 + calibrationScore * 0.4,
  );

  return {
    decisionScore,
    evidenceScore,
    calibrationScore,
    totalScore,
    cbmRaw,
  };
}
