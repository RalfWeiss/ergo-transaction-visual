import * as R from "ramda";

export const logWhen = (debug: boolean) => (title: string) =>
  R.tap(
    R.when(
      R.always(debug),
      (d) => console.log(`${title}: `, JSON.stringify(d, null, 2)) // eslint-disable-line
    )
  );
