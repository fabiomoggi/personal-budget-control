import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

export const helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.send("Hello, my fucking world!");
});

export const getName = (): string => {
  return "Firebase" + "";
};

export const getAge = (): number => {
  return 38;
};

export const getOneHundred = (): number => {
  return 100;
};
