function spacedRepetitionSchedule(previous, evaluation) {
  let repetitions, efactor, interval;

  efactor = Math.max(1.3, previous.efactor + (0.1 - (5 - evaluation) * (0.08 + (5 - evaluation) * 0.02)));

  if (evaluation < 3) {
    repetitions = 0
    interval = 1;
  } else {
    repetitions = previous.repetitions + 1;

    if (previous.repetitions === 0) {
      interval = 1;
    } else if (previous.repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.ceil(previous.interval * efactor);
    }
  }

  const result = { repetitions, efactor, interval };
  return result;
}

export default spacedRepetitionSchedule;