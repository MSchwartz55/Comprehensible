function srsFunc(previous, evaluation) {
  let repetitions, efactor, interval;

  if (previous == null) {
    previous = { n: 0, efactor: 2.5, interval: 0.0 };
  }

  efactor = Math.max(1.3, previous.efactor + (0.1 - (5 - evaluation) * (0.08 + (5 - evaluation) * 0.02)));

  if (evaluation < 3) {
    repetitions = 0
    interval = 1;
  } else {
    repetitions = previous.n + 1;

    if (previous.n == 0) {
      interval = 1;
    } else if (previous.n == 1) {
      interval = 6;
    } else {
      interval = Math.ceil(previous.interval * efactor);
    }
  }

  return { repetitions, efactor, interval };
}

//click button for ease rating
//post result of srsFunction to db
//check difference between current date and last date and compare it to interval
//if (today - updated){ >= interval {display card}}else{don't display card}