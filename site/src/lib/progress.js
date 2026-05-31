export const LAB_PROGRESS_KEY = 'dsjl.progress.v1';
export const COMPLETION_RECORD_KEY = 'dsjl.completion.v1';

export function emptyProgress() {
  return {
    version: 1,
    updatedAt: null,
    cases: {},
  };
}

export function readProgress() {
  if (typeof window === 'undefined') {
    return emptyProgress();
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(LAB_PROGRESS_KEY) || '{}');
    return normalizeProgress(parsed);
  } catch {
    return emptyProgress();
  }
}

export function saveCaseProgress(caseId, caseProgress) {
  if (typeof window === 'undefined') {
    return emptyProgress();
  }

  const current = readProgress();
  const next = normalizeProgress({
    ...current,
    updatedAt: new Date().toISOString(),
    cases: {
      ...current.cases,
      [caseId]: {
        ...current.cases[caseId],
        ...caseProgress,
        caseId,
        updatedAt: new Date().toISOString(),
      },
    },
  });

  window.localStorage.setItem(LAB_PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('dsjl:progress', { detail: next }));
  return next;
}

export function resetProgress() {
  if (typeof window === 'undefined') {
    return emptyProgress();
  }

  window.localStorage.removeItem(LAB_PROGRESS_KEY);
  window.localStorage.removeItem(COMPLETION_RECORD_KEY);
  const next = emptyProgress();
  window.dispatchEvent(new CustomEvent('dsjl:progress', { detail: next }));
  window.dispatchEvent(new CustomEvent('dsjl:completion', { detail: null }));
  return next;
}

export function readCompletionRecord() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(COMPLETION_RECORD_KEY) || 'null',
    );
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveCompletionRecord(record) {
  if (typeof window === 'undefined') {
    return null;
  }

  const next = {
    version: 1,
    lockedAt: new Date().toISOString(),
    ...record,
  };
  window.localStorage.setItem(COMPLETION_RECORD_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('dsjl:completion', { detail: next }));
  return next;
}

export function caseStatus(progress, caseId) {
  return progress.cases?.[caseId]?.status || 'unopened';
}

export function progressSummary(progress) {
  const cases = Object.values(progress.cases || {});
  const submitted = cases.filter((entry) =>
    ['submitted', 'reviewed'].includes(entry.status),
  );
  const reviewed = cases.filter((entry) => entry.status === 'reviewed');
  const highConfidenceMisses = submitted.filter(
    (entry) =>
      entry.judgment?.confidence === 'high' &&
      entry.judgment?.outcome === 'incorrect',
  ).length;
  const totalScore =
    submitted.length === 0
      ? 0
      : Math.round(
          submitted.reduce((sum, entry) => sum + (entry.score?.totalScore || 0), 0) /
            submitted.length,
        );
  const calibration =
    submitted.length === 0
      ? 0
      : Math.round(
          submitted.reduce(
            (sum, entry) => sum + (entry.score?.calibrationScore || 0),
            0,
          ) / submitted.length,
        );

  return {
    submittedCount: submitted.length,
    reviewedCount: reviewed.length,
    highConfidenceMisses,
    totalScore,
    calibration,
  };
}

function normalizeProgress(progress) {
  return {
    version: 1,
    updatedAt:
      typeof progress.updatedAt === 'string' ? progress.updatedAt : null,
    cases:
      progress.cases && typeof progress.cases === 'object'
        ? progress.cases
        : {},
  };
}
